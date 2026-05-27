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
    nome: 'Cálculo Diferencial e Integral I',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-1-1',
        titulo: 'Limites',
        flashcards: [
          { id: 'f-1-1-1-1', tipo: 'texto', frente: 'Definição de limite', verso: 'lim x→a f(x) = L se para todo ε>0 existe δ>0 tal que 0<|x−a|<δ ⇒ |f(x)−L|<ε.' },
          { id: 'f-1-1-1-2', tipo: 'texto', frente: 'Limite fundamental trigonométrico', verso: 'lim x→0 sen(x)/x = 1.' },
          { id: 'f-1-1-1-3', tipo: 'imagem', frente: img('Gráfico limite'), verso: 'Limite quando x→a pela esquerda e direita.' },
        ],
      },
      {
        id: 'c-1-1-2',
        titulo: 'Derivadas',
        flashcards: [
          { id: 'f-1-1-2-1', tipo: 'texto', frente: 'Definição de derivada', verso: "f'(a) = lim h→0 [f(a+h)−f(a)] / h." },
          { id: 'f-1-1-2-2', tipo: 'texto', frente: 'Regra do produto', verso: "(fg)' = f'g + fg'." },
          { id: 'f-1-1-2-3', tipo: 'texto', frente: 'Regra da cadeia', verso: "(f∘g)'(x) = f'(g(x))·g'(x)." },
        ],
      },
      {
        id: 'c-1-1-3',
        titulo: 'Aplicações da derivada',
        flashcards: [
          { id: 'f-1-1-3-1', tipo: 'texto', frente: 'Teste da primeira derivada', verso: "Se f'(x) muda de + para −, x é máximo local; de − para +, mínimo local." },
          { id: 'f-1-1-3-2', tipo: 'imagem', frente: img('Concavidade'), verso: "f''>0 ⇒ côncava para cima; f''<0 ⇒ côncava para baixo." },
        ],
      },
    ],
  },
  {
    id: 'd-1-2',
    nome: 'Geometria Analítica',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-2-1',
        titulo: 'Vetores no plano',
        flashcards: [
          { id: 'f-1-2-1-1', tipo: 'texto', frente: 'Módulo de um vetor (a,b)', verso: '|v| = √(a² + b²).' },
          { id: 'f-1-2-1-2', tipo: 'texto', frente: 'Produto escalar', verso: 'u·v = |u||v|cos θ = u₁v₁ + u₂v₂.' },
        ],
      },
      {
        id: 'c-1-2-2',
        titulo: 'Cônicas',
        flashcards: [
          { id: 'f-1-2-2-1', tipo: 'imagem', frente: img('Elipse'), verso: 'x²/a² + y²/b² = 1.' },
          { id: 'f-1-2-2-2', tipo: 'texto', frente: 'Equação da parábola com foco em (0,p)', verso: 'x² = 4py.' },
        ],
      },
      {
        id: 'c-1-2-3',
        titulo: 'Retas e planos',
        flashcards: [
          { id: 'f-1-2-3-1', tipo: 'texto', frente: 'Equação geral da reta', verso: 'ax + by + c = 0.' },
        ],
      },
    ],
  },
  {
    id: 'd-1-3',
    nome: 'Fundamentos de Matemática',
    fase: 1,
    conteudos: [
      {
        id: 'c-1-3-1',
        titulo: 'Teoria dos conjuntos',
        flashcards: [
          { id: 'f-1-3-1-1', tipo: 'texto', frente: 'Cardinalidade do conjunto vazio', verso: '|∅| = 0.' },
          { id: 'f-1-3-1-2', tipo: 'texto', frente: 'Lei de De Morgan', verso: '(A∪B)ᶜ = Aᶜ ∩ Bᶜ.' },
        ],
      },
      {
        id: 'c-1-3-2',
        titulo: 'Lógica matemática',
        flashcards: [
          { id: 'f-1-3-2-1', tipo: 'texto', frente: 'Contrapositiva de p→q', verso: '¬q → ¬p.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 2 ━━━━━━━━━━━
  {
    id: 'd-2-1',
    nome: 'Cálculo Diferencial e Integral II',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-1-1',
        titulo: 'Integrais indefinidas',
        flashcards: [
          { id: 'f-2-1-1-1', tipo: 'texto', frente: '∫ xⁿ dx, n≠−1', verso: 'xⁿ⁺¹/(n+1) + C.' },
          { id: 'f-2-1-1-2', tipo: 'texto', frente: '∫ 1/x dx', verso: 'ln|x| + C.' },
        ],
      },
      {
        id: 'c-2-1-2',
        titulo: 'Teorema fundamental do cálculo',
        flashcards: [
          { id: 'f-2-1-2-1', tipo: 'texto', frente: 'TFC parte 1', verso: "Se F(x)=∫ₐˣ f(t)dt, então F'(x)=f(x)." },
        ],
      },
      {
        id: 'c-2-1-3',
        titulo: 'Técnicas de integração',
        flashcards: [
          { id: 'f-2-1-3-1', tipo: 'texto', frente: 'Integração por partes', verso: '∫ u dv = uv − ∫ v du.' },
        ],
      },
    ],
  },
  {
    id: 'd-2-2',
    nome: 'Álgebra Linear I',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-2-1',
        titulo: 'Matrizes',
        flashcards: [
          { id: 'f-2-2-1-1', tipo: 'texto', frente: 'Matriz identidade', verso: 'Iₙ — diagonal 1, demais 0.' },
          { id: 'f-2-2-1-2', tipo: 'texto', frente: 'Determinante 2x2', verso: 'det = ad − bc.' },
        ],
      },
      {
        id: 'c-2-2-2',
        titulo: 'Sistemas lineares',
        flashcards: [
          { id: 'f-2-2-2-1', tipo: 'imagem', frente: img('Forma escalonada'), verso: 'Eliminação de Gauss para resolver Ax=b.' },
        ],
      },
      {
        id: 'c-2-2-3',
        titulo: 'Espaços vetoriais',
        flashcards: [
          { id: 'f-2-2-3-1', tipo: 'texto', frente: 'Dimensão', verso: 'Número de vetores de uma base.' },
        ],
      },
    ],
  },
  {
    id: 'd-2-3',
    nome: 'Geometria Plana e Espacial',
    fase: 2,
    conteudos: [
      {
        id: 'c-2-3-1',
        titulo: 'Triângulos',
        flashcards: [
          { id: 'f-2-3-1-1', tipo: 'texto', frente: 'Soma dos ângulos internos', verso: '180°.' },
          { id: 'f-2-3-1-2', tipo: 'texto', frente: 'Teorema de Pitágoras', verso: 'a² + b² = c² (triângulo retângulo).' },
        ],
      },
      {
        id: 'c-2-3-2',
        titulo: 'Sólidos geométricos',
        flashcards: [
          { id: 'f-2-3-2-1', tipo: 'imagem', frente: img('Cilindro'), verso: 'V = π r² h.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 3 ━━━━━━━━━━━
  {
    id: 'd-3-1',
    nome: 'Cálculo Diferencial e Integral III',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-1-1',
        titulo: 'Funções de várias variáveis',
        flashcards: [
          { id: 'f-3-1-1-1', tipo: 'texto', frente: 'Derivada parcial', verso: '∂f/∂x — derivar tratando outras variáveis como constantes.' },
        ],
      },
      {
        id: 'c-3-1-2',
        titulo: 'Integrais duplas',
        flashcards: [
          { id: 'f-3-1-2-1', tipo: 'texto', frente: 'Volume sob superfície', verso: 'V = ∬_R f(x,y) dA.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-2',
    nome: 'Álgebra Linear II',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-2-1',
        titulo: 'Autovalores e autovetores',
        flashcards: [
          { id: 'f-3-2-1-1', tipo: 'texto', frente: 'Equação característica', verso: 'det(A − λI) = 0.' },
        ],
      },
      {
        id: 'c-3-2-2',
        titulo: 'Diagonalização',
        flashcards: [
          { id: 'f-3-2-2-1', tipo: 'texto', frente: 'Quando A é diagonalizável?', verso: 'Quando possui n autovetores linearmente independentes.' },
        ],
      },
    ],
  },
  {
    id: 'd-3-3',
    nome: 'Estatística e Probabilidade I',
    fase: 3,
    conteudos: [
      {
        id: 'c-3-3-1',
        titulo: 'Medidas de posição',
        flashcards: [
          { id: 'f-3-3-1-1', tipo: 'texto', frente: 'Média aritmética', verso: 'x̄ = Σ xᵢ / n.' },
          { id: 'f-3-3-1-2', tipo: 'texto', frente: 'Mediana', verso: 'Valor que divide a amostra ordenada ao meio.' },
        ],
      },
      {
        id: 'c-3-3-2',
        titulo: 'Probabilidade básica',
        flashcards: [
          { id: 'f-3-3-2-1', tipo: 'texto', frente: 'Probabilidade clássica', verso: 'P(A) = casos favoráveis / casos possíveis.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 4 ━━━━━━━━━━━
  {
    id: 'd-4-1',
    nome: 'Cálculo Diferencial e Integral IV',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-1-1',
        titulo: 'Séries numéricas',
        flashcards: [
          { id: 'f-4-1-1-1', tipo: 'texto', frente: 'Série geométrica converge quando', verso: '|r| < 1; soma = a/(1−r).' },
        ],
      },
      {
        id: 'c-4-1-2',
        titulo: 'Séries de potências',
        flashcards: [
          { id: 'f-4-1-2-1', tipo: 'texto', frente: 'Série de Taylor', verso: 'f(x) = Σ fⁿ(a)(x−a)ⁿ/n!.' },
        ],
      },
    ],
  },
  {
    id: 'd-4-2',
    nome: 'Equações Diferenciais Ordinárias',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-2-1',
        titulo: 'EDOs de 1ª ordem',
        flashcards: [
          { id: 'f-4-2-1-1', tipo: 'texto', frente: 'Variáveis separáveis', verso: 'dy/dx = g(x)h(y) ⇒ ∫ dy/h(y) = ∫ g(x)dx.' },
        ],
      },
      {
        id: 'c-4-2-2',
        titulo: 'EDOs lineares de 2ª ordem',
        flashcards: [
          { id: 'f-4-2-2-1', tipo: 'imagem', frente: img('Massa-mola'), verso: 'my\'\' + cy\' + ky = F(t).' },
        ],
      },
    ],
  },
  {
    id: 'd-4-3',
    nome: 'Análise Combinatória',
    fase: 4,
    conteudos: [
      {
        id: 'c-4-3-1',
        titulo: 'Princípios de contagem',
        flashcards: [
          { id: 'f-4-3-1-1', tipo: 'texto', frente: 'Princípio multiplicativo', verso: 'Se A pode ocorrer de m modos e B de n modos, A e B juntos ocorrem de m·n modos.' },
        ],
      },
      {
        id: 'c-4-3-2',
        titulo: 'Permutações e combinações',
        flashcards: [
          { id: 'f-4-3-2-1', tipo: 'texto', frente: 'Combinação Cₙ,ₖ', verso: 'n! / (k!(n−k)!).' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 5 ━━━━━━━━━━━
  {
    id: 'd-5-1',
    nome: 'Análise Real I',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-1-1',
        titulo: 'Números reais',
        flashcards: [
          { id: 'f-5-1-1-1', tipo: 'texto', frente: 'Supremo', verso: 'Menor das cotas superiores de um conjunto.' },
        ],
      },
      {
        id: 'c-5-1-2',
        titulo: 'Sequências',
        flashcards: [
          { id: 'f-5-1-2-1', tipo: 'texto', frente: 'Sequência de Cauchy', verso: 'Para todo ε>0, existe N tal que m,n>N ⇒ |aₘ−aₙ|<ε.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-2',
    nome: 'Álgebra Abstrata I',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-2-1',
        titulo: 'Grupos',
        flashcards: [
          { id: 'f-5-2-1-1', tipo: 'texto', frente: 'Definição de grupo', verso: 'Conjunto com operação associativa, elemento neutro e inversos.' },
        ],
      },
      {
        id: 'c-5-2-2',
        titulo: 'Subgrupos',
        flashcards: [
          { id: 'f-5-2-2-1', tipo: 'texto', frente: 'Teorema de Lagrange', verso: 'A ordem de um subgrupo divide a ordem do grupo.' },
        ],
      },
    ],
  },
  {
    id: 'd-5-3',
    nome: 'Didática da Matemática',
    fase: 5,
    conteudos: [
      {
        id: 'c-5-3-1',
        titulo: 'Teorias de aprendizagem',
        flashcards: [
          { id: 'f-5-3-1-1', tipo: 'texto', frente: 'Zona de desenvolvimento proximal', verso: 'Vygotsky — distância entre o que o aluno faz sozinho e com auxílio.' },
        ],
      },
      {
        id: 'c-5-3-2',
        titulo: 'Planejamento de aula',
        flashcards: [
          { id: 'f-5-3-2-1', tipo: 'texto', frente: 'Objetivos de aprendizagem', verso: 'Devem ser específicos, mensuráveis e observáveis.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 6 ━━━━━━━━━━━
  {
    id: 'd-6-1',
    nome: 'Análise Real II',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-1-1',
        titulo: 'Continuidade e diferenciação',
        flashcards: [
          { id: 'f-6-1-1-1', tipo: 'texto', frente: 'Teorema do valor médio', verso: "Existe c ∈ (a,b) tal que f'(c) = [f(b)−f(a)]/(b−a)." },
        ],
      },
      {
        id: 'c-6-1-2',
        titulo: 'Integral de Riemann',
        flashcards: [
          { id: 'f-6-1-2-1', tipo: 'texto', frente: 'Função integrável', verso: 'Limite inferior e superior das somas de Riemann coincidem.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-2',
    nome: 'Probabilidade e Estatística II',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-2-1',
        titulo: 'Distribuições contínuas',
        flashcards: [
          { id: 'f-6-2-1-1', tipo: 'imagem', frente: img('Normal'), verso: 'Distribuição normal N(μ, σ²) — curva em sino.' },
        ],
      },
      {
        id: 'c-6-2-2',
        titulo: 'Inferência estatística',
        flashcards: [
          { id: 'f-6-2-2-1', tipo: 'texto', frente: 'Erro tipo I', verso: 'Rejeitar H₀ quando ela é verdadeira.' },
        ],
      },
    ],
  },
  {
    id: 'd-6-3',
    nome: 'Métodos Numéricos',
    fase: 6,
    conteudos: [
      {
        id: 'c-6-3-1',
        titulo: 'Zeros de funções',
        flashcards: [
          { id: 'f-6-3-1-1', tipo: 'texto', frente: 'Método da bisseção', verso: 'Divide o intervalo ao meio até que o erro seja menor que a tolerância.' },
        ],
      },
      {
        id: 'c-6-3-2',
        titulo: 'Interpolação',
        flashcards: [
          { id: 'f-6-3-2-1', tipo: 'texto', frente: 'Polinômio de Lagrange', verso: 'Polinômio interpolador único de grau ≤ n para n+1 pontos.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 7 ━━━━━━━━━━━
  {
    id: 'd-7-1',
    nome: 'Análise Complexa',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-1-1',
        titulo: 'Funções analíticas',
        flashcards: [
          { id: 'f-7-1-1-1', tipo: 'texto', frente: 'Equações de Cauchy-Riemann', verso: 'uₓ = vᵧ e uᵧ = −vₓ.' },
        ],
      },
      {
        id: 'c-7-1-2',
        titulo: 'Integração no plano complexo',
        flashcards: [
          { id: 'f-7-1-2-1', tipo: 'texto', frente: 'Teorema dos resíduos', verso: '∮ f dz = 2πi · Σ Res(f, zₖ).' },
        ],
      },
    ],
  },
  {
    id: 'd-7-2',
    nome: 'Topologia',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-2-1',
        titulo: 'Espaços topológicos',
        flashcards: [
          { id: 'f-7-2-1-1', tipo: 'texto', frente: 'Definição de topologia', verso: 'Família de abertos fechada por união arbitrária e interseção finita, contendo ∅ e X.' },
        ],
      },
      {
        id: 'c-7-2-2',
        titulo: 'Compacidade',
        flashcards: [
          { id: 'f-7-2-2-1', tipo: 'texto', frente: 'Heine-Borel', verso: 'Em ℝⁿ, compacto ⇔ fechado e limitado.' },
        ],
      },
    ],
  },
  {
    id: 'd-7-3',
    nome: 'História da Matemática',
    fase: 7,
    conteudos: [
      {
        id: 'c-7-3-1',
        titulo: 'Matemática grega',
        flashcards: [
          { id: 'f-7-3-1-1', tipo: 'texto', frente: 'Elementos de Euclides', verso: 'Tratado em 13 livros que axiomatizou a geometria por volta de 300 a.C.' },
        ],
      },
      {
        id: 'c-7-3-2',
        titulo: 'Revolução do Cálculo',
        flashcards: [
          { id: 'f-7-3-2-1', tipo: 'texto', frente: 'Newton e Leibniz', verso: 'Desenvolveram independentemente o cálculo no final do século XVII.' },
        ],
      },
    ],
  },

  // ━━━━━━━━━━━ FASE 8 ━━━━━━━━━━━
  {
    id: 'd-8-1',
    nome: 'Trabalho de Conclusão de Curso',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-1-1',
        titulo: 'Metodologia de pesquisa',
        flashcards: [
          { id: 'f-8-1-1-1', tipo: 'texto', frente: 'Pesquisa qualitativa', verso: 'Foco em compreensão de fenômenos, não em quantificação.' },
        ],
      },
      {
        id: 'c-8-1-2',
        titulo: 'Estrutura do TCC',
        flashcards: [
          { id: 'f-8-1-2-1', tipo: 'texto', frente: 'Elementos pré-textuais', verso: 'Capa, folha de rosto, resumo, sumário.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-2',
    nome: 'Estágio Supervisionado',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-2-1',
        titulo: 'Prática docente',
        flashcards: [
          { id: 'f-8-2-1-1', tipo: 'texto', frente: 'Plano de aula', verso: 'Tema, objetivos, conteúdo, metodologia, recursos, avaliação.' },
        ],
      },
      {
        id: 'c-8-2-2',
        titulo: 'Avaliação de aprendizagem',
        flashcards: [
          { id: 'f-8-2-2-1', tipo: 'texto', frente: 'Avaliação formativa', verso: 'Realizada durante o processo, com objetivo de regular a aprendizagem.' },
        ],
      },
    ],
  },
  {
    id: 'd-8-3',
    nome: 'Tópicos Especiais em Matemática',
    fase: 8,
    conteudos: [
      {
        id: 'c-8-3-1',
        titulo: 'Teoria dos grafos',
        flashcards: [
          { id: 'f-8-3-1-1', tipo: 'imagem', frente: img('Grafo K4'), verso: 'Grafo completo K₄ tem 4 vértices e 6 arestas.' },
        ],
      },
      {
        id: 'c-8-3-2',
        titulo: 'Criptografia',
        flashcards: [
          { id: 'f-8-3-2-1', tipo: 'texto', frente: 'RSA', verso: 'Baseado na dificuldade de fatorar produtos de dois primos grandes.' },
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
