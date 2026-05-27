import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade } from '../../data/grade';
import { useAppStore } from '../../store/useAppStore';

export default function GerenciarScreen() {
  const interesses = useAppStore((s) => s.interesses);
  const toggleInteresse = useAppStore((s) => s.toggleInteresse);

  const porFase = useMemo(() => {
    const map = new Map<number, typeof grade>();
    for (const d of grade) {
      const lista = map.get(d.fase) ?? [];
      lista.push(d);
      map.set(d.fase, lista);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      <View className="px-4 pt-4 flex-row items-center">
        <Pressable onPress={() => router.back()} hitSlop={8} className="mr-2">
          <Ionicons name="chevron-back" size={24} color="#185FA5" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-ink text-xl font-title">Gerenciar matérias</Text>
          <Text className="text-ink-muted text-xs mt-0.5">
            Ative o que quer estudar
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {porFase.map(([fase, disciplinas]) => (
          <View key={fase}>
            <Text className="text-ink-muted text-xs uppercase tracking-wider mb-2">
              Fase {fase}
            </Text>
            <View className="gap-2">
              {disciplinas.map((d) => {
                const ativo = interesses.includes(d.id);
                return (
                  <View
                    key={d.id}
                    className="bg-white border border-surface-border rounded-2xl p-3 flex-row items-center"
                  >
                    <View className="flex-1">
                      <Text className="text-ink text-sm font-title">
                        {d.nome}
                      </Text>
                      <Text className="text-ink-muted text-xs mt-0.5">
                        {d.conteudos.length} conteúdos
                      </Text>
                    </View>
                    <Switch
                      value={ativo}
                      onValueChange={() => toggleInteresse(d.id)}
                      trackColor={{ false: '#E5E7EB', true: '#185FA5' }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
