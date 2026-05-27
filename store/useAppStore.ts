import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RegistroEstudo } from '../data/grade';

type Usuario = {
  id: string;
  nome: string;
  fase: number;
};

interface AppState {
  usuario: Usuario;
  interesses: string[];
  registros: RegistroEstudo[];
  feedColegas: RegistroEstudo[];
  setUsuario: (patch: Partial<Usuario>) => void;
  toggleInteresse: (disciplinaId: string) => void;
  addRegistro: (registro: Omit<RegistroEstudo, 'id' | 'userId' | 'timestamp'>) => void;
}

const agora = new Date();
const horasAtras = (h: number) =>
  new Date(agora.getTime() - h * 60 * 60 * 1000).toISOString();
const diasAtras = (d: number) =>
  new Date(agora.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

const feedColegasMock: RegistroEstudo[] = [
  {
    id: 'rc-1',
    userId: 'u-ana',
    disciplinaId: 'd-2-1',
    disciplinaNome: 'Cálculo II',
    conteudoId: 'c-2-1-3',
    conteudoTitulo: 'Técnicas de integração',
    fase: 2,
    tempoSegundos: 35 * 60,
    flashcardsRevisados: 18,
    timestamp: horasAtras(2),
  },
  {
    id: 'rc-2',
    userId: 'u-bruno',
    disciplinaId: 'd-3-2',
    disciplinaNome: 'Álgebra Linear II',
    conteudoId: 'c-3-2-1',
    conteudoTitulo: 'Autovalores e autovetores',
    fase: 3,
    tempoSegundos: 22 * 60,
    flashcardsRevisados: 12,
    timestamp: horasAtras(4),
  },
  {
    id: 'rc-3',
    userId: 'u-carla',
    disciplinaId: 'd-1-1',
    disciplinaNome: 'Cálculo I',
    conteudoId: 'c-1-1-2',
    conteudoTitulo: 'Derivadas',
    fase: 1,
    tempoSegundos: 48 * 60,
    flashcardsRevisados: 24,
    timestamp: horasAtras(7),
  },
  {
    id: 'rc-4',
    userId: 'u-diego',
    disciplinaId: 'd-5-2',
    disciplinaNome: 'Álgebra Abstrata I',
    conteudoId: 'c-5-2-2',
    conteudoTitulo: 'Subgrupos',
    fase: 5,
    tempoSegundos: 30 * 60,
    flashcardsRevisados: 15,
    timestamp: diasAtras(1),
  },
  {
    id: 'rc-5',
    userId: 'u-elisa',
    disciplinaId: 'd-4-1',
    disciplinaNome: 'Cálculo IV',
    conteudoId: 'c-4-1-2',
    conteudoTitulo: 'Séries de potências',
    fase: 4,
    tempoSegundos: 55 * 60,
    flashcardsRevisados: 22,
    timestamp: diasAtras(1),
  },
  {
    id: 'rc-6',
    userId: 'u-felipe',
    disciplinaId: 'd-2-2',
    disciplinaNome: 'Álgebra Linear I',
    conteudoId: 'c-2-2-1',
    conteudoTitulo: 'Matrizes',
    fase: 2,
    tempoSegundos: 18 * 60,
    flashcardsRevisados: 9,
    timestamp: diasAtras(2),
  },
  {
    id: 'rc-7',
    userId: 'u-gabriela',
    disciplinaId: 'd-6-1',
    disciplinaNome: 'Análise Real II',
    conteudoId: 'c-6-1-1',
    conteudoTitulo: 'Continuidade e diferenciação',
    fase: 6,
    tempoSegundos: 40 * 60,
    flashcardsRevisados: 16,
    timestamp: diasAtras(3),
  },
  {
    id: 'rc-8',
    userId: 'u-henrique',
    disciplinaId: 'd-7-1',
    disciplinaNome: 'Análise Complexa',
    conteudoId: 'c-7-1-1',
    conteudoTitulo: 'Funções analíticas',
    fase: 7,
    tempoSegundos: 28 * 60,
    flashcardsRevisados: 14,
    timestamp: diasAtras(4),
  },
  {
    id: 'rc-9',
    userId: 'u-isabela',
    disciplinaId: 'd-1-2',
    disciplinaNome: 'Geometria Analítica',
    conteudoId: 'c-1-2-2',
    conteudoTitulo: 'Cônicas',
    fase: 1,
    tempoSegundos: 25 * 60,
    flashcardsRevisados: 11,
    timestamp: diasAtras(5),
  },
];

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
      interesses: ['d-1-1', 'd-2-1', 'd-2-2'],
      registros: [],
      feedColegas: feedColegasMock,
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
      name: 'mathuniplac-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        usuario: state.usuario,
        interesses: state.interesses,
        registros: state.registros,
      }),
    },
  ),
);
