# MathFlow — Como rodar localmente

App mobile de flashcards (Anki-style) para o curso de Matemática da Uniplac.
Stack: Expo SDK 54 + React Native 0.81 + TypeScript + NativeWind.

Este guia assume **ambiente zerado** (sem Node, sem Git, sem nada instalado).

---

## 1. Instalar os pré-requisitos

Você precisa de **três coisas** na sua máquina:

### 1.1. Git
Para clonar o repositório.

- **Windows:** baixe e instale em https://git-scm.com/download/win (pode dar *Next* em tudo).
- **macOS:** abra o Terminal e rode `xcode-select --install` (ou instale via https://git-scm.com/download/mac).
- **Linux (Ubuntu/Debian):** `sudo apt update && sudo apt install git`.

Verifique:
```bash
git --version
```

### 1.2. Node.js (versão 20 LTS)
A forma recomendada é via **nvm** (gerenciador de versões), porque o projeto pode pedir versões específicas no futuro.

- **Windows:** instale o **nvm-windows** em https://github.com/coreybutler/nvm-windows/releases (baixe `nvm-setup.exe`).
- **macOS / Linux:** instale o **nvm** em https://github.com/nvm-sh/nvm (rode o comando de install do README deles).

Depois, em qualquer sistema:
```bash
nvm install 20
nvm use 20
```

Verifique:
```bash
node --version    # deve mostrar v20.x.x
npm --version     # deve mostrar 10.x.x
```

> Se preferir, dá pra instalar o Node direto do site https://nodejs.org (escolha a versão **LTS 20**). Mas via nvm é mais flexível.

### 1.3. App Expo Go no celular
É o app que vai rodar o projeto sem precisar compilar nada.

- **Android:** Play Store → procure **Expo Go** → instale.
- **iOS:** App Store → procure **Expo Go** → instale.

> O celular precisa estar na **mesma rede Wi-Fi** do computador.

---

## 2. Clonar o projeto

Abra o terminal numa pasta onde você queira guardar o código (ex: `Documentos`):

```bash
git clone https://github.com/GilbertoMOJunior/mathflow.git
cd mathflow
```

---

## 3. Instalar as dependências

Dentro da pasta do projeto:

```bash
npm install
```

Pode demorar alguns minutos na primeira vez (vai baixar ~1GB de pacotes em `node_modules/`). É normal.

---

## 4. Rodar o projeto

```bash
npx expo start -c
```

> O `-c` limpa o cache do Metro. Útil sempre que você troca de máquina, atualiza dependências ou mexe em `babel.config.js`.

Vai abrir uma tela no terminal com um **QR Code** e algumas opções.

### No celular
- **Android:** abra o **Expo Go** → toque em **Scan QR Code** → aponte pro QR do terminal.
- **iOS:** abra a **câmera nativa** do iPhone → aponte pro QR → toque na notificação que aparece.

O app vai carregar (primeira vez demora ~30s a 1min). Depois disso, qualquer mudança no código recarrega na hora.

---

## 5. Comandos úteis do dia a dia

```bash
npx expo start -c       # inicia o servidor (com cache limpo)
npx tsc --noEmit        # checa erros de TypeScript sem gerar arquivos
npm install <pacote>    # instala uma dependência nova
```

Atalhos dentro do terminal do Expo (depois que o servidor está rodando):
- `r` → recarrega o app
- `j` → abre o debugger
- `?` → mostra todos os atalhos
- `Ctrl+C` → encerra o servidor

---

## 6. Problemas comuns

**"Metro bundler não conecta no celular"**
Computador e celular precisam estar na **mesma rede Wi-Fi**. Se estiver em rede corporativa/universidade que bloqueia, use o hotspot do celular ou rode com `npx expo start --tunnel` (mais lento, mas funciona em qualquer rede).

**"Unable to resolve module ..."**
Pare o servidor (`Ctrl+C`) e rode `npx expo start -c` de novo (com cache limpo).

**"Erro no `npm install`"**
Apague `node_modules/` e `package-lock.json`, depois `npm install` de novo:
```bash
rm -rf node_modules package-lock.json
npm install
```
(No Windows PowerShell: `Remove-Item -Recurse -Force node_modules, package-lock.json`)

**"Expo Go diz que a versão do SDK não bate"**
Atualize o app **Expo Go** na loja. Este projeto usa **SDK 54**.

---

## 7. Estrutura rápida (pra saber onde mexer)

```
app/                  # telas (Expo Router, file-based)
  (tabs)/             # abas: Início, Trilhas, Estudar, Conteúdos, Perfil
  conteudo/[id].tsx   # detalhes de um conteúdo
  trilha/[id].tsx     # detalhes de uma trilha
  estudar/sessao.tsx  # sessão de flashcards
components/           # componentes reutilizáveis (FlashCard, TabBar, etc)
data/grade.ts         # grade curricular oficial do curso (8 fases)
store/useAppStore.ts  # estado global (Zustand + AsyncStorage)
lib/                  # utilitários (formatação, lógica de progresso)
```

Mais detalhes em `CLAUDE.md` (convenções, padrões, decisões de design).
