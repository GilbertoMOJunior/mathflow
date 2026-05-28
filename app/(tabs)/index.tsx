import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDuracao, formatRelativo } from '../../lib/format';
import {
  classificarConteudos,
  gerarSugestoes,
  type Sugestao,
} from '../../lib/progresso';
import { useAppStore } from '../../store/useAppStore';

export default function InicioScreen() {
  const registros = useAppStore((s) => s.registros);
  const interesses = useAppStore((s) => s.interesses);
  const usuario = useAppStore((s) => s.usuario);

  const { minutosSemana, ultimaIso } = useMemo(() => {
    const inicioSemana = new Date();
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(inicioSemana.getDate() - 6);
    const minutos = registros
      .filter((r) => new Date(r.timestamp) >= inicioSemana)
      .reduce((acc, r) => acc + r.tempoSegundos, 0);
    return { minutosSemana: minutos, ultimaIso: registros[0]?.timestamp ?? null };
  }, [registros]);

  const lista = useMemo(
    () => classificarConteudos(registros, interesses),
    [registros, interesses],
  );

  const contagens = useMemo(() => {
    let concluido = 0,
      andamento = 0,
      nao = 0;
    for (const x of lista) {
      if (x.status === 'concluido') concluido++;
      else if (x.status === 'em-andamento') andamento++;
      else nao++;
    }
    return { concluido, andamento, nao, total: lista.length };
  }, [lista]);

  const sugestoes = useMemo(() => gerarSugestoes(lista, 5), [lista]);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-4 pb-2">
          <Text className="text-ink text-2xl font-title">
            Olá, {usuario.nome.split(' ')[0]}
          </Text>
          <Text className="text-ink-muted text-sm mt-0.5">
            Continue evoluindo na fase {usuario.fase}
          </Text>
        </View>

        <View className="px-4 flex-row gap-3">
          <CardResumo
            icone="time-outline"
            label="esta semana"
            valor={minutosSemana > 0 ? formatDuracao(minutosSemana) : '—'}
          />
          <CardResumo
            icone="hourglass-outline"
            label="última sessão"
            valor={ultimaIso ? formatRelativo(ultimaIso) : 'nenhuma'}
          />
        </View>

        <SecaoLabel titulo="Progresso" />
        <View className="px-4">
          <Progresso contagens={contagens} />
        </View>

        <SecaoLabel titulo="Próximos conteúdos" />
        <View className="px-4 gap-2">
          {sugestoes.length === 0 ? (
            <View className="bg-white border border-surface-border rounded-2xl p-4">
              <Text className="text-ink-muted text-sm">
                {interesses.length === 0
                  ? 'Ative matérias no Perfil para receber sugestões.'
                  : 'Tudo em dia. Volte mais tarde para revisões.'}
              </Text>
            </View>
          ) : (
            sugestoes.map((s) => <SugestaoCard key={s.item.conteudo.id} sug={s} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CardResumo({
  icone,
  label,
  valor,
}: {
  icone: keyof typeof Ionicons.glyphMap;
  label: string;
  valor: string;
}) {
  return (
    <View className="flex-1 bg-white border border-surface-border rounded-2xl p-3">
      <View className="flex-row items-center">
        <Ionicons name={icone} size={14} color="#6B7280" />
        <Text className="text-ink-muted text-xs ml-1">{label}</Text>
      </View>
      <Text className="text-ink text-xl font-title mt-1">{valor}</Text>
    </View>
  );
}

function SecaoLabel({ titulo }: { titulo: string }) {
  return (
    <View className="px-4 mt-5 mb-2">
      <Text className="text-ink-muted text-xs uppercase tracking-wider">
        {titulo}
      </Text>
    </View>
  );
}

function Progresso({
  contagens,
}: {
  contagens: { concluido: number; andamento: number; nao: number; total: number };
}) {
  const total = Math.max(1, contagens.total);
  const pctC = (contagens.concluido / total) * 100;
  const pctA = (contagens.andamento / total) * 100;
  const pctN = 100 - pctC - pctA;

  return (
    <View className="bg-white border border-surface-border rounded-2xl p-4">
      <View className="flex-row justify-between mb-3">
        <ContagemItem
          cor="#185FA5"
          rotulo="Concluídos"
          valor={contagens.concluido}
        />
        <ContagemItem
          cor="#378ADD"
          rotulo="Em andamento"
          valor={contagens.andamento}
        />
        <ContagemItem
          cor="#E5E7EB"
          rotulo="Não iniciados"
          valor={contagens.nao}
        />
      </View>
      <View className="h-2 flex-row rounded-full overflow-hidden bg-surface-muted">
        {pctC > 0 ? (
          <View style={{ width: `${pctC}%`, backgroundColor: '#185FA5' }} />
        ) : null}
        {pctA > 0 ? (
          <View style={{ width: `${pctA}%`, backgroundColor: '#378ADD' }} />
        ) : null}
        {pctN > 0 ? (
          <View style={{ width: `${pctN}%`, backgroundColor: '#E5E7EB' }} />
        ) : null}
      </View>
      <Text className="text-ink-light text-[10px] mt-2">
        {contagens.total} conteúdos {contagens.total ? 'na sua grade ativa' : ''}
      </Text>
    </View>
  );
}

function ContagemItem({
  cor,
  rotulo,
  valor,
}: {
  cor: string;
  rotulo: string;
  valor: number;
}) {
  return (
    <View className="flex-1">
      <View className="flex-row items-center">
        <View
          style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: cor }}
        />
        <Text className="text-ink-muted text-[10px] ml-1.5">{rotulo}</Text>
      </View>
      <Text className="text-ink text-xl font-title mt-0.5">{valor}</Text>
    </View>
  );
}

const iconePorTipo: Record<
  Sugestao['tipo'],
  { nome: keyof typeof Ionicons.glyphMap; cor: string; bg: string }
> = {
  revisar: { nome: 'refresh-outline', cor: '#185FA5', bg: '#EDF4FC' },
  continuar: { nome: 'play-outline', cor: '#378ADD', bg: '#EDF4FC' },
  comecar: { nome: 'sparkles-outline', cor: '#0F4377', bg: '#F4F5F7' },
};

function SugestaoCard({ sug }: { sug: Sugestao }) {
  const ic = iconePorTipo[sug.tipo];
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/estudar/sessao',
          params: { conteudoId: sug.item.conteudo.id },
        })
      }
      className="bg-white border border-surface-border rounded-2xl p-3 flex-row items-center"
    >
      <View
        style={{ backgroundColor: ic.bg }}
        className="w-9 h-9 rounded-full items-center justify-center mr-3"
      >
        <Ionicons name={ic.nome} size={18} color={ic.cor} />
      </View>
      <View className="flex-1">
        <Text className="text-ink-muted text-[11px]" numberOfLines={1}>
          {sug.item.disciplina.nome} · Fase {sug.item.disciplina.fase}
        </Text>
        <Text className="text-ink text-sm font-title mt-0.5" numberOfLines={1}>
          {sug.item.conteudo.titulo}
        </Text>
        <Text className="text-ink-light text-[10px] mt-0.5">{sug.motivo}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </Pressable>
  );
}
