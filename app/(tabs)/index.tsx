import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegistroCard from '../../components/RegistroCard';
import { useAppStore } from '../../store/useAppStore';
import { formatDuracao, formatRelativo } from '../../lib/format';

export default function InicioScreen() {
  const registros = useAppStore((s) => s.registros);
  const feedColegas = useAppStore((s) => s.feedColegas);
  const usuario = useAppStore((s) => s.usuario);

  const { minutosSemana, ultimaIso } = useMemo(() => {
    const inicioSemana = new Date();
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(inicioSemana.getDate() - 6);
    const minutos = registros
      .filter((r) => new Date(r.timestamp) >= inicioSemana)
      .reduce((acc, r) => acc + r.tempoSegundos, 0);
    const ultimo = registros[0]?.timestamp ?? null;
    return { minutosSemana: minutos, ultimaIso: ultimo };
  }, [registros]);

  const meusOrdenados = useMemo(
    () =>
      [...registros].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [registros],
  );
  const colegasOrdenados = useMemo(
    () =>
      [...feedColegas].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [feedColegas],
  );

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-4 pb-2">
          <Text className="text-ink text-2xl font-title">Olá, {usuario.nome.split(' ')[0]}</Text>
          <Text className="text-ink-muted text-sm mt-0.5">
            Continue evoluindo na fase {usuario.fase}
          </Text>
        </View>

        <View className="px-4 flex-row gap-3">
          <CardResumo
            icone="time-outline"
            label="esta semana"
            valor={minutosSemana > 0 ? formatDuracao(minutosSemana) : '—'}
          />
          <CardResumo
            icone="hourglass-outline"
            label="última sessão"
            valor={ultimaIso ? formatRelativo(ultimaIso) : 'nenhuma'}
          />
        </View>

        <SecaoLabel titulo="Você" />
        <View className="px-4 gap-2">
          {meusOrdenados.length === 0 ? (
            <View className="bg-white border border-surface-border rounded-2xl p-4">
              <Text className="text-ink-muted text-sm">
                Você ainda não registrou sessões de estudo. Toque em Estudar para começar.
              </Text>
            </View>
          ) : (
            meusOrdenados.map((r) => (
              <RegistroCard key={r.id} registro={r} nomeAutor={usuario.nome} />
            ))
          )}
        </View>

        <View className="h-px bg-surface-border my-5 mx-4" />

        <SecaoLabel titulo="Colegas" />
        <View className="px-4 gap-2">
          {colegasOrdenados.map((r) => (
            <RegistroCard key={r.id} registro={r} mostrarAvatar />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CardResumo({
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
        <Ionicons name={icone} size={14} color="#6B7280" />
        <Text className="text-ink-muted text-xs ml-1">{label}</Text>
      </View>
      <Text className="text-ink text-xl font-title mt-1">{valor}</Text>
    </View>
  );
}

function SecaoLabel({ titulo }: { titulo: string }) {
  return (
    <View className="px-4 mt-5 mb-2">
      <Text className="text-ink-muted text-xs uppercase tracking-wider">
        {titulo}
      </Text>
    </View>
  );
}
