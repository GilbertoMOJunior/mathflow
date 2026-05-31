import { grade } from '../data/grade';
import type { Conteudo, Disciplina, RegistroEstudo } from '../data/grade';

export type StatusConteudo = 'concluido' | 'em-andamento' | 'nao-iniciado';

export type ConteudoComStatus = {
  disciplina: Disciplina;
  conteudo: Conteudo;
  status: StatusConteudo;
  ultimaVisitaIso: string | null;
  totalSessoes: number;
  totalRevisados: number;
};

export function classificarConteudos(
  registros: RegistroEstudo[],
  interesses: string[],
): ConteudoComStatus[] {
  const usarFiltro = interesses.length > 0;
  const porConteudo = new Map<string, RegistroEstudo[]>();
  for (const r of registros) {
    const arr = porConteudo.get(r.conteudoId) ?? [];
    arr.push(r);
    porConteudo.set(r.conteudoId, arr);
  }

  const lista: ConteudoComStatus[] = [];
  for (const d of grade) {
    if (usarFiltro && !interesses.includes(d.id)) continue;
    for (const c of d.conteudos) {
      const regs = porConteudo.get(c.id) ?? [];
      const totalRevisados = regs.reduce((s, r) => s + r.flashcardsRevisados, 0);
      const maxRevisadosSessao = regs.reduce(
        (m, r) => Math.max(m, r.flashcardsRevisados),
        0,
      );
      const totalSessoes = regs.length;
      const ultima = regs[0]?.timestamp ?? null;

      let status: StatusConteudo;
      if (totalSessoes === 0) status = 'nao-iniciado';
      else if (maxRevisadosSessao >= c.flashcards.length) status = 'concluido';
      else status = 'em-andamento';

      lista.push({
        disciplina: d,
        conteudo: c,
        status,
        ultimaVisitaIso: ultima,
        totalSessoes,
        totalRevisados,
      });
    }
  }
  return lista;
}

