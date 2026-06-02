import '../global.css';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';

export default function RootLayout() {
  const matricula = useAppStore((s) => s.usuario.matricula);
  // O store persiste em AsyncStorage (hidratação assíncrona). Só decidimos a
  // rota depois de hidratar, senão um usuário já cadastrado veria a tela de
  // identificação por um instante.
  const [hidratado, setHidratado] = useState(useAppStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() => setHidratado(true));
    if (useAppStore.persist.hasHydrated()) setHidratado(true);
    return unsub;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {hidratado && (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!matricula}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="conteudo/[id]" options={{ presentation: 'card' }} />
              <Stack.Screen name="trilha/[id]" options={{ presentation: 'card' }} />
              <Stack.Screen name="trilha/nova" options={{ presentation: 'card' }} />
              <Stack.Screen name="estudar/sessao" options={{ presentation: 'card' }} />
              <Stack.Screen name="estudar/resumo" options={{ presentation: 'card' }} />
              <Stack.Screen name="perfil/gerenciar" options={{ presentation: 'card' }} />
            </Stack.Protected>
            <Stack.Protected guard={!matricula}>
              <Stack.Screen name="identificar" />
            </Stack.Protected>
          </Stack>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
