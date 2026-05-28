import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade } from '../../data/grade';
import { useAppStore } from '../../store/useAppStore';

const fases = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function NovaTrilhaScreen() {
  const addTrilha = useAppStore((s) => s.addTrilha);
  const [nome, setNome] = useState('');
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const [faseFiltro, setFaseFiltro] = useState<number | null>(null);

  const disciplinas = useMemo(() => {
    if (faseFiltro == null) return grade;
    return grade.filter((d) => d.fase === faseFiltro);
  }, [faseFiltro]);

  const totalCards = useMemo(() => {
    let n = 0;
    for (const id of selecionados) {
      for (const d of grade) {
        const c = d.conteudos.find((x) => x.id === id);
        if (c) {
          n += c.flashcards.length;
          break;
        }
      }
    }
    return n;
  }, [selecionados]);

  const toggle = (id: string) =>
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const salvar = () => {
    const nomeTrim = nome.trim();
    if (!nomeTrim) {
      Alert.alert('Nome obrigatório', 'Dê um nome para a trilha.');
      return;
    }
    if (selecionados.size === 0) {
      Alert.alert('Sem conteúdos', 'Selecione ao menos um conteúdo.');
      return;
    }
    const id = addTrilha(nomeTrim, Array.from(selecionados));
    router.replace({ pathname: '/trilha/[id]', params: { id } });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      <View className="px-4 pt-4 flex-row items-center">
        <Pressable onPress={() => router.back()} hitSlop={8} className="mr-2">
          <Ionicons name="chevron-back" size={24} color="#185FA5" />
        </Pressable>
        <Text className="text-ink text-base font-title flex-1">
          Nova trilha
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-white border border-surface-border rounded-2xl p-3 mt-3">
          <Text className="text-ink-muted text-[11px] uppercase tracking-wider">
            Nome
          </Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Ex.: Revisão prova 1"
            placeholderTextColor="#9CA3AF"
            className="text-ink text-base mt-1"
            style={{ paddingVertical: 4 }}
            maxLength={60}
            returnKeyType="done"
          />
        </View>

        <Text className="text-ink-muted text-xs uppercase tracking-wider mt-6 mb-2 px-1">
          Conteúdos {selecionados.size > 0 ? `(${selecionados.size})` : ''}
        </Text>

        <View style={{ height: 44 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4, alignItems: 'center' }}
          >
            <Chip
              ativo={faseFiltro === null}
              onPress={() => setFaseFiltro(null)}
              label="Todas"
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

        <View className="gap-4 mt-2">
          {disciplinas.map((d) => (
            <View key={d.id}>
              <View className="flex-row items-baseline justify-between mb-2 px-1">
                <Text
                  className="text-ink text-base font-title flex-1"
                  numberOfLines={1}
                >
                  {d.nome}
                </Text>
                <Text className="text-ink-light text-[10px] ml-2">
                  Fase {d.fase}
                </Text>
              </View>
              <View className="bg-white border border-surface-border rounded-2xl overflow-hidden">
                {d.conteudos.map((c, idx) => {
                  const ativo = selecionados.has(c.id);
                  return (
                    <Pressable
                      key={c.id}
                      onPress={() => toggle(c.id)}
                      className="p-3 flex-row items-center"
                    >
                      <View
                        className="w-5 h-5 rounded-md items-center justify-center mr-3"
                        style={{
                          backgroundColor: ativo ? '#185FA5' : 'transparent',
                          borderWidth: 1.5,
                          borderColor: ativo ? '#185FA5' : '#9CA3AF',
                        }}
                      >
                        {ativo ? (
                          <Ionicons name="checkmark" size={14} color="white" />
                        ) : null}
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-ink text-sm font-title"
                          numberOfLines={1}
                        >
                          {c.titulo}
                        </Text>
                        <Text className="text-ink-light text-[10px] mt-0.5">
                          {c.flashcards.length} cards
                        </Text>
                      </View>
                      {idx < d.conteudos.length - 1 ? (
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
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        className="px-4 pt-3 border-t border-surface-border bg-white"
        style={{ paddingBottom: 12 }}
      >
        <View className="flex-row items-center mb-2">
          <Text className="text-ink-muted text-[11px] flex-1">
            {selecionados.size} conteúdos · {totalCards} cards
          </Text>
        </View>
        <Pressable
          onPress={salvar}
          disabled={selecionados.size === 0 || !nome.trim()}
          className="rounded-2xl py-3 flex-row items-center justify-center"
          style={{
            backgroundColor:
              selecionados.size === 0 || !nome.trim() ? '#9CA3AF' : '#185FA5',
          }}
        >
          <Ionicons name="checkmark" size={18} color="white" />
          <Text className="text-white text-base font-title ml-2">
            Salvar trilha
          </Text>
        </Pressable>
      </View>
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
