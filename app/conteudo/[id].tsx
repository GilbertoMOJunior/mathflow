import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade } from '../../data/grade';
import { formatDuracao, formatRelativo } from '../../lib/format';
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

export default function ConteudoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const registros = useAppStore((s) => s.registros);
  const favoritos = useAppStore((s) => s.favoritos);
  const toggleFavorito = useAppStore((s) => s.toggleFavorito);

  const resolvido = useMemo(() => {
    for (const d of grade) {
      const c = d.conteudos.find((x) => x.id === id);
      if (c) return { disciplina: d, conteudo: c };
    }
    return null;
  }, [id]);

  const stats = useMemo(() => {
    if (!resolvido) return null;
    const regs = registros.filter((r) => r.conteudoId === resolvido.conteudo.id);
    const maxRevisadosSessao = regs.reduce(
      (m, r) => Math.max(m, r.flashcardsRevisados),
      0,
    );
    const total = resolvido.conteudo.flashcards.length;
    let status: StatusConteudo;
    if (regs.length === 0) status = 'nao-iniciado';
    else if (maxRevisadosSessao >= total) status = 'concluido';
    else status = 'em-andamento';
    const tempoTotal = regs.reduce((s, r) => s + r.tempoSegundos, 0);
    return {
      status,
      totalSessoes: regs.length,
      ultimaIso: regs[0]?.timestamp ?? null,
      tempoTotal,
      melhorSessao: maxRevisadosSessao,
    };
  }, [registros, resolvido]);

  if (!resolvido) {
    return (
      <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
        <Cabecalho />
        <View className="px-4 py-8">
          <Text className="text-ink-muted text-sm">Conteúdo não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { disciplina, conteudo } = resolvido;
  const favorito = favoritos.includes(conteudo.id);
  const b = badgeMeta[stats!.status];

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      <Cabecalho />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-surface-border rounded-2xl p-4 mt-2">
          <Text className="text-ink-muted text-[11px]" numberOfLines={1}>
            {disciplina.nome} · Fase {disciplina.fase}
          </Text>
          <View className="flex-row items-start mt-1">
            <Text
              className="text-ink text-xl font-title flex-1"
              numberOfLines={3}
            >
              {conteudo.titulo}
            </Text>
            <Pressable
              onPress={() => toggleFavorito(conteudo.id)}
              hitSlop={10}
              className="ml-2 p-1"
              accessibilityLabel={
                favorito ? 'Remover dos favoritos' : 'Favoritar'
              }
            >
              <Ionicons
                name={favorito ? 'star' : 'star-outline'}
                size={26}
                color={favorito ? '#185FA5' : '#9CA3AF'}
              />
            </Pressable>
          </View>

          <View className="flex-row items-center mt-3">
            <View
              style={{ backgroundColor: b.bg }}
              className="rounded-full px-2 py-0.5"
            >
              <Text style={{ color: b.cor }} className="text-[11px] font-title">
                {b.rotulo}
              </Text>
            </View>
            <Text className="text-ink-light text-[11px] ml-2">
              {conteudo.flashcards.length} cards
            </Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-3">
          <CardEstat
            icone="layers-outline"
            label="sessões"
            valor={String(stats!.totalSessoes)}
          />
          <CardEstat
            icone="time-outline"
            label="tempo total"
            valor={stats!.tempoTotal > 0 ? formatDuracao(stats!.tempoTotal) : '—'}
          />
          <CardEstat
            icone="hourglass-outline"
            label="última"
            valor={stats!.ultimaIso ? formatRelativo(stats!.ultimaIso) : '—'}
          />
        </View>

        <Text className="text-ink-muted text-xs uppercase tracking-wider mt-6 mb-2 px-1">
          Flashcards
        </Text>
        <View className="bg-white border border-surface-border rounded-2xl overflow-hidden">
          {conteudo.flashcards.map((f, idx) => (
            <View
              key={f.id}
              className="p-3"
              style={{
                borderBottomWidth:
                  idx < conteudo.flashcards.length - 1 ? 1 : 0,
                borderBottomColor: '#F4F5F7',
              }}
            >
              <Text className="text-ink-light text-[10px]">
                {idx + 1} de {conteudo.flashcards.length} · {f.tipo}
              </Text>
              <Text
                className="text-ink text-sm font-title mt-0.5"
                numberOfLines={2}
              >
                {f.tipo === 'imagem' ? 'Card com imagem' : f.frente}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        className="px-4 pt-3 border-t border-surface-border bg-white"
        style={{ paddingBottom: 12 }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/estudar/sessao',
              params: { conteudoId: conteudo.id },
            })
          }
          className="bg-primary rounded-2xl py-3 flex-row items-center justify-center"
        >
          <Ionicons name="flash" size={18} color="white" />
          <Text className="text-white text-base font-title ml-2">
            Iniciar sessão
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Cabecalho() {
  return (
    <View className="px-4 pt-4 flex-row items-center">
      <Pressable onPress={() => router.back()} hitSlop={8} className="mr-2">
        <Ionicons name="chevron-back" size={24} color="#185FA5" />
      </Pressable>
      <Text className="text-ink text-base font-title">Detalhes</Text>
    </View>
  );
}

function CardEstat({
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
        <Ionicons name={icone} size={13} color="#6B7280" />
        <Text className="text-ink-muted text-[10px] ml-1">{label}</Text>
      </View>
      <Text className="text-ink text-base font-title mt-1" numberOfLines={1}>
        {valor}
      </Text>
    </View>
  );
}
