export const formatTempo = (segundos: number) => {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const formatDuracao = (segundos: number) => {
  const min = Math.round(segundos / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const rest = min % 60;
  return rest ? `${h}h ${rest}min` : `${h}h`;
};

export const formatRelativo = (iso: string) => {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const min = Math.round(diff / 60000);
  if (min < 1) return 'agora';
  if (min < 60) return `há ${min}min`;
  const h = Math.round(min / 60);
  if (h < 24) return `há ${h}h`;
  if (h < 48) return 'ontem';
  const d = Math.round(h / 24);
  if (d < 7) return `há ${d}d`;
  return new Date(iso).toLocaleDateString('pt-BR');
};

export const iniciais = (nome: string) => {
  const partes = nome.trim().split(/\s+/);
  const a = partes[0]?.[0] ?? '';
  const b = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (a + b).toUpperCase();
};

const cores = [
  '#185FA5',
  '#378ADD',
  '#0F4377',
  '#7C3AED',
  '#DB2777',
  '#16A34A',
  '#EA580C',
  '#0891B2',
];
export const corPorId = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return cores[Math.abs(h) % cores.length];
};
