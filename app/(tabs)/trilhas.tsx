import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade } from '../../data/grade';
import { classificarConteudos } from '../../lib/progresso';
import { useAppStore } from '../../store/useAppStore';

const fases = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type ResumoTrilha = {
  id: string;
  nome: string;
  subtitulo: string;
  totalConteudos: number;
  totalCards: number;
  concluidos: number;
  custom: boolean;
};

export default function TrilhasScreen() {
  const registros = useAppStore((s) => s.registros);
  const trilhas = useAppStore((s) => s.trilhas);
  const [faseMateria, setFaseMateria] = useState<number | null>(null);

  const statusPorConteudo = useMemo(() => {
    const m = new Map<string, 'concluido' | 'em-andamento' | 'nao-iniciado'>();
    for (const x of classificarConteudos(registros, [])) {
      m.set(x.conteudo.id, x.status);
    }
    return m;
  }, [registros]);

  const trilhasMateria: ResumoTrilha[] = useMemo(() => {
    const disciplinas =
      faseMateria == null
        ? grade
        : grade.filter((d) => d.fase === faseMateria);
    return disciplinas.map((d) => {
      const cards = d.conteudos.reduce((s, c) => s + c.flashcards.length, 0);
      const concluidos = d.conteudos.filter(
        (c) => statusPorConteudo.get(c.id) === 'concluido',
      ).length;
      return {
        id: `t-disc-${d.id}`,
        nome: d.nome,
        subtitulo: `Matéria · Fase ${d.fase}`,
        totalConteudos: d.conteudos.length,
        totalCards: cards,
        concluidos,
        custom: false,
      };
    });
  }, [statusPorConteudo, faseMateria]);

  const trilhasCustom: ResumoTrilha[] = useMemo(() => {
    return trilhas.map((t) => {
      let cards = 0;
      let concluidos = 0;
      let achados = 0;
      for (const cid of t.conteudoIds) {
        const conteudo = encontrarConteudo(cid);
        if (!conteudo) continue;
        achados++;
        cards += conteudo.flashcards.length;
        if (statusPorConteudo.get(cid) === 'concluido') concluidos++;
      }
      return {
        id: t.id,
        nome: t.nome,
        subtitulo: 'Personalizada',
        totalConteudos: achados,
        totalCards: cards,
        concluidos,
        custom: true,
      };
    });
  }, [trilhas, statusPorConteudo]);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-4">
          <Text className="text-ink text-2xl font-title">Trilhas</Text>
          <Text className="text-ink-muted text-sm mt-0.5">
            Compilados por semestre ou monte a sua própria rota
          </Text>
        </View>

        <SecaoLabel
          titulo="Suas trilhas"
          acao={{
            texto: 'Criar nova',
            onPress: () => router.push('/trilha/nova'),
          }}
        />
        <View className="px-4 gap-2">
          {trilhasCustom.length === 0 ? (
            <Pressable
              onPress={() => router.push('/trilha/nova')}
              className="bg-white border border-dashed border-surface-border rounded-2xl p-4 flex-row items-center"
            >
              <View
                style={{ backgroundColor: '#EDF4FC' }}
                className="w-9 h-9 rounded-full items-center justify-center mr-3"
              >
                <Ionicons name="add" size={20} color="#185FA5" />
              </View>
              <View className="flex-1">
                <Text className="text-ink text-sm font-title">
                  Criar trilha personalizada
                </Text>
                <Text className="text-ink-muted text-[11px] mt-0.5">
                  Escolha conteúdos de qualquer fase
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          ) : (
            trilhasCustom.map((t) => <TrilhaCard key={t.id} resumo={t} />)
          )}
        </View>

        <SecaoLabel titulo="Por matéria" />
        <View style={{ height: 44 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 4,
              alignItems: 'center',
            }}
          >
            <Chip
              ativo={faseMateria === null}
              onPress={() => setFaseMateria(null)}
              label="Todas"
            />
            {fases.map((f) => (
              <Chip
                key={f}
                ativo={faseMateria === f}
                onPress={() => setFaseMateria(f)}
                label={`Fase ${f}`}
              />
            ))}
          </ScrollView>
        </View>
        <View className="px-4 gap-2 mt-1">
          {trilhasMateria.length === 0 ? (
            <View className="bg-white border border-surface-border rounded-2xl p-4">
              <Text className="text-ink-muted text-sm">
                Nenhuma matéria nesta fase.
              </Text>
            </View>
          ) : (
            trilhasMateria.map((t) => <TrilhaCard key={t.id} resumo={t} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Chip({
  ativo,
  onPress,
  label,
}: {
  ativo: boolean;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-2 px-3 py-2 rounded-full border ${
        ativo ? 'bg-primary border-primary' : 'bg-white border-surface-border'
      }`}
      style={{ minHeight: 32 }}
    >
      <Text
        className={`text-xs font-title ${ativo ? 'text-white' : 'text-ink-muted'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function encontrarConteudo(id: string) {
  for (const d of grade) {
    const c = d.conteudos.find((x) => x.id === id);
    if (c) return c;
  }
  return null;
}

function SecaoLabel({
  titulo,
  acao,
}: {
  titulo: string;
  acao?: { texto: string; onPress: () => void };
}) {
  return (
    <View className="px-4 mt-5 mb-2 flex-row items-center justify-between">
      <Text className="text-ink-muted text-xs uppercase tracking-wider">
        {titulo}
      </Text>
      {acao ? (
        <Pressable onPress={acao.onPress} hitSlop={8}>
          <Text className="text-primary text-xs font-title">{acao.texto}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function TrilhaCard({ resumo }: { resumo: ResumoTrilha }) {
  const pct =
    resumo.totalConteudos > 0
      ? Math.round((resumo.concluidos / resumo.totalConteudos) * 100)
      : 0;
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/trilha/[id]', params: { id: resumo.id } })
      }
      className="bg-white border border-surface-border rounded-2xl p-3"
    >
      <View className="flex-row items-center">
        <View
          style={{ backgroundColor: resumo.custom ? '#F4F5F7' : '#EDF4FC' }}
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
        >
          <Ionicons
            name={resumo.custom ? 'sparkles-outline' : 'map-outline'}
            size={18}
            color={resumo.custom ? '#0F4377' : '#185FA5'}
          />
        </View>
        <View className="flex-1">
          <Text className="text-ink text-sm font-title" numberOfLines={1}>
            {resumo.nome}
          </Text>
          <Text className="text-ink-muted text-[11px] mt-0.5" numberOfLines={1}>
            {resumo.subtitulo} · {resumo.totalConteudos} conteúdos ·{' '}
            {resumo.totalCards} cards
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
      <View className="mt-3">
        <View className="h-1.5 rounded-full bg-surface-muted overflow-hidden">
          <View
            style={{ width: `${pct}%`, backgroundColor: '#185FA5' }}
            className="h-full"
          />
        </View>
        <Text className="text-ink-light text-[10px] mt-1.5">
          {resumo.concluidos}/{resumo.totalConteudos} concluídos · {pct}%
        </Text>
      </View>
    </Pressable>
  );
}
