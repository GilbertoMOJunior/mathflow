import { supabase } from './supabase';
import type { RegistroEstudo } from '../data/grade';

// Sincronização best-effort com o Supabase. Falhas (ex.: offline) são apenas
// logadas — o app continua funcionando 100% offline via Zustand/AsyncStorage.

export async function registrarAluno(matricula: string, nome: string, fase: number): Promise<void> {
  const { error } = await supabase.from('alunos').insert({ matricula, nome, fase });
  // 23505 = matrícula já cadastrada; ignorar (aluno recorrente).
  if (error && error.code !== '23505') {
    console.warn('[sync] alunos:', error.message);
  }
}

export async function pushRegistro(matricula: string, r: RegistroEstudo): Promise<void> {
  const { error } = await supabase.from('registros').insert({
    id: r.id,
    matricula,
    disciplina_id: r.disciplinaId,
    disciplina_nome: r.disciplinaNome,
    conteudo_id: r.conteudoId,
    conteudo_titulo: r.conteudoTitulo,
    fase: r.fase,
    tempo_segundos: r.tempoSegundos,
    flashcards_revisados: r.flashcardsRevisados,
    timestamp: r.timestamp,
  });
  if (error) {
    console.warn('[sync] registro:', error.message);
  }
}
