import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '../store/useAppStore';
import { registrarAluno } from '../lib/sync';

const FASES = [1, 2, 3, 4, 5, 6, 7, 8];

export default function IdentificarScreen() {
  const setUsuario = useAppStore((s) => s.setUsuario);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [fase, setFase] = useState(1);
  const [salvando, setSalvando] = useState(false);

  const valido = nome.trim().length >= 2 && matricula.trim().length >= 2;

  const continuar = async () => {
    if (!valido || salvando) return;
    setSalvando(true);
    const mat = matricula.trim();
    const nomeLimpo = nome.trim();
    // Persiste localmente e cadastra no Supabase (best-effort).
    setUsuario({ id: mat, nome: nomeLimpo, matricula: mat, fase });
    await registrarAluno(mat, nomeLimpo, fase);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-muted" edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-5">
        <View className="flex-1 justify-center py-10">
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center">
              <Text className="text-white text-2xl font-title">M</Text>
            </View>
            <Text className="text-ink text-2xl font-title mt-4">Bem-vindo ao MathFlow</Text>
            <Text className="text-ink-muted text-sm mt-1 text-center">
              Identifique-se para acompanharmos seu progresso.
            </Text>
          </View>

          <View className="gap-4">
            <View>
              <Text className="text-ink-muted text-xs mb-1.5">Nome completo</Text>
              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Seu nome"
                placeholderTextColor="#9CA3AF"
                className="bg-white border border-surface-border rounded-xl px-4 py-3 text-ink"
              />
            </View>

            <View>
              <Text className="text-ink-muted text-xs mb-1.5">Matrícula</Text>
              <TextInput
                value={matricula}
                onChangeText={setMatricula}
                placeholder="Ex.: 2026123456"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
                className="bg-white border border-surface-border rounded-xl px-4 py-3 text-ink"
              />
            </View>

            <View>
              <Text className="text-ink-muted text-xs mb-1.5">Fase atual</Text>
              <View className="flex-row flex-wrap gap-2">
                {FASES.map((f) => {
                  const ativo = f === fase;
                  return (
                    <Pressable
                      key={f}
                      onPress={() => setFase(f)}
                      className={`w-11 h-11 rounded-xl items-center justify-center border ${
                        ativo ? 'bg-primary border-primary' : 'bg-white border-surface-border'
                      }`}
                    >
                      <Text className={ativo ? 'text-white font-title' : 'text-ink'}>{f}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          <Pressable
            onPress={continuar}
            disabled={!valido || salvando}
            className={`mt-8 rounded-full py-4 items-center ${valido && !salvando ? 'bg-primary' : 'bg-primary/40'}`}
            style={{ minHeight: 44 }}
          >
            <Text className="text-white font-title">{salvando ? 'Salvando…' : 'Começar'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
