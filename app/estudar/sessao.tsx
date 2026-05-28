import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cronometro from '../../components/Cronometro';
import FlashCard from '../../components/FlashCard';
import { buscarConteudo } from '../../data/grade';

export default function SessaoScreen() {
  const { conteudoId } = useLocalSearchParams<{ conteudoId: string }>();
  const ctx = useMemo(
    () => (conteudoId ? buscarConteudo(conteudoId) : null),
    [conteudoId],
  );

  const [idx, setIdx] = useState(0);
  const [revisados, setRevisados] = useState<Set<string>>(new Set());
  const [confirmaEncerrar, setConfirmaEncerrar] = useState(false);
  const tempoRef = useRef(0);

  const onTick = useCallback((s: number) => {
    tempoRef.current = s;
  }, []);

  if (!ctx) {
    return (
      <SafeAreaView className="flex-1 bg-surface-muted items-center justify-center">
        <Text className="text-ink-muted">Conteúdo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const { disciplina, conteudo } = ctx;
  const total = conteudo.flashcards.length;
  const card = conteudo.flashcards[idx];
  const progresso = total > 0 ? ((idx + 1) / total) * 100 : 0;

  const marcarRevisado = () => {
    setRevisados((prev) => {
      const novo = new Set(prev);
      novo.add(card.id);
      return novo;
    });
  };

  const anterior = () => {
    marcarRevisado();
    setIdx((i) => Math.max(0, i - 1));
  };
  const proximo = () => {
    marcarRevisado();
    setIdx((i) => Math.min(total - 1, i + 1));
  };

  const encerrar = () => {
    const vistos = Math.max(revisados.size, idx + 1);
    router.replace({
      pathname: '/estudar/resumo',
      params: {
        disciplinaId: disciplina.id,
        disciplinaNome: disciplina.nome,
        conteudoId: conteudo.id,
        conteudoTitulo: conteudo.titulo,
        fase: String(disciplina.fase),
        tempoSegundos: String(tempoRef.current),
        flashcardsRevisados: String(vistos),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      {/* Topo: cronômetro pílula */}
      <View className="pt-2 pb-1 items-center">
        <Cronometro onTick={onTick} />
      </View>

      {/* Cabeçalho discreto */}
      <View className="px-4 mt-1">
        <Text className="text-ink-muted text-[11px] uppercase tracking-wider">
          {disciplina.nome}
        </Text>
        <Text className="text-ink text-base font-title mt-0.5">
          {conteudo.titulo}
        </Text>
      </View>

      {/* Barra de progresso fina */}
      <View className="mx-4 mt-3 h-[3px] bg-surface-border rounded-full overflow-hidden">
        <View
          style={{ width: `${progresso}%`, height: 3 }}
          className="bg-primary"
        />
      </View>
      <Text className="text-ink-light text-[10px] mt-1 text-right pr-4">
        {idx + 1} / {total}
      </Text>

      {/* Card */}
      <View className="flex-1 justify-center px-4">
        <FlashCard card={card} />

        {/* Navegação */}
        <View className="flex-row justify-between mt-4">
          <Pressable
            onPress={anterior}
            disabled={idx === 0}
            className={`flex-row items-center px-4 py-2 rounded-full ${
              idx === 0 ? 'bg-surface-muted' : 'bg-white border border-surface-border'
            }`}
            style={{ minHeight: 44 }}
          >
            <Ionicons
              name="chevron-back"
              size={16}
              color={idx === 0 ? '#9CA3AF' : '#185FA5'}
            />
            <Text
              className={`text-sm font-title ml-1 ${
                idx === 0 ? 'text-ink-light' : 'text-primary'
              }`}
            >
              Ant.
            </Text>
          </Pressable>
          <Pressable
            onPress={proximo}
            disabled={idx === total - 1}
            className={`flex-row items-center px-4 py-2 rounded-full ${
              idx === total - 1
                ? 'bg-surface-muted'
                : 'bg-white border border-surface-border'
            }`}
            style={{ minHeight: 44 }}
          >
            <Text
              className={`text-sm font-title mr-1 ${
                idx === total - 1 ? 'text-ink-light' : 'text-primary'
              }`}
            >
              Próx.
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={idx === total - 1 ? '#9CA3AF' : '#185FA5'}
            />
          </Pressable>
        </View>

        {/* Confirmação inline de encerrar */}
        {confirmaEncerrar ? (
          <View className="mt-4 bg-white border border-surface-border rounded-2xl p-3">
            <Text className="text-ink text-sm mb-3">
              Deseja encerrar a sessão de estudo?
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setConfirmaEncerrar(false)}
                className="flex-1 bg-primary rounded-full py-3 items-center"
                style={{ minHeight: 44 }}
              >
                <Text className="text-white font-title text-sm">
                  Continuar estudando
                </Text>
              </Pressable>
              <Pressable
                onPress={encerrar}
                className="px-4 py-3 items-center justify-center"
                style={{ minHeight: 44 }}
              >
                <Text className="text-red-500 text-sm">Encerrar</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>

      {/* Botão discreto encerrar */}
      {!confirmaEncerrar ? (
        <View className="px-4 pb-3 items-end">
          <Pressable
            onPress={() => setConfirmaEncerrar(true)}
            hitSlop={6}
            className="px-3 py-1.5 rounded-full border border-surface-border"
          >
            <Text className="text-ink-light text-xs">Encerrar</Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
