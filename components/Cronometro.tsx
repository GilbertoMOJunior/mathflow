import { useEffect, useRef, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { formatTempo } from '../lib/format';

type Props = {
  onTick?: (segundos: number) => void;
  rodando?: boolean;
};

export default function Cronometro({ onTick, rodando = true }: Props) {
  const [segundos, setSegundos] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!rodando) {
      if (ref.current) clearInterval(ref.current);
      ref.current = null;
      return;
    }
    ref.current = setInterval(() => {
      setSegundos((s) => {
        const next = s + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [rodando, onTick]);

  return (
    <View className="self-center rounded-full bg-surface-muted px-3 py-1">
      <Text
        className="text-ink-muted text-xs"
        style={{
          fontVariant: ['tabular-nums'],
          fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        }}
      >
        {formatTempo(segundos)}
      </Text>
    </View>
  );
}
