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

// Intervalos de repetição espaçada (em dias) por nº de sessões concluídas
export const INTERVALOS_SRS = [1, 3, 7, 14, 30];

export type Sugestao = {
  item: ConteudoComStatus;
  prioridade: number;
  motivo: string;
  tipo: 'revisar' | 'continuar' | 'comecar';
};

const DIA_MS = 86_400_000;

function formatVistoHa(iso: string | null): string {
  if (!iso) return 'Nunca estudado';
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / DIA_MS);
  if (dias <= 0) return 'Visto hoje';
  if (dias === 1) return 'Visto ontem';
  if (dias < 30) return `Visto há ${dias} dias`;
  const meses = Math.floor(dias / 30);
  if (meses === 1) return 'Visto há 1 mês';
  if (meses < 12) return `Visto há ${meses} meses`;
  const anos = Math.floor(meses / 12);
  return anos === 1 ? 'Visto há 1 ano' : `Visto há ${anos} anos`;
}

export function gerarSugestoes(
  lista: ConteudoComStatus[],
  limite = 5,
): Sugestao[] {
  const agora = Date.now();
  const sugestoes: Sugestao[] = [];

  for (const item of lista) {
    const diasDesde = item.ultimaVisitaIso
      ? (agora - new Date(item.ultimaVisitaIso).getTime()) / DIA_MS
      : Infinity;

    if (item.status === 'concluido' && item.ultimaVisitaIso) {
      const idx = Math.min(item.totalSessoes - 1, INTERVALOS_SRS.length - 1);
      const intervalo = INTERVALOS_SRS[Math.max(0, idx)];
      if (diasDesde >= intervalo) {
        sugestoes.push({
          item,
          prioridade: 100 + Math.floor(diasDesde - intervalo),
          motivo: formatVistoHa(item.ultimaVisitaIso),
          tipo: 'revisar',
        });
      }
    } else if (item.status === 'em-andamento') {
      sugestoes.push({
        item,
        prioridade: 50 + Math.floor(diasDesde === Infinity ? 0 : diasDesde),
        motivo: formatVistoHa(item.ultimaVisitaIso),
        tipo: 'continuar',
      });
    } else {
      sugestoes.push({
        item,
        prioridade: 10,
        motivo: 'Nunca estudado',
        tipo: 'comecar',
      });
    }
  }

  return sugestoes.sort((a, b) => b.prioridade - a.prioridade).slice(0, limite);
}
