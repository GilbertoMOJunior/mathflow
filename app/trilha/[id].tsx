import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade, type Conteudo, type Disciplina } from '../../data/grade';
import { classificarConteudos } from '../../lib/progresso';
import { useAppStore } from '../../store/useAppStore';

type StatusConteudo = 'concluido' | 'em-andamento' | 'nao-iniciado';

const badgeMeta: Record<
  StatusConteudo,
  { rotulo: string; cor: string; bg: string }
> = {
  concluido: { rotulo: 'Concluído', cor: '#185FA5', bg: '#EDF4FC' },
  'em-andamento': { rotulo: 'Em andamento', cor: '#378ADD', bg: '#EDF4FC' },
  'nao-iniciado': { rotulo: 'Não iniciado', cor: '#6B7280', bg: '#F4F5F7' },
};

type ItemTrilha = { disciplina: Disciplina; conteudo: Conteudo };

export default function TrilhaDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const registros = useAppStore((s) => s.registros);
  const trilhas = useAppStore((s) => s.trilhas);
  const removeTrilha = useAppStore((s) => s.removeTrilha);

  const statusPorConteudo = useMemo(() => {
    const m = new Map<string, StatusConteudo>();
    for (const x of classificarConteudos(registros, [])) {
      m.set(x.conteudo.id, x.status);
    }
    return m;
  }, [registros]);

  const trilha = useMemo(() => resolverTrilha(id, trilhas), [id, trilhas]);

  if (!trilha) {
    return (
      <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
        <Cabecalho titulo="Trilha" />
        <View className="px-4 py-8">
          <Text className="text-ink-muted text-sm">Trilha não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalCards = trilha.itens.reduce(
    (s, it) => s + it.conteudo.flashcards.length,
    0,
  );
  const concluidos = trilha.itens.filter(
    (it) => statusPorConteudo.get(it.conteudo.id) === 'concluido',
  ).length;
  const pct =
    trilha.itens.length > 0
      ? Math.round((concluidos / trilha.itens.length) * 100)
      : 0;

  const proxima = trilha.itens.find(
    (it) => statusPorConteudo.get(it.conteudo.id) !== 'concluido',
  );

  const confirmarRemover = () => {
    Alert.alert(
      'Remover trilha',
      `Tem certeza que deseja remover "${trilha.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            removeTrilha(trilha.id);
            router.back();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      <Cabecalho
        titulo={trilha.custom ? 'Trilha personalizada' : 'Matéria'}
        acao={
          trilha.custom
            ? {
                icone: 'trash-outline',
                cor: '#DB2777',
                onPress: confirmarRemover,
                label: 'Remover trilha',
              }
            : undefined
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-surface-border rounded-2xl p-4 mt-2">
          <Text className="text-ink-muted text-[11px]">{trilha.subtitulo}</Text>
          <Text className="text-ink text-xl font-title mt-0.5">
            {trilha.nome}
          </Text>
          <Text className="text-ink-light text-[11px] mt-1">
            {trilha.itens.length} conteúdos · {totalCards} cards
          </Text>
          <View className="mt-3 h-2 rounded-full bg-surface-muted overflow-hidden">
            <View
              style={{ width: `${pct}%`, backgroundColor: '#185FA5' }}
              className="h-full"
            />
          </View>
          <Text className="text-ink-light text-[10px] mt-1.5">
            {concluidos}/{trilha.itens.length} concluídos · {pct}%
          </Text>
        </View>

        <Text className="text-ink-muted text-xs uppercase tracking-wider mt-6 mb-2 px-1">
          Conteúdos
        </Text>
        {trilha.itens.length === 0 ? (
          <View className="bg-white border border-surface-border rounded-2xl p-4">
            <Text className="text-ink-muted text-sm">
              Esta trilha não possui conteúdos.
            </Text>
          </View>
        ) : (
          <View className="bg-white border border-surface-border rounded-2xl overflow-hidden">
            {trilha.itens.map((it, idx) => {
              const status =
                statusPorConteudo.get(it.conteudo.id) ?? 'nao-iniciado';
              const b = badgeMeta[status];
              return (
                <Pressable
                  key={it.conteudo.id}
                  onPress={() =>
                    router.push({
                      pathname: '/conteudo/[id]',
                      params: { id: it.conteudo.id },
                    })
                  }
                  className="p-3 flex-row items-center"
                >
                  <Text className="text-ink-light text-[11px] w-6">
                    {idx + 1}
                  </Text>
                  <View className="flex-1">
                    <Text
                      className="text-ink text-sm font-title"
                      numberOfLines={1}
                    >
                      {it.conteudo.titulo}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text
                        className="text-ink-muted text-[10px] mr-2"
                        numberOfLines={1}
                      >
                        {it.disciplina.nome}
                      </Text>
                      <View
                        style={{ backgroundColor: b.bg }}
                        className="rounded-full px-2 py-0.5"
                      >
                        <Text
                          style={{ color: b.cor }}
                          className="text-[10px] font-title"
                        >
                          {b.rotulo}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                  {idx < trilha.itens.length - 1 ? (
                    <View
                      style={{
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: 0,
                        height: 1,
                        backgroundColor: '#F4F5F7',
                      }}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      {proxima ? (
        <View
          className="px-4 pt-3 border-t border-surface-border bg-white"
          style={{ paddingBottom: 12 }}
        >
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/estudar/sessao',
                params: { conteudoId: proxima.conteudo.id },
              })
            }
            className="bg-primary rounded-2xl py-3 flex-row items-center justify-center"
          >
            <Ionicons name="flash" size={18} color="white" />
            <Text className="text-white text-base font-title ml-2">
              Estudar próximo: {proxima.conteudo.titulo}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

type TrilhaResolvida = {
  id: string;
  nome: string;
  subtitulo: string;
  itens: ItemTrilha[];
  custom: boolean;
};

function resolverTrilha(
  id: string | undefined,
  trilhas: { id: string; nome: string; conteudoIds: string[] }[],
): TrilhaResolvida | null {
  if (!id) return null;

  if (id.startsWith('t-disc-')) {
    const disciplinaId = id.slice('t-disc-'.length);
    const disciplina = grade.find((d) => d.id === disciplinaId);
    if (!disciplina) return null;
    const itens: ItemTrilha[] = disciplina.conteudos.map((c) => ({
      disciplina,
      conteudo: c,
    }));
    return {
      id,
      nome: disciplina.nome,
      subtitulo: `Matéria · Fase ${disciplina.fase}`,
      itens,
      custom: false,
    };
  }

  const custom = trilhas.find((t) => t.id === id);
  if (!custom) return null;
  const itens: ItemTrilha[] = [];
  for (const cid of custom.conteudoIds) {
    for (const d of grade) {
      const c = d.conteudos.find((x) => x.id === cid);
      if (c) {
        itens.push({ disciplina: d, conteudo: c });
        break;
      }
    }
  }
  return {
    id: custom.id,
    nome: custom.nome,
    subtitulo: 'Trilha personalizada',
    itens,
    custom: true,
  };
}

function Cabecalho({
  titulo,
  acao,
}: {
  titulo: string;
  acao?: {
    icone: keyof typeof Ionicons.glyphMap;
    cor: string;
    onPress: () => void;
    label: string;
  };
}) {
  return (
    <View className="px-4 pt-4 flex-row items-center">
      <Pressable onPress={() => router.back()} hitSlop={8} className="mr-2">
        <Ionicons name="chevron-back" size={24} color="#185FA5" />
      </Pressable>
      <Text className="text-ink text-base font-title flex-1">{titulo}</Text>
      {acao ? (
        <Pressable
          onPress={acao.onPress}
          hitSlop={8}
          className="p-1"
          accessibilityLabel={acao.label}
        >
          <Ionicons name={acao.icone} size={20} color={acao.cor} />
        </Pressable>
      ) : null}
    </View>
  );
}
