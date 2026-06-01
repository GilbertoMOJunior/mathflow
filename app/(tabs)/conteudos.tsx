import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade, type Conteudo, type Disciplina } from '../../data/grade';
import {
  classificarConteudos,
  type StatusConteudo,
} from '../../lib/progresso';
import { useAppStore } from '../../store/useAppStore';

const fases = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function ConteudosScreen() {
  const registros = useAppStore((s) => s.registros);
  const favoritos = useAppStore((s) => s.favoritos);
  const interesses = useAppStore((s) => s.interesses);
  const toggleFavorito = useAppStore((s) => s.toggleFavorito);
  const [faseFiltro, setFaseFiltro] = useState<number | null>(null);
  const [minimizadas, setMinimizadas] = useState<Set<string>>(new Set());

  const toggleMinimizada = (id: string) =>
    setMinimizadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const statusPorConteudo = useMemo(() => {
    const m = new Map<string, StatusConteudo>();
    for (const x of classificarConteudos(registros, [])) {
      m.set(x.conteudo.id, x.status);
    }
    return m;
  }, [registros]);

  const favoritosSet = useMemo(() => new Set(favoritos), [favoritos]);

  const disciplinasFiltradas = useMemo(() => {
    if (faseFiltro == null) {
      return interesses.length > 0
        ? grade.filter((d) => interesses.includes(d.id))
        : grade;
    }
    return grade.filter((d) => d.fase === faseFiltro);
  }, [faseFiltro, interesses]);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <View className="px-4 pt-4">
        <Text className="text-ink text-2xl font-title">Conteúdos</Text>
        <Text className="text-ink-muted text-sm mt-0.5">
          Explore por matéria, favorite o que quiser revisitar
        </Text>
      </View>

      <View style={{ height: 52 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            alignItems: 'center',
          }}
        >
          <Chip
            ativo={faseFiltro === null}
            onPress={() => setFaseFiltro(null)}
            label="Ativas"
          />
          {fases.map((f) => (
            <Chip
              key={f}
              ativo={faseFiltro === f}
              onPress={() => setFaseFiltro(f)}
              label={`Fase ${f}`}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {disciplinasFiltradas.length === 0 ? (
          <View className="bg-white border border-surface-border rounded-2xl p-4">
            <Text className="text-ink-muted text-sm">
              {faseFiltro == null
                ? 'Nenhuma matéria ativa. Ajuste suas matérias no Perfil.'
                : 'Nenhuma disciplina nesta fase.'}
            </Text>
          </View>
        ) : (
          disciplinasFiltradas.map((d) => (
            <GrupoDisciplina
              key={d.id}
              disciplina={d}
              statusPorConteudo={statusPorConteudo}
              favoritosSet={favoritosSet}
              onToggleFavorito={toggleFavorito}
              minimizada={minimizadas.has(d.id)}
              onToggleMinimizada={() => toggleMinimizada(d.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function GrupoDisciplina({
  disciplina,
  statusPorConteudo,
  favoritosSet,
  onToggleFavorito,
  minimizada,
  onToggleMinimizada,
}: {
  disciplina: Disciplina;
  statusPorConteudo: Map<string, StatusConteudo>;
  favoritosSet: Set<string>;
  onToggleFavorito: (id: string) => void;
  minimizada: boolean;
  onToggleMinimizada: () => void;
}) {
  const totalFlashcards = disciplina.conteudos.reduce(
    (s, c) => s + c.flashcards.length,
    0,
  );
  return (
    <View>
      <Pressable
        onPress={onToggleMinimizada}
        hitSlop={6}
        className="flex-row items-center mb-2 px-1"
        accessibilityRole="button"
        accessibilityLabel={
          minimizada
            ? `Expandir ${disciplina.nome}`
            : `Minimizar ${disciplina.nome}`
        }
      >
        <Ionicons
          name={minimizada ? 'chevron-forward' : 'chevron-down'}
          size={16}
          color="#6B7280"
        />
        <Text
          className="text-ink text-base font-title flex-1 ml-1"
          numberOfLines={1}
        >
          {disciplina.nome}
        </Text>
        <Text className="text-ink-light text-[10px] ml-2">
          Fase {disciplina.fase} · {disciplina.conteudos.length} conteúdos ·{' '}
          {totalFlashcards} cards
        </Text>
      </Pressable>
      {minimizada ? null : (
        <View className="bg-white border border-surface-border rounded-2xl overflow-hidden">
          {disciplina.conteudos.map((c, idx) => (
            <ItemConteudo
              key={c.id}
              conteudo={c}
              status={statusPorConteudo.get(c.id) ?? 'nao-iniciado'}
              favorito={favoritosSet.has(c.id)}
              onToggleFavorito={() => onToggleFavorito(c.id)}
              mostrarDivisor={idx < disciplina.conteudos.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const badgeMeta: Record<
  StatusConteudo,
  { rotulo: string; cor: string; bg: string }
> = {
  concluido: { rotulo: 'Concluído', cor: '#185FA5', bg: '#EDF4FC' },
  'em-andamento': { rotulo: 'Em andamento', cor: '#378ADD', bg: '#EDF4FC' },
  'nao-iniciado': { rotulo: 'Não iniciado', cor: '#6B7280', bg: '#F4F5F7' },
};

function ItemConteudo({
  conteudo,
  status,
  favorito,
  onToggleFavorito,
  mostrarDivisor,
}: {
  conteudo: Conteudo;
  status: StatusConteudo;
  favorito: boolean;
  onToggleFavorito: () => void;
  mostrarDivisor: boolean;
}) {
  const b = badgeMeta[status];
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/conteudo/[id]',
          params: { id: conteudo.id },
        })
      }
      className="p-3 flex-row items-center"
    >
      <View className="flex-1">
        <Text className="text-ink text-sm font-title" numberOfLines={1}>
          {conteudo.titulo}
        </Text>
        <View className="flex-row items-center mt-1">
          <View
            style={{ backgroundColor: b.bg }}
            className="rounded-full px-2 py-0.5"
          >
            <Text style={{ color: b.cor }} className="text-[10px] font-title">
              {b.rotulo}
            </Text>
          </View>
          <Text className="text-ink-light text-[10px] ml-2">
            {conteudo.flashcards.length} cards
          </Text>
        </View>
      </View>
      <Pressable
        onPress={onToggleFavorito}
        hitSlop={10}
        className="px-2 py-1"
        accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Favoritar'}
      >
        <Ionicons
          name={favorito ? 'star' : 'star-outline'}
          size={20}
          color={favorito ? '#185FA5' : '#9CA3AF'}
        />
      </Pressable>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      {mostrarDivisor ? (
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
      style={{ minHeight: 36 }}
    >
      <Text
        className={`text-xs font-title ${ativo ? 'text-white' : 'text-ink-muted'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
