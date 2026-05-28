import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const labels: Record<string, string> = {
  index: 'Início',
  trilhas: 'Trilhas',
  estudar: 'Estudar',
  conteudos: 'Conteúdos',
  perfil: 'Perfil',
};

const icones: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  trilhas: 'map-outline',
  estudar: 'flash-outline',
  conteudos: 'library-outline',
  perfil: 'person-outline',
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom || 8 }}
      className="bg-white border-t border-surface-border"
    >
      <View className="flex-row items-end justify-around pt-2 pb-1 h-16">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const isEstudar = route.name === 'estudar';
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isEstudar) {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                className="items-center"
                style={{ marginTop: -14, minWidth: 64 }}
                accessibilityRole="button"
                accessibilityLabel={labels.estudar}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: '#185FA5',
                    shadowColor: '#185FA5',
                    shadowOpacity: 0.35,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 6,
                  }}
                  className="items-center justify-center"
                >
                  <Ionicons name="flash" size={22} color="white" />
                </View>
                <Text className="text-primary text-xs font-title mt-1">
                  Estudar
                </Text>
              </Pressable>
            );
          }

          const color = focused ? '#185FA5' : '#6B7280';
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="items-center flex-1"
              accessibilityRole="button"
              accessibilityLabel={labels[route.name] ?? route.name}
            >
              <Ionicons name={icones[route.name]} size={22} color={color} />
              <Text
                style={{ color }}
                className="text-xs mt-1"
              >
                {labels[route.name] ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
