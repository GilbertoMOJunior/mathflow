import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { grade } from '../../data/grade';
import { formatDuracao, formatRelativo } from '../../lib/format';
import { classificarConteudos } from '../../lib/progresso';
import { useAppStore } from '../../store/useAppStore';

export default function InicioScreen() {
  const registros = useAppStore((s) => s.registros);
  const favoritos = useAppStore((s) => s.favoritos);
  const usuario = useAppStore((s) => s.usuario);

  const { minutosSemana, ultimaIso } = useMemo(() => {
    const inicioSemana = new Date();
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(inicioSemana.getDate() - 6);
    const minutos = registros
      .filter((r) => new Date(r.timestamp) >= inicioSemana)
      .reduce((acc, r) => acc + r.tempoSegundos, 0);
    return { minutosSemana: minutos, ultimaIso: registros[0]?.timestamp ?? null };
  }, [registros]);

  const contagens = useMemo(() => {
    const statusMap = new Map<string, 'concluido' | 'em-andamento' | 'nao-iniciado'>();
    for (const x of classificarConteudos(registros, [])) {
      statusMap.set(x.conteudo.id, x.status);
    }

    const disciplinaPorConteudo = new Map<string, string>();
    for (const d of grade) {
      for (const c of d.conteudos) disciplinaPorConteudo.set(c.id, d.id);
    }

    const disciplinasIniciadas = new Set<string>();
    for (const r of registros) {
      const did = disciplinaPorConteudo.get(r.conteudoId);
      if (did) disciplinasIniciadas.add(did);
    }

    let concluido = 0;
    let andamento = 0;
    for (const d of grade) {
      for (const c of d.conteudos) {
        const status = statusMap.get(c.id) ?? 'nao-iniciado';
        if (status === 'concluido') concluido++;
        else if (disciplinasIniciadas.has(d.id)) andamento++;
      }
    }

    let nao = 0;
    for (const fid of favoritos) {
      if ((statusMap.get(fid) ?? 'nao-iniciado') !== 'nao-iniciado') continue;
      const did = disciplinaPorConteudo.get(fid);
      if (!did || disciplinasIniciadas.has(did)) continue;
      nao++;
    }

    return { concluido, andamento, nao, total: concluido + andamento + nao };
  }, [registros, favoritos]);

  const continueTrilha = useMemo(() => {
    if (registros.length === 0) return null;
    const statusMap = new Map<string, 'concluido' | 'em-andamento' | 'nao-iniciado'>();
    for (const x of classificarConteudos(registros, [])) {
      statusMap.set(x.conteudo.id, x.status);
    }
    const vistos = new Set<string>();
    for (const r of registros) {
      if (vistos.has(r.conteudoId)) continue;
      vistos.add(r.conteudoId);
      for (const d of grade) {
        if (!d.conteudos.some((c) => c.id === r.conteudoId)) continue;
        const proxima = d.conteudos.find(
          (c) => statusMap.get(c.id) !== 'concluido',
        );
        if (!proxima) break;
        const concluidos = d.conteudos.filter(
          (c) => statusMap.get(c.id) === 'concluido',
        ).length;
        return {
          trilhaId: `t-disc-${d.id}`,
          disciplinaNome: d.nome,
          fase: d.fase,
          totalConteudos: d.conteudos.length,
          concluidos,
          proximoTitulo: proxima.titulo,
          proximoConteudoId: proxima.id,
        };
      }
    }
    return null;
  }, [registros]);

  const favoritosResolvidos = useMemo(() => {
    if (favoritos.length === 0) return [];
    const fav = new Set(favoritos);
    const itens: { disciplina: typeof grade[number]; conteudo: typeof grade[number]['conteudos'][number] }[] = [];
    for (const d of grade) {
      for (const c of d.conteudos) {
        if (fav.has(c.id)) itens.push({ disciplina: d, conteudo: c });
      }
    }
    return itens;
  }, [favoritos]);

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-4 pb-2">
          <Text className="text-ink text-2xl font-title">
            Olá, {usuario.nome.split(' ')[0]}
          </Text>
          <Text className="text-ink-muted text-sm mt-0.5">
            Continue evoluindo na fase {usuario.fase}
          </Text>
        </View>

        <View className="px-4 flex-row gap-3">
          <CardResumo
            emoji="🔥"
            label="esta semana"
            valor={minutosSemana > 0 ? formatDuracao(minutosSemana) : '—'}
          />
          <CardResumo
            emoji="⚡"
            label="última sessão"
            valor={ultimaIso ? formatRelativo(ultimaIso) : 'nenhuma'}
          />
        </View>

        <SecaoLabel titulo="Progresso" />
        <View className="px-4">
          <Progresso contagens={contagens} />
        </View>

        {continueTrilha ? (
          <>
            <SecaoLabel titulo="Continue de onde parou" />
            <View className="px-4">
              <ContinueCard dados={continueTrilha} />
            </View>
          </>
        ) : null}

        {favoritosResolvidos.length > 0 ? (
          <>
            <SecaoLabel
              titulo="Favoritos"
              acao={{
                texto: 'Ver todos',
                onPress: () => router.push('/conteudos'),
              }}
            />
            <View className="px-4 gap-2">
              {favoritosResolvidos.slice(0, 5).map((f) => (
                <FavoritoCard
                  key={f.conteudo.id}
                  disciplinaNome={f.disciplina.nome}
                  fase={f.disciplina.fase}
                  titulo={f.conteudo.titulo}
                  cards={f.conteudo.flashcards.length}
                  onPress={() =>
                    router.push({
                      pathname: '/conteudo/[id]',
                      params: { id: f.conteudo.id },
                    })
                  }
                />
              ))}
            </View>
          </>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

function CardResumo({
  emoji,
  label,
  valor,
}: {
  emoji: string;
  label: string;
  valor: string;
}) {
  return (
    <View className="flex-1 bg-white border border-surface-border rounded-2xl p-3">
      <View className="flex-row items-center">
        <Text style={{ fontSize: 14 }}>{emoji}</Text>
        <Text className="text-ink-muted text-xs ml-1">{label}</Text>
      </View>
      <Text className="text-ink text-xl font-title mt-1">{valor}</Text>
    </View>
  );
}

function SecaoLabel({
  titulo,
  acao,
}: {
  titulo: string;
  acao?: { texto: string; onPress: () => void };
}) {
  return (
    <View className="px-4 mt-5 mb-2 flex-row items-center justify-between">
      <Text className="text-ink-muted text-xs uppercase tracking-wider">
        {titulo}
      </Text>
      {acao ? (
        <Pressable onPress={acao.onPress} hitSlop={8}>
          <Text className="text-primary text-xs font-title">{acao.texto}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function Progresso({
  contagens,
}: {
  contagens: { concluido: number; andamento: number; nao: number; total: number };
}) {
  const total = Math.max(1, contagens.total);
  const pctC = (contagens.concluido / total) * 100;
  const pctA = (contagens.andamento / total) * 100;
  const pctN = 100 - pctC - pctA;

  return (
    <View className="bg-white border border-surface-border rounded-2xl p-4">
      <View className="flex-row justify-between mb-3">
        <ContagemItem
          cor="#185FA5"
          rotulo="Concluídos"
          valor={contagens.concluido}
        />
        <ContagemItem
          cor="#378ADD"
          rotulo="Em andamento"
          valor={contagens.andamento}
        />
        <ContagemItem
          cor="#E5E7EB"
          rotulo="Não iniciados"
          valor={contagens.nao}
        />
      </View>
      <View className="h-2 flex-row rounded-full overflow-hidden bg-surface-muted">
        {pctC > 0 ? (
          <View style={{ width: `${pctC}%`, backgroundColor: '#185FA5' }} />
        ) : null}
        {pctA > 0 ? (
          <View style={{ width: `${pctA}%`, backgroundColor: '#378ADD' }} />
        ) : null}
        {pctN > 0 ? (
          <View style={{ width: `${pctN}%`, backgroundColor: '#E5E7EB' }} />
        ) : null}
      </View>
      <Text className="text-ink-light text-[10px] mt-2">
        {contagens.total} conteúdos no foco atual
      </Text>
    </View>
  );
}

function ContagemItem({
  cor,
  rotulo,
  valor,
}: {
  cor: string;
  rotulo: string;
  valor: number;
}) {
  return (
    <View className="flex-1">
      <View className="flex-row items-center">
        <View
          style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: cor }}
        />
        <Text className="text-ink-muted text-[10px] ml-1.5">{rotulo}</Text>
      </View>
      <Text className="text-ink text-xl font-title mt-0.5">{valor}</Text>
    </View>
  );
}

type ContinueDados = {
  trilhaId: string;
  disciplinaNome: string;
  fase: number;
  totalConteudos: number;
  concluidos: number;
  proximoTitulo: string;
  proximoConteudoId: string;
};

function ContinueCard({ dados }: { dados: ContinueDados }) {
  const pct = Math.round(
    (dados.concluidos / Math.max(1, dados.totalConteudos)) * 100,
  );
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/estudar/sessao',
          params: { conteudoId: dados.proximoConteudoId },
        })
      }
      className="rounded-2xl p-4"
      style={{ backgroundColor: '#185FA5' }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[11px] uppercase tracking-wider flex-1"
          style={{ color: 'rgba(255,255,255,0.85)' }}
          numberOfLines={1}
        >
          {dados.disciplinaNome} · Fase {dados.fase}
        </Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/trilha/[id]',
              params: { id: dados.trilhaId },
            })
          }
          hitSlop={8}
        >
          <Text
            className="text-[11px] font-title"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Ver trilha
          </Text>
        </Pressable>
      </View>
      <Text
        className="text-white text-lg font-title mt-1.5"
        numberOfLines={2}
      >
        {dados.proximoTitulo}
      </Text>
      <View
        className="mt-3 rounded-full overflow-hidden"
        style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.22)' }}
      >
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: '#fff',
          }}
        />
      </View>
      <View className="flex-row items-center justify-between mt-2.5">
        <Text
          className="text-[11px]"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {dados.concluidos}/{dados.totalConteudos} concluídos · {pct}%
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="flash" size={14} color="#fff" />
          <Text className="text-white text-xs font-title ml-1">Continuar</Text>
        </View>
      </View>
    </Pressable>
  );
}

function FavoritoCard({
  disciplinaNome,
  fase,
  titulo,
  cards,
  onPress,
}: {
  disciplinaNome: string;
  fase: number;
  titulo: string;
  cards: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white border border-surface-border rounded-2xl p-3 flex-row items-center"
    >
      <View
        style={{ backgroundColor: '#EDF4FC' }}
        className="w-9 h-9 rounded-full items-center justify-center mr-3"
      >
        <Ionicons name="star" size={16} color="#185FA5" />
      </View>
      <View className="flex-1">
        <Text className="text-ink-muted text-[11px]" numberOfLines={1}>
          {disciplinaNome} · Fase {fase}
        </Text>
        <Text className="text-ink text-sm font-title mt-0.5" numberOfLines={1}>
          {titulo}
        </Text>
        <Text className="text-ink-light text-[10px] mt-0.5">{cards} cards</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </Pressable>
  );
}

