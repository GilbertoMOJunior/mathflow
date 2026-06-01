import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade } from '../../data/grade';
import { useAppStore } from '../../store/useAppStore';

const fases = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function EstudarScreen() {
  const interesses = useAppStore((s) => s.interesses);
  const favoritos = useAppStore((s) => s.favoritos);
  const [faseFiltro, setFaseFiltro] = useState<number | null>(null);

  const favoritosSet = useMemo(() => new Set(favoritos), [favoritos]);

  const conteudos = useMemo(() => {
    const lista: {
      disciplinaId: string;
      disciplinaNome: string;
      fase: number;
      conteudoId: string;
      conteudoTitulo: string;
      nFlashcards: number;
    }[] = [];
    const usarInteresses = interesses.length > 0;
    for (const d of grade) {
      if (faseFiltro != null) {
        if (usarInteresses && !interesses.includes(d.id)) continue;
        if (d.fase !== faseFiltro) continue;
      }
      for (const c of d.conteudos) {
        if (faseFiltro == null && !favoritosSet.has(c.id)) continue;
        lista.push({
          disciplinaId: d.id,
          disciplinaNome: d.nome,
          fase: d.fase,
          conteudoId: c.id,
          conteudoTitulo: c.titulo,
          nFlashcards: c.flashcards.length,
        });
      }
    }
    return lista;
  }, [interesses, faseFiltro, favoritosSet]);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <View className="px-4 pt-4 pb-2">
        <Text className="text-ink text-2xl font-title">Estudar</Text>
        <Text className="text-ink-muted text-sm mt-0.5">
          {faseFiltro == null
            ? 'Seus conteúdos favoritos'
            : interesses.length > 0
              ? 'Conteúdos das suas matérias ativas'
              : 'Todos os conteúdos da grade'}
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
            label="Favoritos"
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, gap: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {conteudos.length === 0 ? (
          <View className="bg-white border border-surface-border rounded-2xl p-4">
            <Text className="text-ink-muted text-sm">
              {faseFiltro == null
                ? 'Você ainda não favoritou nenhum conteúdo. Favorite na aba Conteúdos.'
                : 'Nenhum conteúdo encontrado para este filtro.'}
            </Text>
          </View>
        ) : (
          conteudos.map((c) => (
            <Pressable
              key={c.conteudoId}
              onPress={() =>
                router.push({
                  pathname: '/estudar/sessao',
                  params: { conteudoId: c.conteudoId },
                })
              }
              className="bg-white border border-surface-border rounded-2xl p-4"
            >
              <View className="flex-row items-center">
                <View className="flex-1">
                  <Text className="text-ink-muted text-xs">
                    {c.disciplinaNome} · Fase {c.fase}
                  </Text>
                  <Text className="text-ink text-base font-title mt-0.5">
                    {c.conteudoTitulo}
                  </Text>
                  <Text className="text-ink-muted text-xs mt-1">
                    {c.nFlashcards} flashcards
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Pressable>
          ))
        )}
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
        ativo
          ? 'bg-primary border-primary'
          : 'bg-white border-surface-border'
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
