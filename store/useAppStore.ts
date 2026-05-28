import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RegistroEstudo } from '../data/grade';

type Usuario = {
  id: string;
  nome: string;
  fase: number;
};

export type TrilhaCustom = {
  id: string;
  nome: string;
  conteudoIds: string[];
  criadaEm: string;
};

interface AppState {
  usuario: Usuario;
  interesses: string[];
  favoritos: string[];
  trilhas: TrilhaCustom[];
  registros: RegistroEstudo[];
  setUsuario: (patch: Partial<Usuario>) => void;
  toggleInteresse: (disciplinaId: string) => void;
  toggleFavorito: (conteudoId: string) => void;
  addTrilha: (nome: string, conteudoIds: string[]) => string;
  removeTrilha: (id: string) => void;
  updateTrilha: (id: string, patch: { nome?: string; conteudoIds?: string[] }) => void;
  addRegistro: (registro: Omit<RegistroEstudo, 'id' | 'userId' | 'timestamp'>) => void;
}

const uid = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      usuario: {
        id: 'u-eu',
        nome: 'Estudante Uniplac',
        fase: 2,
      },
      interesses: ['d-1-1', 'd-2-4', 'd-3-2'],
      favoritos: [],
      trilhas: [],
      registros: [],
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
      addRegistro: (registro) =>
        set((state) => ({
          registros: [
            {
              ...registro,
              id: uid(),
              userId: state.usuario.id,
              timestamp: new Date().toISOString(),
            },
            ...state.registros,
          ],
        })),
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
      }),
    },
  ),
);
