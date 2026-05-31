export type FlashCard = {
  id: string;
  tipo: 'texto' | 'imagem';
  frente: string;
  verso: string;
};

export type Conteudo = {
  id: string;
  titulo: string;
  flashcards: FlashCard[];
};

export type Disciplina = {
  id: string;
  nome: string;
  fase: number;
  conteudos: Conteudo[];
};

export type RegistroEstudo = {
  id: string;
  userId: string;
  disciplinaId: string;
  disciplinaNome: string;
  conteudoId: string;
  conteudoTitulo: string;
  fase: number;
  tempoSegundos: number;
  flashcardsRevisados: number;
  timestamp: string;
};

const img = (label: string) =>
  `https://placehold.co/300x200/EDF4FC/185FA5?text=${encodeURIComponent(label)}`;

export const grade: Disciplina[] = [
  // ━━━━━━━━━━━ FASE 1 ━━━━━━━━━━━
  {
    id: 'd-1-1',
    nome: 'Fundamentos da Matemática',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-1-1',
        titulo: 'Conjuntos numéricos',
        flashcards: [
          { id: 'f-1-1-1-1', tipo: 'texto', frente: 'Conjuntos numéricos básicos', verso: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ.' },
          { id: 'f-1-1-1-2', tipo: 'texto', frente: 'Número irracional', verso: 'Real que não pode ser escrito como razão p/q com p,q ∈ ℤ, q ≠ 0.' },
          { id: 'f-1-1-1-3', tipo: 'texto', frente: 'Lei de De Morgan', verso: '(A∪B)ᶜ = Aᶜ ∩ Bᶜ.' },
        ],
      },
      {
        id: 'c-1-1-2',
        titulo: 'Funções',
        flashcards: [
          { id: 'f-1-1-2-1', tipo: 'texto', frente: 'Função', verso: 'Relação que associa cada elemento do domínio a um único elemento do contradomínio.' },
          { id: 'f-1-1-2-2', tipo: 'texto', frente: 'Função injetora', verso: 'f(x₁)=f(x₂) ⇒ x₁=x₂.' },
          { id: 'f-1-1-2-3', tipo: 'imagem', frente: img('Função quadrática'), verso: 'f(x) = ax² + bx + c, parábola com vértice em x = −b/(2a).' },
        ],
      },
      {
        id: 'c-1-1-3',
        titulo: 'Equações e inequações',
        flashcards: [
          { id: 'f-1-1-3-1', tipo: 'texto', frente: 'Fórmula de Bhaskara', verso: 'x = (−b ± √(b² − 4ac)) / 2a.' },
          { id: 'f-1-1-3-2', tipo: 'texto', frente: 'Inequação modular |x| < a', verso: '−a < x < a, com a > 0.' },
        ],
      },
    ],
  },
  {
    id: 'd-1-2',
    nome: 'Geometria Plana',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-2-1',
        titulo: 'Triângulos',
        flashcards: [
          { id: 'f-1-2-1-1', tipo: 'texto', frente: 'Soma dos ângulos internos', verso: '180°.' },
          { id: 'f-1-2-1-2', tipo: 'texto', frente: 'Teorema de Pitágoras', verso: 'a² + b² = c² no triângulo retângulo.' },
          { id: 'f-1-2-1-3', tipo: 'texto', frente: 'Lei dos senos', verso: 'a/sen A = b/sen B = c/sen C = 2R.' },
        ],
      },
      {
        id: 'c-1-2-2',
        titulo: 'Quadriláteros e polígonos',
        flashcards: [
          { id: 'f-1-2-2-1', tipo: 'texto', frente: 'Soma dos ângulos internos de polígono de n lados', verso: '(n − 2) · 180°.' },
          { id: 'f-1-2-2-2', tipo: 'imagem', frente: img('Trapézio'), verso: 'Área = ((B + b) · h) / 2.' },
        ],
      },
      {
        id: 'c-1-2-3',
        titulo: 'Círculo e circunferência',
        flashcards: [
          { id: 'f-1-2-3-1', tipo: 'texto', frente: 'Comprimento da circunferência', verso: 'C = 2πr.' },
          { id: 'f-1-2-3-2', tipo: 'texto', frente: 'Área do círculo', verso: 'A = πr².' },
        ],
      },
    ],
  },
  {
    id: 'd-1-3',
    nome: 'Matemática Financeira',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-3-1',
        titulo: 'Juros simples',
        flashcards: [
          { id: 'f-1-3-1-1', tipo: 'texto', frente: 'Fórmula de juros simples', verso: 'J = C · i · t.' },
          { id: 'f-1-3-1-2', tipo: 'texto', frente: 'Montante (juros simples)', verso: 'M = C(1 + i · t).' },
        ],
      },
      {
        id: 'c-1-3-2',
        titulo: 'Juros compostos',
        flashcards: [
          { id: 'f-1-3-2-1', tipo: 'texto', frente: 'Montante (juros compostos)', verso: 'M = C(1 + i)ᵗ.' },
          { id: 'f-1-3-2-2', tipo: 'texto', frente: 'Taxa equivalente', verso: '(1 + iₐ) = (1 + iₘ)¹².' },
        ],
      },
      {
        id: 'c-1-3-3',
        titulo: 'Sistemas de amortização',
        flashcards: [
          { id: 'f-1-3-3-1', tipo: 'texto', frente: 'Sistema SAC', verso: 'Amortização constante, parcelas decrescentes.' },
          { id: 'f-1-3-3-2', tipo: 'texto', frente: 'Sistema Price', verso: 'Parcelas constantes; juros decrescentes, amortização crescente.' },
        ],
      },
    ],
  },
  {
    id: 'd-1-4',
    nome: 'Profissão Docente',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-4-1',
        titulo: 'Identidade docente',
        flashcards: [
          { id: 'f-1-4-1-1', tipo: 'texto', frente: 'Profissionalização docente', verso: 'Processo de construção de saberes, autonomia e responsabilidade ética da profissão.' },
          { id: 'f-1-4-1-2', tipo: 'texto', frente: 'Habitus professoral (Tardif)', verso: 'Saberes mobilizados pelo professor na prática cotidiana, derivados da experiência.' },
        ],
      },
      {
        id: 'c-1-4-2',
        titulo: 'Formação de professores',
        flashcards: [
          { id: 'f-1-4-2-1', tipo: 'texto', frente: 'Formação inicial vs continuada', verso: 'Inicial: licenciatura; Continuada: aprendizagem ao longo da carreira.' },
          { id: 'f-1-4-2-2', tipo: 'texto', frente: 'Estatuto do Magistério', verso: 'Conjunto de normas que regulam direitos, deveres e carreira do professor.' },
        ],
      },
    ],
  },
  {
    id: 'd-1-5',
    nome: 'Tecnologias da Informação e Comunicação',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-5-1',
        titulo: 'TICs na educação',
        flashcards: [
          { id: 'f-1-5-1-1', tipo: 'texto', frente: 'O que são TICs?', verso: 'Tecnologias da Informação e Comunicação — recursos digitais aplicados à comunicação e à aprendizagem.' },
          { id: 'f-1-5-1-2', tipo: 'texto', frente: 'Letramento digital', verso: 'Capacidade de usar criticamente tecnologias digitais para ler, escrever e produzir conhecimento.' },
        ],
      },
      {
        id: 'c-1-5-2',
        titulo: 'Ferramentas digitais para o ensino',
        flashcards: [
          { id: 'f-1-5-2-1', tipo: 'texto', frente: 'AVA', verso: 'Ambiente Virtual de Aprendizagem (ex.: Moodle, Google Classroom).' },
          { id: 'f-1-5-2-2', tipo: 'texto', frente: 'Recursos para Matemática', verso: 'GeoGebra, Desmos, planilhas eletrônicas.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 2 ━━━━━━━━━━━
  {
    id: 'd-2-1',
    nome: 'Cultura, Diferença e Cidadania',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-1-1',
        titulo: 'Diversidade cultural',
        flashcards: [
          { id: 'f-2-1-1-1', tipo: 'texto', frente: 'Cultura', verso: 'Conjunto de práticas, símbolos e valores compartilhados por um grupo social.' },
          { id: 'f-2-1-1-2', tipo: 'texto', frente: 'Etnocentrismo', verso: 'Tendência a julgar outras culturas a partir dos próprios padrões culturais.' },
        ],
      },
      {
        id: 'c-2-1-2',
        titulo: 'Cidadania e direitos',
        flashcards: [
          { id: 'f-2-1-2-1', tipo: 'texto', frente: 'Direitos fundamentais (CF/88)', verso: 'Vida, liberdade, igualdade, segurança e propriedade — art. 5º.' },
          { id: 'f-2-1-2-2', tipo: 'texto', frente: 'Cidadania ativa', verso: 'Participação consciente na esfera pública e nas decisões coletivas.' },
        ],
      },
    ],
  },
  {
    id: 'd-2-2',
    nome: 'Física I',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-2-1',
        titulo: 'Cinemática',
        flashcards: [
          { id: 'f-2-2-1-1', tipo: 'texto', frente: 'MRU', verso: 'S = S₀ + v·t.' },
          { id: 'f-2-2-1-2', tipo: 'texto', frente: 'MRUV — Torricelli', verso: 'v² = v₀² + 2a·ΔS.' },
        ],
      },
      {
        id: 'c-2-2-2',
        titulo: 'Dinâmica (leis de Newton)',
        flashcards: [
          { id: 'f-2-2-2-1', tipo: 'texto', frente: '2ª lei de Newton', verso: 'F = m · a.' },
          { id: 'f-2-2-2-2', tipo: 'texto', frente: '3ª lei de Newton', verso: 'Ação e reação: forças com mesmo módulo, direção e sentidos opostos, em corpos diferentes.' },
        ],
      },
      {
        id: 'c-2-2-3',
        titulo: 'Energia e trabalho',
        flashcards: [
          { id: 'f-2-2-3-1', tipo: 'texto', frente: 'Trabalho de força constante', verso: 'W = F · d · cos θ.' },
          { id: 'f-2-2-3-2', tipo: 'texto', frente: 'Energia cinética', verso: 'Eₖ = ½ m v².' },
        ],
      },
    ],
  },
  {
    id: 'd-2-3',
    nome: 'Geometria Espacial',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-3-1',
        titulo: 'Prismas e pirâmides',
        flashcards: [
          { id: 'f-2-3-1-1', tipo: 'texto', frente: 'Volume do prisma', verso: 'V = A_base · h.' },
          { id: 'f-2-3-1-2', tipo: 'texto', frente: 'Volume da pirâmide', verso: 'V = (1/3) · A_base · h.' },
        ],
      },
      {
        id: 'c-2-3-2',
        titulo: 'Cilindros, cones e esferas',
        flashcards: [
          { id: 'f-2-3-2-1', tipo: 'imagem', frente: img('Cilindro'), verso: 'V = π r² h.' },
          { id: 'f-2-3-2-2', tipo: 'texto', frente: 'Volume do cone', verso: 'V = (1/3) π r² h.' },
          { id: 'f-2-3-2-3', tipo: 'texto', frente: 'Volume da esfera', verso: 'V = (4/3) π r³.' },
        ],
      },
    ],
  },
  {
    id: 'd-2-4',
    nome: 'Introdução ao Cálculo',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-4-1',
        titulo: 'Limites',
        flashcards: [
          { id: 'f-2-4-1-1', tipo: 'texto', frente: 'Definição de limite', verso: 'lim x→a f(x) = L se para todo ε>0 existe δ>0 tal que 0<|x−a|<δ ⇒ |f(x)−L|<ε.' },
          { id: 'f-2-4-1-2', tipo: 'texto', frente: 'Limite fundamental trigonométrico', verso: 'lim x→0 sen(x)/x = 1.' },
        ],
      },
      {
        id: 'c-2-4-2',
        titulo: 'Continuidade',
        flashcards: [
          { id: 'f-2-4-2-1', tipo: 'texto', frente: 'Função contínua em a', verso: 'lim x→a f(x) = f(a).' },
          { id: 'f-2-4-2-2', tipo: 'texto', frente: 'Teorema do Valor Intermediário', verso: 'Se f é contínua em [a,b] e k está entre f(a) e f(b), existe c ∈ [a,b] com f(c)=k.' },
        ],
      },
      {
        id: 'c-2-4-3',
        titulo: 'Noção de derivada',
        flashcards: [
          { id: 'f-2-4-3-1', tipo: 'texto', frente: 'Definição de derivada', verso: "f'(a) = lim h→0 [f(a+h) − f(a)] / h." },
          { id: 'f-2-4-3-2', tipo: 'texto', frente: 'Interpretação geométrica', verso: 'Coeficiente angular da reta tangente ao gráfico em x = a.' },
        ],
      },
    ],
  },
  {
    id: 'd-2-5',
    nome: 'Políticas Públicas da Educação Básica',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-5-1',
        titulo: 'LDB e BNCC',
        flashcards: [
          { id: 'f-2-5-1-1', tipo: 'texto', frente: 'LDB', verso: 'Lei de Diretrizes e Bases da Educação Nacional (Lei nº 9.394/1996).' },
          { id: 'f-2-5-1-2', tipo: 'texto', frente: 'BNCC', verso: 'Base Nacional Comum Curricular — define aprendizagens essenciais para a Educação Básica.' },
        ],
      },
      {
        id: 'c-2-5-2',
        titulo: 'Planos de educação',
        flashcards: [
          { id: 'f-2-5-2-1', tipo: 'texto', frente: 'PNE', verso: 'Plano Nacional de Educação — define metas decenais para a educação brasileira.' },
          { id: 'f-2-5-2-2', tipo: 'texto', frente: 'FUNDEB', verso: 'Fundo de Manutenção e Desenvolvimento da Educação Básica.' },
        ],
      },
    ],
  },
  {
    id: 'd-2-6',
    nome: 'Práticas Extensionistas',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-6-1',
        titulo: 'Extensão universitária',
        flashcards: [
          { id: 'f-2-6-1-1', tipo: 'texto', frente: 'Extensão (tripé acadêmico)', verso: 'Processo interdisciplinar que integra ensino e pesquisa com demandas da sociedade.' },
          { id: 'f-2-6-1-2', tipo: 'texto', frente: 'Curricularização da extensão', verso: 'Inserção obrigatória de no mínimo 10% da carga horária do curso em atividades extensionistas.' },
        ],
      },
      {
        id: 'c-2-6-2',
        titulo: 'Projetos comunitários',
        flashcards: [
          { id: 'f-2-6-2-1', tipo: 'texto', frente: 'Diagnóstico participativo', verso: 'Levantamento de demandas reais junto à comunidade antes de propor a intervenção.' },
          { id: 'f-2-6-2-2', tipo: 'texto', frente: 'Avaliação de impacto', verso: 'Mede transformações geradas pela ação extensionista no público envolvido.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 3 ━━━━━━━━━━━
  {
    id: 'd-3-1',
    nome: 'Psicologia da Educação',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-1-1',
        titulo: 'Teorias da aprendizagem',
        flashcards: [
          { id: 'f-3-1-1-1', tipo: 'texto', frente: 'Behaviorismo (Skinner)', verso: 'Aprendizagem por condicionamento operante: reforço positivo/negativo e punição.' },
          { id: 'f-3-1-1-2', tipo: 'texto', frente: 'Construtivismo (Piaget)', verso: 'O sujeito constrói o conhecimento ativamente a partir da interação com o meio.' },
        ],
      },
      {
        id: 'c-3-1-2',
        titulo: 'Desenvolvimento cognitivo',
        flashcards: [
          { id: 'f-3-1-2-1', tipo: 'texto', frente: 'Estágios de Piaget', verso: 'Sensório-motor, pré-operatório, operatório concreto e operatório formal.' },
          { id: 'f-3-1-2-2', tipo: 'texto', frente: 'Zona de Desenvolvimento Proximal (Vygotsky)', verso: 'Distância entre o que o aluno faz sozinho e o que faz com auxílio.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-2',
    nome: 'Cálculo I',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-2-1',
        titulo: 'Derivadas',
        flashcards: [
          { id: 'f-3-2-1-1', tipo: 'texto', frente: 'Regra do produto', verso: "(fg)' = f'g + fg'." },
          { id: 'f-3-2-1-2', tipo: 'texto', frente: 'Regra da cadeia', verso: "(f∘g)'(x) = f'(g(x)) · g'(x)." },
          { id: 'f-3-2-1-3', tipo: 'texto', frente: 'Derivada de eˣ', verso: "d/dx eˣ = eˣ." },
        ],
      },
      {
        id: 'c-3-2-2',
        titulo: 'Aplicações da derivada',
        flashcards: [
          { id: 'f-3-2-2-1', tipo: 'texto', frente: 'Teste da primeira derivada', verso: "Se f' muda de + para −, x é máximo local; de − para +, mínimo local." },
          { id: 'f-3-2-2-2', tipo: 'imagem', frente: img('Concavidade'), verso: "f''>0 ⇒ côncava para cima; f''<0 ⇒ côncava para baixo." },
        ],
      },
      {
        id: 'c-3-2-3',
        titulo: 'Integrais indefinidas',
        flashcards: [
          { id: 'f-3-2-3-1', tipo: 'texto', frente: '∫ xⁿ dx, n ≠ −1', verso: 'xⁿ⁺¹/(n+1) + C.' },
          { id: 'f-3-2-3-2', tipo: 'texto', frente: '∫ 1/x dx', verso: 'ln|x| + C.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-3',
    nome: 'Currículos e Saberes',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-3-1',
        titulo: 'Teorias do currículo',
        flashcards: [
          { id: 'f-3-3-1-1', tipo: 'texto', frente: 'Teoria tradicional do currículo', verso: 'Foco em eficiência, conteúdos universais e neutralidade técnica.' },
          { id: 'f-3-3-1-2', tipo: 'texto', frente: 'Teoria crítica (Apple, Giroux)', verso: 'Currículo como espaço de relações de poder, ideologia e reprodução social.' },
        ],
      },
      {
        id: 'c-3-3-2',
        titulo: 'Saberes docentes',
        flashcards: [
          { id: 'f-3-3-2-1', tipo: 'texto', frente: 'Saberes docentes (Tardif)', verso: 'Disciplinares, curriculares, profissionais e experienciais.' },
          { id: 'f-3-3-2-2', tipo: 'texto', frente: 'Currículo oculto', verso: 'Aprendizagens não previstas no currículo formal, transmitidas pelas práticas escolares.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-4',
    nome: 'Física II',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-4-1',
        titulo: 'Termodinâmica',
        flashcards: [
          { id: 'f-3-4-1-1', tipo: 'texto', frente: '1ª lei da termodinâmica', verso: 'ΔU = Q − W.' },
          { id: 'f-3-4-1-2', tipo: 'texto', frente: 'Equação dos gases ideais', verso: 'P V = n R T.' },
        ],
      },
      {
        id: 'c-3-4-2',
        titulo: 'Ondas',
        flashcards: [
          { id: 'f-3-4-2-1', tipo: 'texto', frente: 'Equação fundamental da onda', verso: 'v = λ · f.' },
          { id: 'f-3-4-2-2', tipo: 'texto', frente: 'Efeito Doppler', verso: 'Mudança aparente na frequência por movimento relativo entre fonte e observador.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-5',
    nome: 'Geometria Analítica e Vetorial',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-5-1',
        titulo: 'Vetores no plano e no espaço',
        flashcards: [
          { id: 'f-3-5-1-1', tipo: 'texto', frente: 'Módulo de (a,b,c)', verso: '|v| = √(a² + b² + c²).' },
          { id: 'f-3-5-1-2', tipo: 'texto', frente: 'Produto escalar', verso: 'u · v = |u||v|cos θ = u₁v₁ + u₂v₂ + u₃v₃.' },
          { id: 'f-3-5-1-3', tipo: 'texto', frente: 'Produto vetorial', verso: 'u × v é perpendicular a u e v; |u × v| = |u||v|sen θ.' },
        ],
      },
      {
        id: 'c-3-5-2',
        titulo: 'Retas e planos',
        flashcards: [
          { id: 'f-3-5-2-1', tipo: 'texto', frente: 'Equação geral da reta no plano', verso: 'ax + by + c = 0.' },
          { id: 'f-3-5-2-2', tipo: 'texto', frente: 'Equação geral do plano', verso: 'ax + by + cz + d = 0; (a,b,c) é vetor normal.' },
        ],
      },
      {
        id: 'c-3-5-3',
        titulo: 'Cônicas',
        flashcards: [
          { id: 'f-3-5-3-1', tipo: 'imagem', frente: img('Elipse'), verso: 'x²/a² + y²/b² = 1.' },
          { id: 'f-3-5-3-2', tipo: 'texto', frente: 'Equação da parábola com foco em (0,p)', verso: 'x² = 4 p y.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-6',
    nome: 'Língua Portuguesa',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-6-1',
        titulo: 'Produção textual acadêmica',
        flashcards: [
          { id: 'f-3-6-1-1', tipo: 'texto', frente: 'Estrutura da dissertação', verso: 'Introdução, desenvolvimento e conclusão.' },
          { id: 'f-3-6-1-2', tipo: 'texto', frente: 'Resumo acadêmico', verso: 'Síntese objetiva do trabalho com tema, objetivos, método, resultados e conclusão.' },
        ],
      },
      {
        id: 'c-3-6-2',
        titulo: 'Coesão e coerência',
        flashcards: [
          { id: 'f-3-6-2-1', tipo: 'texto', frente: 'Coesão', verso: 'Conexão linguística entre partes do texto (conectivos, referência, substituição).' },
          { id: 'f-3-6-2-2', tipo: 'texto', frente: 'Coerência', verso: 'Articulação lógico-semântica que dá sentido global ao texto.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 4 ━━━━━━━━━━━
  {
    id: 'd-4-1',
    nome: 'Álgebra',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-1-1',
        titulo: 'Grupos',
        flashcards: [
          { id: 'f-4-1-1-1', tipo: 'texto', frente: 'Definição de grupo', verso: 'Conjunto com operação associativa, elemento neutro e inversos.' },
          { id: 'f-4-1-1-2', tipo: 'texto', frente: 'Teorema de Lagrange', verso: 'A ordem de um subgrupo divide a ordem do grupo finito.' },
        ],
      },
      {
        id: 'c-4-1-2',
        titulo: 'Anéis e corpos',
        flashcards: [
          { id: 'f-4-1-2-1', tipo: 'texto', frente: 'Anel', verso: 'Conjunto com duas operações: grupo abeliano na soma e associativa na multiplicação, com distributividade.' },
          { id: 'f-4-1-2-2', tipo: 'texto', frente: 'Corpo', verso: 'Anel comutativo com unidade no qual todo elemento não nulo possui inverso multiplicativo.' },
        ],
      },
    ],
  },
  {
    id: 'd-4-2',
    nome: 'Cálculo II',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-2-1',
        titulo: 'Integrais definidas',
        flashcards: [
          { id: 'f-4-2-1-1', tipo: 'texto', frente: 'Teorema Fundamental do Cálculo (parte 2)', verso: "∫ₐᵇ f(x) dx = F(b) − F(a), onde F'=f." },
          { id: 'f-4-2-1-2', tipo: 'texto', frente: 'Soma de Riemann', verso: 'Aproximação de ∫ₐᵇ f por Σ f(xᵢ*) Δx.' },
        ],
      },
      {
        id: 'c-4-2-2',
        titulo: 'Técnicas de integração',
        flashcards: [
          { id: 'f-4-2-2-1', tipo: 'texto', frente: 'Integração por partes', verso: '∫ u dv = uv − ∫ v du.' },
          { id: 'f-4-2-2-2', tipo: 'texto', frente: 'Substituição trigonométrica para √(a²−x²)', verso: 'x = a sen θ.' },
        ],
      },
      {
        id: 'c-4-2-3',
        titulo: 'Aplicações das integrais',
        flashcards: [
          { id: 'f-4-2-3-1', tipo: 'texto', frente: 'Área entre curvas', verso: 'A = ∫ₐᵇ [f(x) − g(x)] dx, com f ≥ g em [a,b].' },
          { id: 'f-4-2-3-2', tipo: 'texto', frente: 'Volume por discos', verso: 'V = π ∫ₐᵇ [f(x)]² dx.' },
        ],
      },
    ],
  },
  {
    id: 'd-4-3',
    nome: 'Educação e Necessidades Especiais',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-3-1',
        titulo: 'Inclusão escolar',
        flashcards: [
          { id: 'f-4-3-1-1', tipo: 'texto', frente: 'Educação inclusiva', verso: 'Garantia do direito de aprender de todos os estudantes em ambiente comum.' },
          { id: 'f-4-3-1-2', tipo: 'texto', frente: 'AEE', verso: 'Atendimento Educacional Especializado, complementar ao ensino regular.' },
        ],
      },
      {
        id: 'c-4-3-2',
        titulo: 'Deficiências e adaptações',
        flashcards: [
          { id: 'f-4-3-2-1', tipo: 'texto', frente: 'TEA', verso: 'Transtorno do Espectro Autista — exige rotina previsível e comunicação clara.' },
          { id: 'f-4-3-2-2', tipo: 'texto', frente: 'Adaptação curricular', verso: 'Modificações de objetivos, conteúdos ou avaliação para atender necessidades específicas.' },
        ],
      },
    ],
  },
  {
    id: 'd-4-4',
    nome: 'Estatística',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-4-1',
        titulo: 'Estatística descritiva',
        flashcards: [
          { id: 'f-4-4-1-1', tipo: 'texto', frente: 'Média aritmética', verso: 'x̄ = Σ xᵢ / n.' },
          { id: 'f-4-4-1-2', tipo: 'texto', frente: 'Desvio padrão amostral', verso: 's = √(Σ (xᵢ − x̄)² / (n−1)).' },
        ],
      },
      {
        id: 'c-4-4-2',
        titulo: 'Probabilidade',
        flashcards: [
          { id: 'f-4-4-2-1', tipo: 'texto', frente: 'Probabilidade clássica', verso: 'P(A) = casos favoráveis / casos possíveis.' },
          { id: 'f-4-4-2-2', tipo: 'texto', frente: 'Teorema de Bayes', verso: 'P(A|B) = P(B|A)·P(A) / P(B).' },
        ],
      },
      {
        id: 'c-4-4-3',
        titulo: 'Distribuições',
        flashcards: [
          { id: 'f-4-4-3-1', tipo: 'imagem', frente: img('Normal'), verso: 'Distribuição normal N(μ, σ²) — curva em sino, simétrica.' },
          { id: 'f-4-4-3-2', tipo: 'texto', frente: 'Distribuição binomial', verso: 'P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ.' },
        ],
      },
    ],
  },
  {
    id: 'd-4-5',
    nome: 'Iniciação à Pesquisa Científica',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-5-1',
        titulo: 'Método científico',
        flashcards: [
          { id: 'f-4-5-1-1', tipo: 'texto', frente: 'Etapas do método científico', verso: 'Observação, hipótese, experimentação, análise, conclusão.' },
          { id: 'f-4-5-1-2', tipo: 'texto', frente: 'Pesquisa qualitativa vs quantitativa', verso: 'Qualitativa: compreensão de significados; Quantitativa: medição e generalização estatística.' },
        ],
      },
      {
        id: 'c-4-5-2',
        titulo: 'Normas ABNT',
        flashcards: [
          { id: 'f-4-5-2-1', tipo: 'texto', frente: 'NBR 6023', verso: 'Norma para elaboração de referências bibliográficas.' },
          { id: 'f-4-5-2-2', tipo: 'texto', frente: 'Citação direta longa', verso: 'Mais de 3 linhas: recuo de 4 cm, fonte menor, sem aspas.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 5 ━━━━━━━━━━━
  {
    id: 'd-5-1',
    nome: 'Álgebra Linear I',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-1-1',
        titulo: 'Matrizes e determinantes',
        flashcards: [
          { id: 'f-5-1-1-1', tipo: 'texto', frente: 'Matriz identidade', verso: 'Iₙ — diagonal 1, demais 0.' },
          { id: 'f-5-1-1-2', tipo: 'texto', frente: 'Determinante 2x2', verso: 'det = ad − bc.' },
          { id: 'f-5-1-1-3', tipo: 'texto', frente: 'Matriz invertível', verso: 'A é invertível ⇔ det(A) ≠ 0.' },
        ],
      },
      {
        id: 'c-5-1-2',
        titulo: 'Sistemas lineares',
        flashcards: [
          { id: 'f-5-1-2-1', tipo: 'imagem', frente: img('Forma escalonada'), verso: 'Eliminação de Gauss para resolver Ax=b.' },
          { id: 'f-5-1-2-2', tipo: 'texto', frente: 'Sistema possível e determinado', verso: 'posto(A) = posto(A|b) = nº incógnitas.' },
        ],
      },
      {
        id: 'c-5-1-3',
        titulo: 'Espaços vetoriais',
        flashcards: [
          { id: 'f-5-1-3-1', tipo: 'texto', frente: 'Dependência linear', verso: 'v₁,…,vₙ são LD se existe combinação não trivial igual a 0.' },
          { id: 'f-5-1-3-2', tipo: 'texto', frente: 'Dimensão', verso: 'Número de vetores de uma base de V.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-2',
    nome: 'Ambiente e Desenvolvimento Sustentável',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-2-1',
        titulo: 'Sustentabilidade',
        flashcards: [
          { id: 'f-5-2-1-1', tipo: 'texto', frente: 'Tripé da sustentabilidade', verso: 'Econômico, social e ambiental.' },
          { id: 'f-5-2-1-2', tipo: 'texto', frente: 'Pegada ecológica', verso: 'Medida de quanto a atividade humana demanda dos ecossistemas.' },
        ],
      },
      {
        id: 'c-5-2-2',
        titulo: 'Educação ambiental',
        flashcards: [
          { id: 'f-5-2-2-1', tipo: 'texto', frente: 'PNEA', verso: 'Política Nacional de Educação Ambiental (Lei nº 9.795/1999).' },
          { id: 'f-5-2-2-2', tipo: 'texto', frente: 'Educação ambiental crítica', verso: 'Aborda relações de poder, justiça ambiental e transformação social.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-3',
    nome: 'Cálculo III',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-3-1',
        titulo: 'Funções de várias variáveis',
        flashcards: [
          { id: 'f-5-3-1-1', tipo: 'texto', frente: 'Derivada parcial', verso: '∂f/∂x — derivar tratando outras variáveis como constantes.' },
          { id: 'f-5-3-1-2', tipo: 'texto', frente: 'Gradiente', verso: '∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z).' },
        ],
      },
      {
        id: 'c-5-3-2',
        titulo: 'Derivadas parciais',
        flashcards: [
          { id: 'f-5-3-2-1', tipo: 'texto', frente: 'Regra da cadeia (multivar.)', verso: 'dz/dt = ∂z/∂x · dx/dt + ∂z/∂y · dy/dt.' },
          { id: 'f-5-3-2-2', tipo: 'texto', frente: 'Pontos críticos', verso: 'Onde ∇f = 0; teste da hessiana classifica máx/mín/sela.' },
        ],
      },
      {
        id: 'c-5-3-3',
        titulo: 'Integrais múltiplas',
        flashcards: [
          { id: 'f-5-3-3-1', tipo: 'texto', frente: 'Volume sob superfície', verso: 'V = ∬_R f(x,y) dA.' },
          { id: 'f-5-3-3-2', tipo: 'texto', frente: 'Coordenadas polares (Jacobiano)', verso: 'dA = r dr dθ.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-4',
    nome: 'Estágio Curricular Obrigatório',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-4-1',
        titulo: 'Observação docente',
        flashcards: [
          { id: 'f-5-4-1-1', tipo: 'texto', frente: 'Diário de campo', verso: 'Registro sistemático de observações, percepções e reflexões da prática.' },
          { id: 'f-5-4-1-2', tipo: 'texto', frente: 'Roteiro de observação', verso: 'Guia que delimita o que e como observar (ambiente, relações, estratégias).' },
        ],
      },
      {
        id: 'c-5-4-2',
        titulo: 'Regência de classe',
        flashcards: [
          { id: 'f-5-4-2-1', tipo: 'texto', frente: 'Plano de regência', verso: 'Documento com objetivos, conteúdos, metodologia, recursos e avaliação da aula.' },
          { id: 'f-5-4-2-2', tipo: 'texto', frente: 'Sondagem inicial', verso: 'Levantamento dos conhecimentos prévios para ajustar o plano.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-5',
    nome: 'Didática',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-5-1',
        titulo: 'Métodos de ensino',
        flashcards: [
          { id: 'f-5-5-1-1', tipo: 'texto', frente: 'Aula expositiva dialogada', verso: 'Exposição do conteúdo com participação ativa dos alunos por meio de perguntas e debate.' },
          { id: 'f-5-5-1-2', tipo: 'texto', frente: 'Aprendizagem baseada em problemas', verso: 'Aluno aprende ao investigar e resolver problemas reais ou simulados.' },
        ],
      },
      {
        id: 'c-5-5-2',
        titulo: 'Avaliação da aprendizagem',
        flashcards: [
          { id: 'f-5-5-2-1', tipo: 'texto', frente: 'Avaliação formativa', verso: 'Realizada durante o processo, com objetivo de regular a aprendizagem.' },
          { id: 'f-5-5-2-2', tipo: 'texto', frente: 'Avaliação somativa', verso: 'Verifica resultados ao final de um período, com função classificatória.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-6',
    nome: 'Álgebra Linear II',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-6-1',
        titulo: 'Transformações lineares',
        flashcards: [
          { id: 'f-5-6-1-1', tipo: 'texto', frente: 'Transformação linear', verso: 'T(u+v)=T(u)+T(v) e T(αv)=αT(v).' },
          { id: 'f-5-6-1-2', tipo: 'texto', frente: 'Núcleo e imagem', verso: 'Ker(T) = {v : T(v)=0}; Im(T) = T(V).' },
        ],
      },
      {
        id: 'c-5-6-2',
        titulo: 'Autovalores e autovetores',
        flashcards: [
          { id: 'f-5-6-2-1', tipo: 'texto', frente: 'Equação característica', verso: 'det(A − λI) = 0.' },
          { id: 'f-5-6-2-2', tipo: 'texto', frente: 'Autovetor', verso: 'Vetor v ≠ 0 tal que Av = λv para algum escalar λ.' },
        ],
      },
      {
        id: 'c-5-6-3',
        titulo: 'Diagonalização',
        flashcards: [
          { id: 'f-5-6-3-1', tipo: 'texto', frente: 'Quando A é diagonalizável?', verso: 'Quando possui n autovetores linearmente independentes.' },
          { id: 'f-5-6-3-2', tipo: 'texto', frente: 'Forma diagonalizada', verso: 'A = P D P⁻¹, com D diagonal dos autovalores.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 6 ━━━━━━━━━━━
  {
    id: 'd-6-1',
    nome: 'Cálculo Numérico',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-1-1',
        titulo: 'Erros e aritmética de ponto flutuante',
        flashcards: [
          { id: 'f-6-1-1-1', tipo: 'texto', frente: 'Erro absoluto vs relativo', verso: 'Eₐ = |x − x̃|; Eᵣ = Eₐ / |x|.' },
          { id: 'f-6-1-1-2', tipo: 'texto', frente: 'Underflow e overflow', verso: 'Resultados menores que o mínimo ou maiores que o máximo representáveis em ponto flutuante.' },
        ],
      },
      {
        id: 'c-6-1-2',
        titulo: 'Zeros de funções',
        flashcards: [
          { id: 'f-6-1-2-1', tipo: 'texto', frente: 'Método da bisseção', verso: 'Divide o intervalo ao meio até que o erro seja menor que a tolerância.' },
          { id: 'f-6-1-2-2', tipo: 'texto', frente: 'Método de Newton', verso: 'xₙ₊₁ = xₙ − f(xₙ)/f\'(xₙ).' },
        ],
      },
      {
        id: 'c-6-1-3',
        titulo: 'Sistemas lineares numéricos',
        flashcards: [
          { id: 'f-6-1-3-1', tipo: 'texto', frente: 'Método de Gauss-Seidel', verso: 'Itera substituindo valores atualizados na mesma iteração.' },
          { id: 'f-6-1-3-2', tipo: 'texto', frente: 'Critério de convergência', verso: 'Convergência garantida se A for diagonalmente dominante.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-2',
    nome: 'Instrumentação para o Ensino da Matemática I',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-2-1',
        titulo: 'Materiais didáticos',
        flashcards: [
          { id: 'f-6-2-1-1', tipo: 'texto', frente: 'Material concreto', verso: 'Recurso manipulável que apoia a abstração de conceitos matemáticos.' },
          { id: 'f-6-2-1-2', tipo: 'texto', frente: 'Material dourado', verso: 'Conjunto para ensinar sistema decimal: unidades, dezenas, centenas e milhar.' },
        ],
      },
      {
        id: 'c-6-2-2',
        titulo: 'Resolução de problemas',
        flashcards: [
          { id: 'f-6-2-2-1', tipo: 'texto', frente: 'Etapas de Polya', verso: 'Compreender, planejar, executar, revisar.' },
          { id: 'f-6-2-2-2', tipo: 'texto', frente: 'Problema vs exercício', verso: 'Problema exige estratégia; exercício é aplicação direta de algoritmo conhecido.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-3',
    nome: 'Libras I',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-3-1',
        titulo: 'Alfabeto manual',
        flashcards: [
          { id: 'f-6-3-1-1', tipo: 'texto', frente: 'Datilologia', verso: 'Soletração manual de palavras usando o alfabeto da Libras.' },
          { id: 'f-6-3-1-2', tipo: 'texto', frente: 'Quando usar datilologia', verso: 'Para nomes próprios, termos técnicos ou palavras sem sinal específico.' },
        ],
      },
      {
        id: 'c-6-3-2',
        titulo: 'Vocabulário básico',
        flashcards: [
          { id: 'f-6-3-2-1', tipo: 'texto', frente: 'Parâmetros da Libras', verso: 'Configuração de mão, locação, movimento, orientação e expressões não manuais.' },
          { id: 'f-6-3-2-2', tipo: 'texto', frente: 'Libras é língua natural?', verso: 'Sim — possui gramática própria, distinta da Língua Portuguesa.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-4',
    nome: 'Pesquisa e Prática Pedagógica I',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-4-1',
        titulo: 'Pesquisa em educação',
        flashcards: [
          { id: 'f-6-4-1-1', tipo: 'texto', frente: 'Pesquisa-ação', verso: 'Investigação articulada à intervenção, com participação do pesquisador na transformação.' },
          { id: 'f-6-4-1-2', tipo: 'texto', frente: 'Estudo de caso', verso: 'Investigação aprofundada de uma unidade específica em seu contexto real.' },
        ],
      },
      {
        id: 'c-6-4-2',
        titulo: 'Reflexão sobre a prática',
        flashcards: [
          { id: 'f-6-4-2-1', tipo: 'texto', frente: 'Professor reflexivo (Schön)', verso: 'Reflete na ação e sobre a ação para aprimorar a prática docente.' },
          { id: 'f-6-4-2-2', tipo: 'texto', frente: 'Práxis (Freire)', verso: 'Unidade dialética entre ação e reflexão sobre o mundo para transformá-lo.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-5',
    nome: 'Tecnologias Educacionais',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-5-1',
        titulo: 'Softwares matemáticos',
        flashcards: [
          { id: 'f-6-5-1-1', tipo: 'texto', frente: 'GeoGebra', verso: 'Software livre que integra geometria, álgebra e cálculo de forma dinâmica.' },
          { id: 'f-6-5-1-2', tipo: 'texto', frente: 'Desmos', verso: 'Calculadora gráfica online para visualização interativa de funções.' },
        ],
      },
      {
        id: 'c-6-5-2',
        titulo: 'Ambientes virtuais de aprendizagem',
        flashcards: [
          { id: 'f-6-5-2-1', tipo: 'texto', frente: 'Moodle', verso: 'Plataforma LMS open-source amplamente usada na educação.' },
          { id: 'f-6-5-2-2', tipo: 'texto', frente: 'Sala de aula invertida', verso: 'Estudo prévio do conteúdo em casa e aplicação ativa em sala.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-6',
    nome: 'Análise Matemática I',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-6-1',
        titulo: 'Números reais',
        flashcards: [
          { id: 'f-6-6-1-1', tipo: 'texto', frente: 'Supremo', verso: 'Menor das cotas superiores de um conjunto.' },
          { id: 'f-6-6-1-2', tipo: 'texto', frente: 'Axioma do supremo', verso: 'Todo subconjunto não vazio de ℝ limitado superiormente admite supremo em ℝ.' },
        ],
      },
      {
        id: 'c-6-6-2',
        titulo: 'Sequências e séries',
        flashcards: [
          { id: 'f-6-6-2-1', tipo: 'texto', frente: 'Sequência de Cauchy', verso: 'Para todo ε>0 existe N tal que m,n>N ⇒ |aₘ−aₙ|<ε.' },
          { id: 'f-6-6-2-2', tipo: 'texto', frente: 'Série geométrica', verso: 'Converge ⇔ |r| < 1; soma = a/(1−r).' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 7 ━━━━━━━━━━━
  {
    id: 'd-7-1',
    nome: 'Equações Diferenciais',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-1-1',
        titulo: 'EDOs de 1ª ordem',
        flashcards: [
          { id: 'f-7-1-1-1', tipo: 'texto', frente: 'Variáveis separáveis', verso: 'dy/dx = g(x)h(y) ⇒ ∫ dy/h(y) = ∫ g(x) dx.' },
          { id: 'f-7-1-1-2', tipo: 'texto', frente: 'EDO linear de 1ª ordem', verso: "y' + p(x)y = q(x); fator integrante μ = e^{∫p dx}." },
        ],
      },
      {
        id: 'c-7-1-2',
        titulo: 'EDOs lineares de 2ª ordem',
        flashcards: [
          { id: 'f-7-1-2-1', tipo: 'imagem', frente: img('Massa-mola'), verso: "my'' + cy' + ky = F(t)." },
          { id: 'f-7-1-2-2', tipo: 'texto', frente: 'Equação característica', verso: 'a r² + b r + c = 0 fornece a forma da solução geral homogênea.' },
        ],
      },
      {
        id: 'c-7-1-3',
        titulo: 'Aplicações',
        flashcards: [
          { id: 'f-7-1-3-1', tipo: 'texto', frente: 'Crescimento populacional', verso: 'dP/dt = kP ⇒ P(t) = P₀ eᵏᵗ.' },
          { id: 'f-7-1-3-2', tipo: 'texto', frente: 'Lei de Newton do resfriamento', verso: 'dT/dt = −k(T − Tₐ).' },
        ],
      },
    ],
  },
  {
    id: 'd-7-2',
    nome: 'Instrumentação para o Ensino da Matemática II',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-2-1',
        titulo: 'Modelagem matemática',
        flashcards: [
          { id: 'f-7-2-1-1', tipo: 'texto', frente: 'Modelagem matemática (Bassanezi)', verso: 'Estratégia que parte de uma situação real para produzir um modelo matemático e interpretá-lo.' },
          { id: 'f-7-2-1-2', tipo: 'texto', frente: 'Etapas da modelagem', verso: 'Tema, problema, hipóteses, formulação, resolução, validação.' },
        ],
      },
      {
        id: 'c-7-2-2',
        titulo: 'História da matemática no ensino',
        flashcards: [
          { id: 'f-7-2-2-1', tipo: 'texto', frente: 'Uso da história no ensino', verso: 'Aproxima o aluno do processo de construção do conhecimento matemático.' },
          { id: 'f-7-2-2-2', tipo: 'texto', frente: 'Sequência didática histórica', verso: 'Atividades que partem de problemas históricos para mobilizar conceitos.' },
        ],
      },
    ],
  },
  {
    id: 'd-7-3',
    nome: 'Libras II',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-3-1',
        titulo: 'Gramática da Libras',
        flashcards: [
          { id: 'f-7-3-1-1', tipo: 'texto', frente: 'Ordem sintática típica', verso: 'Tópico-comentário, com flexibilidade espacial.' },
          { id: 'f-7-3-1-2', tipo: 'texto', frente: 'Classificadores', verso: 'Configurações de mão que representam classes de objetos ou ações.' },
        ],
      },
      {
        id: 'c-7-3-2',
        titulo: 'Conversação',
        flashcards: [
          { id: 'f-7-3-2-1', tipo: 'texto', frente: 'Marcação de pergunta', verso: 'Expressão facial específica (sobrancelhas) marca interrogação.' },
          { id: 'f-7-3-2-2', tipo: 'texto', frente: 'Tradutor-intérprete de Libras', verso: 'Profissional habilitado pelo Decreto nº 5.626/2005 para mediar a comunicação.' },
        ],
      },
    ],
  },
  {
    id: 'd-7-4',
    nome: 'Pesquisa e Prática Pedagógica II',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-4-1',
        titulo: 'Projetos de pesquisa',
        flashcards: [
          { id: 'f-7-4-1-1', tipo: 'texto', frente: 'Pergunta de pesquisa', verso: 'Questão clara e delimitada que orienta toda a investigação.' },
          { id: 'f-7-4-1-2', tipo: 'texto', frente: 'Objetivos geral e específicos', verso: 'Geral expressa a meta principal; específicos detalham as etapas para alcançá-la.' },
        ],
      },
      {
        id: 'c-7-4-2',
        titulo: 'Análise da prática',
        flashcards: [
          { id: 'f-7-4-2-1', tipo: 'texto', frente: 'Análise de conteúdo (Bardin)', verso: 'Pré-análise, exploração do material, tratamento dos resultados.' },
          { id: 'f-7-4-2-2', tipo: 'texto', frente: 'Triangulação', verso: 'Uso combinado de fontes, métodos ou observadores para reforçar a validade.' },
        ],
      },
    ],
  },
  {
    id: 'd-7-5',
    nome: 'Análise Matemática II',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-5-1',
        titulo: 'Funções contínuas',
        flashcards: [
          { id: 'f-7-5-1-1', tipo: 'texto', frente: 'Teorema do Valor Médio', verso: "Existe c ∈ (a,b) tal que f'(c) = [f(b) − f(a)] / (b − a)." },
          { id: 'f-7-5-1-2', tipo: 'texto', frente: 'Continuidade uniforme', verso: 'Para todo ε existe δ que serve para todos os pontos do domínio.' },
        ],
      },
      {
        id: 'c-7-5-2',
        titulo: 'Integral de Riemann',
        flashcards: [
          { id: 'f-7-5-2-1', tipo: 'texto', frente: 'Função integrável', verso: 'Somas inferior e superior de Darboux têm o mesmo limite.' },
          { id: 'f-7-5-2-2', tipo: 'texto', frente: 'Toda função contínua em [a,b] é', verso: 'Riemann-integrável em [a,b].' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 8 ━━━━━━━━━━━
  {
    id: 'd-8-1',
    nome: 'Gestão de Processos Educacionais',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-1-1',
        titulo: 'Gestão escolar',
        flashcards: [
          { id: 'f-8-1-1-1', tipo: 'texto', frente: 'Gestão democrática', verso: 'Princípio constitucional que prevê participação da comunidade escolar nas decisões.' },
          { id: 'f-8-1-1-2', tipo: 'texto', frente: 'Conselho escolar', verso: 'Órgão colegiado deliberativo, formado por segmentos da comunidade escolar.' },
        ],
      },
      {
        id: 'c-8-1-2',
        titulo: 'Projeto político-pedagógico',
        flashcards: [
          { id: 'f-8-1-2-1', tipo: 'texto', frente: 'PPP', verso: 'Documento que expressa a identidade, finalidades e ações da escola.' },
          { id: 'f-8-1-2-2', tipo: 'texto', frente: 'Construção do PPP', verso: 'Processo coletivo, contínuo e reflexivo, envolvendo toda a comunidade escolar.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-2',
    nome: 'História da Matemática',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-2-1',
        titulo: 'Matemática antiga e grega',
        flashcards: [
          { id: 'f-8-2-1-1', tipo: 'texto', frente: 'Elementos de Euclides', verso: 'Tratado em 13 livros que axiomatizou a geometria por volta de 300 a.C.' },
          { id: 'f-8-2-1-2', tipo: 'texto', frente: 'Papiro de Rhind', verso: 'Documento egípcio (~1650 a.C.) com problemas aritméticos e geométricos.' },
        ],
      },
      {
        id: 'c-8-2-2',
        titulo: 'Revolução do Cálculo',
        flashcards: [
          { id: 'f-8-2-2-1', tipo: 'texto', frente: 'Newton e Leibniz', verso: 'Desenvolveram independentemente o cálculo no final do século XVII.' },
          { id: 'f-8-2-2-2', tipo: 'texto', frente: 'Notação de Leibniz', verso: 'Introduziu dy/dx e o sinal de integral ∫.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-3',
    nome: 'Matemática Aplicada',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-3-1',
        titulo: 'Modelagem matemática',
        flashcards: [
          { id: 'f-8-3-1-1', tipo: 'texto', frente: 'Modelo determinístico vs estocástico', verso: 'Determinístico: resultado único; Estocástico: incorpora aleatoriedade.' },
          { id: 'f-8-3-1-2', tipo: 'texto', frente: 'Validação do modelo', verso: 'Comparar previsões do modelo com dados reais.' },
        ],
      },
      {
        id: 'c-8-3-2',
        titulo: 'Otimização',
        flashcards: [
          { id: 'f-8-3-2-1', tipo: 'texto', frente: 'Multiplicadores de Lagrange', verso: 'Otimizar f sujeito a g=0: ∇f = λ ∇g.' },
          { id: 'f-8-3-2-2', tipo: 'texto', frente: 'Função objetivo', verso: 'Função a ser maximizada ou minimizada no problema de otimização.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-4',
    nome: 'Pesquisa e Prática Pedagógica III',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-4-1',
        titulo: 'TCC e elaboração de monografia',
        flashcards: [
          { id: 'f-8-4-1-1', tipo: 'texto', frente: 'Elementos pré-textuais', verso: 'Capa, folha de rosto, resumo, sumário.' },
          { id: 'f-8-4-1-2', tipo: 'texto', frente: 'Estrutura do TCC', verso: 'Introdução, referencial teórico, metodologia, resultados, considerações finais.' },
        ],
      },
      {
        id: 'c-8-4-2',
        titulo: 'Defesa e apresentação',
        flashcards: [
          { id: 'f-8-4-2-1', tipo: 'texto', frente: 'Banca examinadora', verso: 'Em geral, orientador e dois professores convidados.' },
          { id: 'f-8-4-2-2', tipo: 'texto', frente: 'Apresentação eficaz', verso: 'Foco no problema, método, principais resultados e contribuições.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-5',
    nome: 'Programação Linear',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-5-1',
        titulo: 'Método simplex',
        flashcards: [
          { id: 'f-8-5-1-1', tipo: 'texto', frente: 'Forma padrão de PL', verso: 'Maximizar cᵀx sujeito a Ax = b, x ≥ 0.' },
          { id: 'f-8-5-1-2', tipo: 'texto', frente: 'Solução básica viável', verso: 'Vértice da região factível; o simplex visita esses vértices.' },
        ],
      },
      {
        id: 'c-8-5-2',
        titulo: 'Dualidade',
        flashcards: [
          { id: 'f-8-5-2-1', tipo: 'texto', frente: 'Teorema da dualidade forte', verso: 'Se primal e dual têm soluções ótimas, seus valores ótimos são iguais.' },
          { id: 'f-8-5-2-2', tipo: 'texto', frente: 'Folgas complementares', verso: 'No ótimo: xⱼ·(custo reduzido)=0 e yᵢ·(folga da restrição)=0.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-6',
    nome: 'Seminário em Educação Matemática',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-6-1',
        titulo: 'Tendências em Educação Matemática',
        flashcards: [
          { id: 'f-8-6-1-1', tipo: 'texto', frente: 'Etnomatemática (D\'Ambrosio)', verso: 'Estuda práticas matemáticas de diferentes grupos culturais.' },
          { id: 'f-8-6-1-2', tipo: 'texto', frente: 'Resolução de problemas como tendência', verso: 'Coloca o aluno como protagonista da construção do conhecimento matemático.' },
        ],
      },
      {
        id: 'c-8-6-2',
        titulo: 'Pesquisas atuais',
        flashcards: [
          { id: 'f-8-6-2-1', tipo: 'texto', frente: 'SBEM', verso: 'Sociedade Brasileira de Educação Matemática.' },
          { id: 'f-8-6-2-2', tipo: 'texto', frente: 'Bolema e Zetetiké', verso: 'Periódicos brasileiros de referência em Educação Matemática.' },
        ],
      },
    ],
  },
];

export const todosConteudos = grade.flatMap((d) =>
  d.conteudos.map((c) => ({
    disciplina: d,
    conteudo: c,
  })),
);

export const buscarConteudo = (conteudoId: string) => {
  for (const d of grade) {
    const c = d.conteudos.find((x) => x.id === conteudoId);
    if (c) return { disciplina: d, conteudo: c };
  }
  return null;
};
