import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore, type ChatMensagem } from '../store/useAppStore';

type Props = {
  visivel: boolean;
  onFechar: () => void;
  conteudoId: string;
  disciplinaNome: string;
  conteudoTitulo: string;
};

const EMPTY: ChatMensagem[] = [];
const SHEET_HEIGHT = Math.round(Dimensions.get('window').height * 0.82);

function gerarRespostaMock(
  pergunta: string,
  disciplina: string,
  conteudo: string,
) {
  return (
    `Sou seu tutor de ${disciplina}, focado em "${conteudo}". ` +
    `Sua pergunta foi: "${pergunta}". Esta é uma resposta simulada — ` +
    `em breve a IA real entrará no ar e poderá explicar conceitos, ` +
    `dar exemplos e resolver passo a passo.`
  );
}

export default function ChatTutor({
  visivel,
  onFechar,
  conteudoId,
  disciplinaNome,
  conteudoTitulo,
}: Props) {
  const historico = useAppStore((s) => s.chatHistorico[conteudoId]) ?? EMPTY;
  const addChatMensagem = useAppStore((s) => s.addChatMensagem);
  const limparChatConteudo = useAppStore((s) => s.limparChatConteudo);
  const insets = useSafeAreaInsets();
  const padBottom = Math.max(12, insets.bottom);

  const [texto, setTexto] = useState('');
  const [pensando, setPensando] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!visivel) return;
    const t = setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: true }),
      60,
    );
    return () => clearTimeout(t);
  }, [visivel, historico.length, pensando]);

  const enviar = () => {
    const pergunta = texto.trim();
    if (!pergunta || pensando) return;
    addChatMensagem(conteudoId, { autor: 'aluno', texto: pergunta });
    setTexto('');
    setPensando(true);
    setTimeout(() => {
      addChatMensagem(conteudoId, {
        autor: 'tutor',
        texto: gerarRespostaMock(pergunta, disciplinaNome, conteudoTitulo),
      });
      setPensando(false);
    }, 700);
  };

  const confirmarLimpar = () => {
    if (historico.length === 0) return;
    Alert.alert(
      'Limpar conversa',
      'Deseja apagar toda a conversa com o tutor sobre este conteúdo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => limparChatConteudo(conteudoId),
        },
      ],
    );
  };

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
      statusBarTranslucent
    >
      <View
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}
      >
        <Pressable style={{ flex: 1 }} onPress={onFechar} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View
            className="bg-white"
            style={{
              height: SHEET_HEIGHT,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              overflow: 'hidden',
            }}
          >
            <View className="items-center pt-2">
              <View className="w-10 h-1 bg-surface-border rounded-full" />
            </View>

            <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-surface-border">
              <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-2">
                <Ionicons name="sparkles" size={16} color="#185FA5" />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-ink-muted text-[11px] uppercase tracking-wider">
                  Tutor IA · {disciplinaNome}
                </Text>
                <Text
                  className="text-ink text-base font-title mt-0.5"
                  numberOfLines={1}
                >
                  {conteudoTitulo}
                </Text>
              </View>
              <Pressable
                onPress={confirmarLimpar}
                hitSlop={8}
                className="p-1 mr-1"
                disabled={historico.length === 0}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={historico.length === 0 ? '#9CA3AF' : '#6B7280'}
                />
              </Pressable>
              <Pressable onPress={onFechar} hitSlop={8} className="p-1">
                <Ionicons name="close" size={22} color="#111827" />
              </Pressable>
            </View>

            <ScrollView
              ref={scrollRef}
              className="flex-1"
              contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
              keyboardShouldPersistTaps="handled"
            >
              {historico.length === 0 ? (
                <View className="items-center py-10">
                  <View className="w-14 h-14 rounded-full bg-primary-50 items-center justify-center mb-3">
                    <Ionicons name="sparkles" size={24} color="#185FA5" />
                  </View>
                  <Text className="text-ink font-title text-base text-center px-6">
                    Tire dúvidas sobre {conteudoTitulo}
                  </Text>
                  <Text className="text-ink-muted text-sm text-center px-8 mt-1">
                    Pergunte conceitos, peça exemplos ou explicações passo a
                    passo.
                  </Text>
                </View>
              ) : (
                historico.map((m) => (
                  <View
                    key={m.id}
                    className={`mb-3 ${
                      m.autor === 'aluno' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <View
                      className={`rounded-2xl px-3 py-2 ${
                        m.autor === 'aluno' ? 'bg-primary' : 'bg-surface-muted'
                      }`}
                      style={{ maxWidth: '85%' }}
                    >
                      <Text
                        className={`text-sm ${
                          m.autor === 'aluno' ? 'text-white' : 'text-ink'
                        }`}
                      >
                        {m.texto}
                      </Text>
                    </View>
                  </View>
                ))
              )}
              {pensando ? (
                <View className="items-start mb-3">
                  <View className="bg-surface-muted rounded-2xl px-3 py-2">
                    <Text className="text-ink-muted text-sm">digitando…</Text>
                  </View>
                </View>
              ) : null}
            </ScrollView>

            <View
              className="flex-row items-end gap-2 px-3 pt-2 border-t border-surface-border"
              style={{ paddingBottom: padBottom }}
            >
              <TextInput
                value={texto}
                onChangeText={setTexto}
                placeholder="Pergunte ao tutor…"
                placeholderTextColor="#9CA3AF"
                multiline
                className="flex-1 bg-surface-muted rounded-2xl px-3 py-2 text-ink text-sm"
                style={{ maxHeight: 100, minHeight: 40 }}
              />
              <Pressable
                onPress={enviar}
                disabled={!texto.trim() || pensando}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  !texto.trim() || pensando ? 'bg-surface-border' : 'bg-primary'
                }`}
              >
                <Ionicons name="arrow-up" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
