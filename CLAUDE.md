# MathFlow

App mobile de flashcards para alunos do curso de Matemática da Uniplac (Universidade do Planalto Catarinense, Lages/SC). Metodologia: estudo espaçado no estilo Anki.

## Stack

- **Expo SDK 54** + Expo Router (file-based routing)
- **React Native 0.81** + React 19
- **TypeScript** estrito
- **NativeWind v4** para estilos (Tailwind no RN)
- **Zustand** + middleware `persist` em AsyncStorage para estado global
- **React Native Reanimated 4** + worklets (flip 3D do card)

## Comandos

```bash
npm install
npx expo start -c      # -c limpa cache do Metro (necessário após mudar babel.config.js ou nativewind)
npx tsc --noEmit       # typecheck
npx expo export --platform android   # valida bundle sem rodar dispositivo
```

`gh` CLI fica em `C:\Program Files\GitHub CLI\gh.exe` (não está no PATH padrão do PowerShell). Node vem do nvm em `C:\Users\Gilberto\AppData\Roaming\npm\node_modules\node\bin\`.

## Estrutura

```
app/
  _layout.tsx              # raiz: Stack + SafeAreaProvider + GestureHandlerRoot
  (tabs)/
    _layout.tsx            # tabs (ordem: Início, Trilhas, Estudar, Conteúdos, Perfil)
    index.tsx              # Início: resumo + Progresso + Favoritos + Próximos
    trilhas.tsx            # tab: trilhas por semestre + custom + criar nova
    estudar.tsx            # seleção de conteúdo com filtro por fase
    conteudos.tsx          # tab: navega disciplinas/conteúdos, favorita inline
    perfil.tsx             # perfil + heatmap + matérias
  conteudo/
    [id].tsx               # detalhes do conteúdo: status, stats, favoritar, iniciar sessão
  trilha/
    [id].tsx               # detalhes da trilha: progresso, conteúdos, próximo conteúdo
    nova.tsx               # criar trilha custom: nome + multi-select de conteúdos
  estudar/
    sessao.tsx             # flashcards com cronômetro pílula e encerrar inline
    resumo.tsx             # salva RegistroEstudo no store
  perfil/
    gerenciar.tsx          # toggle de interesses agrupado por fase
components/
  TabBar.tsx               # tab bar custom, botão Estudar elevado (44x44, primary)
  FlashCard.tsx            # flip 3D Reanimated, suporta texto e imagem
  Cronometro.tsx           # pílula MM:SS, auto-start, tabular-nums
  StudyHeatmap.tsx         # grid 26 semanas x 7 dias, 4 níveis SRS-like
data/
  grade.ts                 # grade completa 8 fases (Disciplina > Conteudo > FlashCard)
store/
  useAppStore.ts           # Zustand: usuario, interesses, favoritos, trilhas, registros
lib/
  format.ts                # formatTempo, formatDuracao, formatRelativo, iniciais, corPorId
  progresso.ts             # classificarConteudos + gerarSugestoes (SRS)
```

## Convenções importantes

### Status de conteúdo (lib/progresso.ts)
- **não-iniciado**: zero registros
- **em-andamento**: tem registro, mas nenhuma sessão viu todos os cards
- **concluído**: ao menos UMA sessão viu todos os cards
- Usa `Math.max(flashcardsRevisados)` entre sessões, **não soma** — sessões parciais repetidas não promovem para concluído.

### Sugestões (Anki-style)
Intervalos SRS: `[1, 3, 7, 14, 30]` dias por número de sessões.
- `revisar` (concluído + intervalo vencido): mostra "Visto há Xd"
- `continuar` (em-andamento): mostra "Visto há Xd"
- `comecar` (não-iniciado): mostra "Nunca estudado"

Ordenação por prioridade (revisão atrasada > andamento antigo > novo).

### Cores (tailwind.config.js)
- `primary` `#185FA5` (azul Uniplac) + tons `50` `100` `400` `500` `700`
- `surface` muted `#F4F5F7`, border `#E5E7EB`
- `ink` `#111827`, `ink-muted` `#6B7280`, `ink-light` `#9CA3AF`
- Heatmap: 4 níveis `#E5E7EB` → `#B5D4F4` → `#378ADD` → `#185FA5`

