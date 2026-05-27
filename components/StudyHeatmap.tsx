import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { RegistroEstudo } from '../data/grade';

const SEMANAS = 26;
const DIAS = 7;
const CELL = 14;
const GAP = 3;

const COR_NIVEIS = ['#E5E7EB', '#B5D4F4', '#378ADD', '#185FA5'] as const;
const ROTULOS_DIA = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

type Props = {
  registros: RegistroEstudo[];
};

type Celula = {
  data: string;
  minutos: number;
  nivel: 0 | 1 | 2 | 3;
  disciplinas: string[];
};

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function StudyHeatmap({ registros }: Props) {
  const [sel, setSel] = useState<Celula | null>(null);

  const { colunas, mesesLabels } = useMemo(() => {
    const porData = new Map<string, { min: number; disciplinas: Set<string> }>();
    for (const r of registros) {
      const key = ymd(new Date(r.timestamp));
      const cur = porData.get(key) ?? { min: 0, disciplinas: new Set<string>() };
      cur.min += r.tempoSegundos / 60;
      cur.disciplinas.add(r.disciplinaNome);
      porData.set(key, cur);
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    // Começar pela segunda-feira da semana de "hoje - 26 semanas"
    const inicio = new Date(hoje);
    inicio.setDate(inicio.getDate() - (SEMANAS * 7 - 1));
    const diaSemana = (inicio.getDay() + 6) % 7; // 0=segunda
    inicio.setDate(inicio.getDate() - diaSemana);

    const colunas: Celula[][] = [];
    const mesesLabels: { col: number; label: string }[] = [];
    let ultMes = -1;
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    for (let w = 0; w < SEMANAS; w++) {
      const coluna: Celula[] = [];
      for (let d = 0; d < DIAS; d++) {
        const dia = new Date(inicio);
        dia.setDate(inicio.getDate() + w * 7 + d);
        const key = ymd(dia);
        const reg = porData.get(key);
        const minutos = reg?.min ?? 0;
        let nivel: 0 | 1 | 2 | 3 = 0;
        if (minutos > 0 && minutos <= 20) nivel = 1;
        else if (minutos > 20 && minutos <= 60) nivel = 2;
        else if (minutos > 60) nivel = 3;
        coluna.push({
          data: key,
          minutos: Math.round(minutos),
          nivel,
          disciplinas: reg ? [...reg.disciplinas] : [],
        });
        if (d === 0 && dia.getMonth() !== ultMes) {
          mesesLabels.push({ col: w, label: meses[dia.getMonth()] });
          ultMes = dia.getMonth();
        }
      }
      colunas.push(coluna);
    }
    return { colunas, mesesLabels };
  }, [registros]);

  return (
    <View className="rounded-2xl bg-white border border-surface-border p-4">
      <Text className="text-ink font-title mb-3">Atividade — últimos 6 meses</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Labels de meses */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 18,
              height: 14,
              marginBottom: 2,
            }}
          >
            {colunas.map((_, w) => {
              const m = mesesLabels.find((x) => x.col === w);
              return (
                <View
                  key={`m-${w}`}
                  style={{ width: CELL + GAP, height: 14 }}
                >
                  {m ? (
                    <Text className="text-[10px] text-ink-light">{m.label}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>

          <View style={{ flexDirection: 'row' }}>
            {/* Labels de dias */}
            <View style={{ width: 18, justifyContent: 'space-between' }}>
              {ROTULOS_DIA.map((l, i) => (
                <Text
                  key={`d-${i}`}
                  style={{ height: CELL + GAP }}
                  className="text-[9px] text-ink-light"
                >
                  {l}
                </Text>
              ))}
            </View>
            {/* Grid */}
            <View style={{ flexDirection: 'row' }}>
              {colunas.map((coluna, w) => (
                <View key={`c-${w}`}>
                  {coluna.map((cel) => (
                    <Pressable
                      key={cel.data}
                      onPress={() => setSel(cel)}
                      style={{
                        width: CELL,
                        height: CELL,
                        marginRight: GAP,
                        marginBottom: GAP,
                        borderRadius: 3,
                        backgroundColor: COR_NIVEIS[cel.nivel],
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Tooltip */}
      {sel ? (
        <View className="mt-3 rounded-xl bg-surface-muted p-3">
          <Text className="text-ink text-sm font-title">
            {new Date(sel.data).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            })}
          </Text>
          {sel.minutos > 0 ? (
            <>
              <Text className="text-ink-muted text-xs mt-0.5">
                {sel.minutos} min estudados
              </Text>
              {sel.disciplinas.length > 0 ? (
                <Text className="text-ink-muted text-xs mt-0.5">
                  {sel.disciplinas.join(' · ')}
                </Text>
              ) : null}
            </>
          ) : (
            <Text className="text-ink-light text-xs mt-0.5">Sem estudo</Text>
          )}
        </View>
      ) : null}

      {/* Legenda */}
      <View className="mt-3 flex-row items-center justify-end">
        <Text className="text-[10px] text-ink-light mr-2">menos</Text>
        {COR_NIVEIS.map((c, i) => (
          <View
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              marginHorizontal: 1,
              backgroundColor: c,
            }}
          />
        ))}
        <Text className="text-[10px] text-ink-light ml-2">mais</Text>
      </View>
    </View>
  );
}
