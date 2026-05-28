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
  setUsuario: (patch: Partial<Usuario>) => void;
  toggleInteresse: (disciplinaId: string) => void;
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
      interesses: ['d-1-1', 'd-2-1', 'd-2-2'],
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
        registros: state.registros,
      }),
    },
  ),
);
