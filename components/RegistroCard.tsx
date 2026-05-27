import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { RegistroEstudo } from '../data/grade';
import { corPorId, formatDuracao, formatRelativo, iniciais } from '../lib/format';

type Props = {
  registro: RegistroEstudo;
  nomeAutor?: string;
  mostrarAvatar?: boolean;
};

const nomesColegas: Record<string, string> = {
  'u-ana': 'Ana Souza',
  'u-bruno': 'Bruno Lima',
  'u-carla': 'Carla Mendes',
  'u-diego': 'Diego Rocha',
  'u-elisa': 'Elisa Prado',
  'u-felipe': 'Felipe Alves',
  'u-gabriela': 'Gabriela Reis',
  'u-henrique': 'Henrique Dias',
  'u-isabela': 'Isabela Costa',
};

export default function RegistroCard({
  registro,
  nomeAutor,
  mostrarAvatar = false,
}: Props) {
  const autor = nomeAutor ?? nomesColegas[registro.userId] ?? 'Colega';
  const cor = corPorId(registro.userId);

  return (
    <View className="flex-row items-center bg-white border border-surface-border rounded-2xl p-3">
      {mostrarAvatar ? (
        <View
          style={{ backgroundColor: cor }}
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
        >
          <Text className="text-white font-title text-sm">{iniciais(autor)}</Text>
        </View>
      ) : null}
      <View className="flex-1">
        {mostrarAvatar ? (
          <Text className="text-ink text-sm font-title">{autor}</Text>
        ) : null}
        <Text
          className="text-ink text-sm"
          numberOfLines={1}
        >
          {registro.disciplinaNome} · {registro.conteudoTitulo}
        </Text>
        <Text className="text-ink-muted text-xs mt-0.5">
          {registro.flashcardsRevisados} flashcards revisados
        </Text>
      </View>
      <View className="ml-2 items-end">
        <View className="flex-row items-center bg-surface-muted rounded-full px-2 py-1">
          <Ionicons name="time-outline" size={12} color="#6B7280" />
          <Text className="text-ink-muted text-[11px] ml-1">
            {formatDuracao(registro.tempoSegundos)}
          </Text>
        </View>
        <Text className="text-ink-light text-[10px] mt-1">
          {formatRelativo(registro.timestamp)}
        </Text>
      </View>
    </View>
  );
}
