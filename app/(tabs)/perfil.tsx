import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegistroCard from '../../components/RegistroCard';
import StudyHeatmap from '../../components/StudyHeatmap';
import { grade } from '../../data/grade';
import { iniciais } from '../../lib/format';
import { useAppStore } from '../../store/useAppStore';

export default function PerfilScreen() {
  const usuario = useAppStore((s) => s.usuario);
  const setUsuario = useAppStore((s) => s.setUsuario);
  const interesses = useAppStore((s) => s.interesses);
  const toggleInteresse = useAppStore((s) => s.toggleInteresse);
  const registros = useAppStore((s) => s.registros);

  const [editandoNome, setEditandoNome] = useState(false);
  const [nomeRascunho, setNomeRascunho] = useState(usuario.nome);

  const disciplinasAtivas = useMemo(
    () => grade.filter((d) => interesses.includes(d.id)).slice(0, 3),
    [interesses],
  );

  const stats = useMemo(() => {
    const totalSeg = registros.reduce((acc, r) => acc + r.tempoSegundos, 0);
    const totalHoras = (totalSeg / 3600).toFixed(1);
    const totalFlashcards = registros.reduce(
      (acc, r) => acc + r.flashcardsRevisados,
      0,
    );
    const diasUnicos = new Set(
      registros.map((r) => new Date(r.timestamp).toDateString()),
    );
    // calcula streak de dias consecutivos terminando hoje ou ontem
    const set = new Set([...diasUnicos]);
    let streak = 0;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() - i);
      if (set.has(dia.toDateString())) streak++;
      else if (i > 0) break;
    }
    return { totalHoras, totalFlashcards, streak };
  }, [registros]);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. CABEÇALHO */}
        <View className="px-4 pt-4">
          <View className="bg-white border border-surface-border rounded-2xl p-4 flex-row items-center">
            <View className="w-14 h-14 rounded-full bg-primary items-center justify-center mr-3">
              <Text className="text-white text-lg font-title">
                {iniciais(usuario.nome)}
              </Text>
            </View>
            <View className="flex-1">
              {editandoNome ? (
                <TextInput
                  value={nomeRascunho}
                  onChangeText={setNomeRascunho}
                  onBlur={() => {
                    setUsuario({ nome: nomeRascunho.trim() || usuario.nome });
                    setEditandoNome(false);
                  }}
                  autoFocus
                  className="text-ink text-lg font-title border-b border-primary pb-0.5"
                />
              ) : (
                <Pressable
                  onPress={() => {
                    setNomeRascunho(usuario.nome);
                    setEditandoNome(true);
                  }}
                >
                  <Text className="text-ink text-lg font-title">
                    {usuario.nome}
                  </Text>
                </Pressable>
              )}
              <Text className="text-ink-muted text-xs mt-0.5">
                Matemática · Fase {usuario.fase} · Uniplac
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setNomeRascunho(usuario.nome);
                setEditandoNome(true);
              }}
              hitSlop={8}
            >
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </Pressable>
          </View>
        </View>

        {/* 2. ESTATÍSTICAS */}
        <View className="px-4 pt-3 flex-row gap-3">
          <CardStat label="Horas estudadas" valor={stats.totalHoras} />
          <CardStat label="Dias seguidos" valor={String(stats.streak)} />
          <CardStat
            label="Flashcards"
            valor={String(stats.totalFlashcards)}
          />
        </View>

        {/* 3. HEATMAP */}
        <View className="px-4 pt-3">
          <StudyHeatmap registros={registros} />
        </View>

        {/* 4. HISTÓRICO (Você) */}
        <View className="px-4 pt-5">
          <Text className="text-ink-muted text-xs uppercase tracking-wider mb-2">
            Você
          </Text>
          {registros.length === 0 ? (
            <View className="bg-white border border-surface-border rounded-2xl p-4">
              <Text className="text-ink-muted text-sm">
                Suas sessões aparecerão aqui.
              </Text>
            </View>
          ) : (
            <View className="gap-2">
              {registros.slice(0, 10).map((r) => (
                <RegistroCard key={r.id} registro={r} nomeAutor={usuario.nome} />
              ))}
            </View>
          )}
        </View>

        {/* 5. MATÉRIAS ATIVAS */}
        <View className="px-4 pt-5">
          <Text className="text-ink-muted text-xs uppercase tracking-wider mb-2">
            Matérias ativas
          </Text>
          {disciplinasAtivas.length === 0 ? (
            <View className="bg-white border border-surface-border rounded-2xl p-4">
              <Text className="text-ink-muted text-sm">
                Nenhuma matéria ativa. Toque em Gerenciar matérias para escolher.
              </Text>
            </View>
          ) : (
            <View className="gap-2">
              {disciplinasAtivas.map((d) => (
                <View
                  key={d.id}
                  className="bg-white border border-surface-border rounded-2xl p-3 flex-row items-center"
                >
                  <View className="flex-1">
                    <Text className="text-ink text-sm font-title">
                      {d.nome}
                    </Text>
                    <Text className="text-ink-muted text-xs mt-0.5">
                      Fase {d.fase} · {d.conteudos.length} conteúdos
                    </Text>
                  </View>
                  <Switch
                    value
                    onValueChange={() => toggleInteresse(d.id)}
                    trackColor={{ false: '#E5E7EB', true: '#185FA5' }}
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 6. GERENCIAR */}
        <View className="px-4 pt-3">
          <Pressable
            onPress={() => router.push('/perfil/gerenciar')}
            className="bg-white border border-surface-border rounded-2xl p-4 flex-row items-center"
          >
            <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-3">
              <Ionicons name="book-outline" size={18} color="#185FA5" />
            </View>
            <View className="flex-1">
              <Text className="text-ink text-sm font-title">
                Gerenciar matérias
              </Text>
              <Text className="text-ink-muted text-xs mt-0.5">
                Ver todas por semestre
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CardStat({ label, valor }: { label: string; valor: string }) {
  return (
    <View className="flex-1 bg-white border border-surface-border rounded-2xl p-3">
      <Text className="text-ink text-xl font-title">{valor}</Text>
      <Text className="text-ink-muted text-[11px] mt-0.5">{label}</Text>
    </View>
  );
}
