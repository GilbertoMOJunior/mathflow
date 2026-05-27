import { useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { FlashCard as TFlashCard } from '../data/grade';

type Props = {
  card: TFlashCard;
};

export default function FlashCard({ card }: Props) {
  const flip = useSharedValue(0);

  useEffect(() => {
    flip.value = 0;
  }, [card.id, flip]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(flip.value, [0, 1], [0, 180])}deg` },
    ],
    opacity: flip.value < 0.5 ? 1 : 0,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(flip.value, [0, 1], [180, 360])}deg` },
    ],
    opacity: flip.value >= 0.5 ? 1 : 0,
  }));

  const toggle = () => {
    flip.value = withTiming(flip.value < 0.5 ? 1 : 0, { duration: 380 });
  };

  return (
    <Pressable onPress={toggle} className="w-full">
      <View className="h-80 w-full">
        <Animated.View
          style={[frontStyle, { backfaceVisibility: 'hidden' }]}
          className="absolute inset-0 rounded-2xl border border-surface-border bg-white p-6 justify-center"
        >
          <Text className="absolute left-4 top-3 text-[10px] uppercase tracking-wider text-ink-light">
            frente
          </Text>
          <CardConteudo tipo={card.tipo} valor={card.frente} />
        </Animated.View>
        <Animated.View
          style={[backStyle, { backfaceVisibility: 'hidden' }]}
          className="absolute inset-0 rounded-2xl border border-primary-100 bg-primary-50 p-6 justify-center"
        >
          <Text className="absolute left-4 top-3 text-[10px] uppercase tracking-wider text-primary">
            verso
          </Text>
          <CardConteudo tipo={card.tipo} valor={card.verso} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

function CardConteudo({
  tipo,
  valor,
}: {
  tipo: TFlashCard['tipo'];
  valor: string;
}) {
  if (tipo === 'imagem') {
    return (
      <View className="items-center justify-center">
        <Image
          source={{ uri: valor }}
          style={{ width: 240, height: 160, borderRadius: 8 }}
          resizeMode="contain"
        />
      </View>
    );
  }
  return (
    <Text className="text-center text-lg leading-7 text-ink">{valor}</Text>
  );
}
