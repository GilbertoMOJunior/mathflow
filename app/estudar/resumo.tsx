import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDuracao } from '../../lib/format';
import { useAppStore } from '../../store/useAppStore';

export default function ResumoScreen() {
  const params = useLocalSearchParams<{
    disciplinaId: string;
    disciplinaNome: string;
    conteudoId: string;
    conteudoTitulo: string;
    fase: string;
    tempoSegundos: string;
    flashcardsRevisados: string;
  }>();
  const addRegistro = useAppStore((s) => s.addRegistro);

  const tempo = Number(params.tempoSegundos ?? 0);
  const revisados = Number(params.flashcardsRevisados ?? 0);
  const fase = Number(params.fase ?? 0);

  const salvar = () => {
    addRegistro({
      disciplinaId: String(params.disciplinaId),
      disciplinaNome: String(params.disciplinaNome),
      conteudoId: String(params.conteudoId),
      conteudoTitulo: String(params.conteudoTitulo),
      fase,
      tempoSegundos: tempo,
      flashcardsRevisados: revisados,
    });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      <View className="px-4 pt-4 flex-row items-center">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color="#185FA5" />
        </Pressable>
      </View>

      <View className="flex-1 px-4 pt-6">
        <View className="items-center mb-6">
          <View className="w-14 h-14 rounded-full bg-primary-50 items-center justify-center">
            <Ionicons name="checkmark" size={28} color="#185FA5" />
          </View>
          <Text className="text-ink text-2xl font-title mt-3">
            Sessão concluída
          </Text>
        </View>

        <View className="bg-white border border-surface-border rounded-2xl p-4 gap-3">
          <Linha label="Disciplina" valor={String(params.disciplinaNome)} />
          <Linha label="Conteúdo" valor={String(params.conteudoTitulo)} />
          <Linha label="Fase" valor={`Fase ${fase}`} />
          <Linha
            label="Tempo total"
            valor={tempo > 0 ? formatDuracao(tempo) : '—'}
          />
          <Linha
            label="Flashcards revisados"
            valor={String(revisados)}
          />
        </View>

        <View className="flex-1" />

        <Pressable
          onPress={salvar}
          className="bg-primary rounded-full py-4 items-center"
          style={{ minHeight: 44 }}
        >
          <Text className="text-white font-title">Salvar registro</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace('/(tabs)/estudar')}
          className="mt-2 py-3 items-center"
        >
          <Text className="text-ink-muted text-sm">Descartar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Linha({ label, valor }: { label: string; valor: string }) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-ink-muted text-xs">{label}</Text>
      <Text className="text-ink text-sm font-title text-right flex-1 ml-3">
        {valor}
      </Text>
    </View>
  );
}
