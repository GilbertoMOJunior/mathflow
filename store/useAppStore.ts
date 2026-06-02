import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RegistroEstudo } from '../data/grade';
import { pushRegistro } from '../lib/sync';

type Usuario = {
  id: string;
  nome: string;
  fase: number;
  // Definida na tela de identificação. Quando ausente, o app pede o cadastro.
  matricula?: string;
};

export type TrilhaCustom = {
  id: string;
  nome: string;
  conteudoIds: string[];
  criadaEm: string;
};

export type ChatMensagem = {
  id: string;
  autor: 'aluno' | 'tutor';
  texto: string;
  timestamp: string;
};

interface AppState {
  usuario: Usuario;
  interesses: string[];
  favoritos: string[];
  trilhas: TrilhaCustom[];
  registros: RegistroEstudo[];
  chatHistorico: Record<string, ChatMensagem[]>;
  setUsuario: (patch: Partial<Usuario>) => void;
  toggleInteresse: (disciplinaId: string) => void;
  toggleFavorito: (conteudoId: string) => void;
  addTrilha: (nome: string, conteudoIds: string[]) => string;
  removeTrilha: (id: string) => void;
  updateTrilha: (id: string, patch: { nome?: string; conteudoIds?: string[] }) => void;
  addRegistro: (registro: Omit<RegistroEstudo, 'id' | 'userId' | 'timestamp'>) => void;
  addChatMensagem: (
    conteudoId: string,
    msg: Omit<ChatMensagem, 'id' | 'timestamp'>,
  ) => void;
  limparChatConteudo: (conteudoId: string) => void;
}

const uid = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      usuario: {
        id: 'u-eu',
        nome: 'Estudante Uniplac',
        fase: 2,
      },
      interesses: ['d-1-1', 'd-2-4', 'd-3-2'],
      favoritos: [],
      trilhas: [],
      registros: [],
      chatHistorico: {},
      setUsuario: (patch) =>
        set((state) => ({ usuario: { ...state.usuario, ...patch } })),
      toggleInteresse: (disciplinaId) =>
        set((state) => {
          const ativo = state.interesses.includes(disciplinaId);
          return {
            interesses: ativo
              ? state.interesses.filter((id) => id !== disciplinaId)
              : [...state.interesses, disciplinaId],
          };
        }),
      toggleFavorito: (conteudoId) =>
        set((state) => {
          const ativo = state.favoritos.includes(conteudoId);
          return {
            favoritos: ativo
              ? state.favoritos.filter((id) => id !== conteudoId)
              : [...state.favoritos, conteudoId],
          };
        }),
      addTrilha: (nome, conteudoIds) => {
        const id = 'tc-' + uid();
        set((state) => ({
          trilhas: [
            {
              id,
              nome,
              conteudoIds,
              criadaEm: new Date().toISOString(),
            },
            ...state.trilhas,
          ],
        }));
        return id;
      },
      removeTrilha: (id) =>
        set((state) => ({
          trilhas: state.trilhas.filter((t) => t.id !== id),
        })),
      updateTrilha: (id, patch) =>
        set((state) => ({
          trilhas: state.trilhas.map((t) =>
            t.id === id ? { ...t, ...patch } : t,
          ),
        })),
      addRegistro: (registro) => {
        const { usuario } = get();
        const matricula = usuario.matricula ?? usuario.id;
        const novo: RegistroEstudo = {
          ...registro,
          id: uid(),
          userId: matricula,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({ registros: [novo, ...state.registros] }));
        // Espelha no Supabase (best-effort). Só quando há matrícula real.
        if (usuario.matricula) void pushRegistro(usuario.matricula, novo);
      },
      addChatMensagem: (conteudoId, msg) =>
        set((state) => {
          const atual = state.chatHistorico[conteudoId] ?? [];
          return {
            chatHistorico: {
              ...state.chatHistorico,
              [conteudoId]: [
                ...atual,
                { ...msg, id: uid(), timestamp: new Date().toISOString() },
              ],
            },
          };
        }),
      limparChatConteudo: (conteudoId) =>
        set((state) => {
          const novo = { ...state.chatHistorico };
          delete novo[conteudoId];
          return { chatHistorico: novo };
        }),
    }),
    {
      name: 'mathflow-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        usuario: state.usuario,
        interesses: state.interesses,
        favoritos: state.favoritos,
        trilhas: state.trilhas,
        registros: state.registros,
        chatHistorico: state.chatHistorico,
      }),
    },
  ),
);