### Persistência (store/useAppStore.ts)
- Chave AsyncStorage: `mathflow-store`
- `partialize` salva `usuario`, `interesses`, `favoritos`, `registros` (não persiste estado derivado).
- `addRegistro` prepende — `registros` está sempre em ordem do mais novo ao mais antigo. Não chame `.sort()` redundante.
- `favoritos: string[]` armazena `conteudoId`s. `toggleFavorito(id)` alterna. Home renderiza a seção "Favoritos" só quando há itens.
- `trilhas: TrilhaCustom[]` armazena trilhas criadas pelo usuário (`{ id, nome, conteudoIds, criadaEm }`). Trilhas de semestre (`t-fase-N`) NÃO ficam no store — são derivadas de `grade` em runtime.

### Trilhas
- IDs: `t-disc-{disciplinaId}` (matéria, read-only, com filtro de fase na lista) e `tc-…` (custom). Trilhas por matéria são derivadas de `grade` em runtime, não vão para o store.
- `app/trilha/[id].tsx` resolve ambos via `resolverTrilha()`.
- "Estudar próximo" pula para a sessão do primeiro conteúdo não-concluído da trilha. Quando todos concluídos, o CTA some.
- Trilhas custom têm botão de remover no cabeçalho com confirmação via `Alert`.

### Navegação Conteúdos vs Estudar
- Tab **Conteúdos** (`(tabs)/conteudos.tsx`): exploração — clique no item abre `/conteudo/[id]` (detalhes), nunca inicia sessão direto. Estrela inline favorita sem navegar.
- Tela de **detalhes** (`conteudo/[id].tsx`): mostra status, sessões, tempo total, lista de cards e CTA "Iniciar sessão" no rodapé.
- Tab **Estudar** e cards de "Próximos conteúdos" da Home seguem indo direto para `/estudar/sessao` (fluxo Anki rápido).

### Interesses padrão
`['d-1-1', 'd-2-4', 'd-3-2']` (Fundamentos da Matemática, Introdução ao Cálculo, Cálculo I). Telas que filtram por interesses devem cair para "tudo" quando o array estiver vazio.

### Grade real (data/grade.ts)
Grade oficial do curso de Matemática da Uniplac (8 fases). Disciplinas e conteúdos batem com o currículo real — não invente disciplinas novas sem confirmar. Há disciplinas não-matemáticas (Profissão Docente, Libras, Cultura/Diferença/Cidadania, PPP I/II/III etc.) — flashcards delas devem refletir o conteúdo da área, não forçar matemática.

### UI
- Tab bar custom: ícone Estudar em quadrado azul 44x44 elevado `marginTop: -14`. Não usar a tab bar padrão.
- Cronômetro: pílula discreta no topo da Sessão, nunca componente dominante.
- Encerrar sessão: botão fino no canto inferior direito + confirmação inline (não modal).
- ScrollView vertical em telas de lista precisa de `style={{ flex: 1 }}` ou layout quebra com muitos itens; ScrollView horizontal precisa de altura fixa no pai.

## Patterns a evitar

- Não somar `flashcardsRevisados` entre sessões para decidir status.
- Não usar `font-mono` do Tailwind no RN — usar `fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'` em style.
- Não pinar `babel-preset-expo` errado: para SDK 54 é `~54.0.0` e o plugin de worklets é `react-native-worklets/plugin` (não mais `react-native-reanimated/plugin`).

## Repositório

GitHub: https://github.com/GilbertoMOJunior/mathflow (público, branch `main`)
