# Igreja Videira - Sistema de Eventos e Ingressos

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
</div>

<div align="center">
  <h3>🙏 Plataforma completa de gerenciamento de eventos para igrejas</h3>
  <p>Sistema moderno e intuitivo para venda de ingressos, controle de acesso e gestão de eventos religiosos</p>
</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## 🎯 Sobre o Projeto

O **Igreja Videira** é uma plataforma completa desenvolvida especificamente para igrejas e organizações religiosas gerenciarem seus eventos de forma profissional e moderna. O sistema oferece desde a criação de eventos até o controle de acesso via QR Code.

### 🌟 Principais Diferenciais

- **Multi-nível**: Sistema com diferentes níveis de acesso (usuário, admin, scanner, super-admin)
- **Checkout Completo**: Processo de compra em múltiplas etapas com PIX e cartão
- **QR Codes Inteligentes**: Geração automática com opção única ou múltipla
- **Dashboard Avançado**: Métricas e gráficos em tempo real
- **Campos Personalizados**: Formulários dinâmicos por evento
- **Scanner Integrado**: Controle de acesso em tempo real
- **Design Moderno**: Interface dark com tema verde institucional

## ✨ Funcionalidades

### 🏠 Área Pública
- ✅ Landing page responsiva com eventos em destaque
- ✅ Catálogo de eventos com filtros avançados
- ✅ Página detalhada de cada evento
- ✅ Sistema de autenticação (login/cadastro)
- ✅ Checkout completo em 4 etapas
- ✅ Integração com cupons de desconto
- ✅ Múltiplas variações de ingresso

### 👤 Área do Usuário
- ✅ Dashboard pessoal com próximos eventos
- ✅ Gerenciamento de ingressos com QR Codes
- ✅ Histórico completo de participações
- ✅ Edição de perfil e preferências
- ✅ Download e compartilhamento de ingressos

### 🛠 Painel Administrativo
- ✅ Dashboard com métricas e gráficos interativos
- ✅ CRUD completo de eventos
- ✅ Editor de campos personalizados
- ✅ Sistema de variações de ingresso
- ✅ Gestão completa de usuários
- ✅ Sistema de cupons de desconto
- ✅ Scanner QR Code para controle de acesso
- ✅ Relatórios detalhados de vendas
- ✅ Configurações da igreja

### 🔧 Funcionalidades Técnicas
- ✅ Autenticação por níveis de acesso
- ✅ Proteção de rotas baseada em roles
- ✅ Validação de formulários em tempo real
- ✅ Estados de loading e tratamento de erros
- ✅ Design responsivo (mobile-first)
- ✅ Tema escuro moderno
- ✅ Componentes reutilizáveis

## 🚀 Tecnologias

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Recharts](https://recharts.org/)** - Gráficos e visualizações

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **Lint-staged** - Linting em arquivos staged

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Passo a passo

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/seu-usuario/igreja-videira.git
cd igreja-videira
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Configure as variáveis de ambiente**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Execute o projeto**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

5. **Acesse a aplicação**
\`\`\`
http://localhost:3000
\`\`\`

## 🎮 Como Usar

### Usuários de Demonstração

O sistema vem com usuários pré-configurados para teste:

#### Super Administrador
- **Email**: `superadmin@igrejavideira.com`
- **Senha**: `admin123`
- **Acesso**: Todas as funcionalidades

#### Administrador
- **Email**: `admin@igrejavideira.com`
- **Senha**: `admin123`
- **Acesso**: Gestão da igreja específica

#### Scanner
- **Email**: `scanner@igrejavideira.com`
- **Senha**: `scanner123`
- **Acesso**: Scanner QR Code

#### Usuário Comum
- **Email**: `usuario@exemplo.com`
- **Senha**: `senha123`
- **Acesso**: Compra de ingressos

### Fluxo Básico de Uso

1. **Acesse a página inicial** e explore os eventos disponíveis
2. **Faça login** ou crie uma conta
3. **Selecione um evento** e clique em "Comprar Ingressos"
4. **Complete o checkout** seguindo as etapas
5. **Acesse "Minha Conta"** para ver seus ingressos
6. **Use o painel admin** para gerenciar eventos (se for administrador)

## 📁 Estrutura do Projeto

\`\`\`
igreja-videira/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 14)
│   │   ├── 📁 admin/              # Área administrativa
│   │   │   ├── 📄 page.tsx        # Dashboard admin
│   │   │   ├── 📁 eventos/        # Gestão de eventos
│   │   │   ├── 📁 usuarios/       # Gestão de usuários
│   │   │   ├── 📁 scanner/        # Scanner QR Code
│   │   │   └── 📁 configuracoes/  # Configurações
│   │   ├── 📁 eventos/            # Eventos públicos
│   │   │   ├── 📄 page.tsx        # Lista de eventos
│   │   │   └── 📁 [id]/           # Detalhes do evento
│   │   ├── 📁 checkout/           # Processo de compra
│   │   │   └── 📁 [id]/           # Checkout por evento
│   │   ├── 📁 minha-conta/        # Área do usuário
│   │   │   ├── 📄 page.tsx        # Dashboard pessoal
│   │   │   ├── 📁 ingressos/      # Meus ingressos
│   │   │   └── 📁 perfil/         # Editar perfil
│   │   ├── 📄 layout.tsx          # Layout principal
│   │   ├── 📄 page.tsx            # Página inicial
│   │   └── 📄 globals.css         # Estilos globais
│   ├── 📁 components/             # Componentes React
│   │   ├── 📁 ui/                 # Componentes base (shadcn/ui)
│   │   ├── 📁 admin/              # Componentes administrativos
│   │   ├── 📁 shared/             # Componentes compartilhados
│   │   └── 📁 forms/              # Componentes de formulário
│   ├── 📁 lib/                    # Utilitários e configurações
│   ├── 📁 hooks/                  # Custom hooks
│   ├── 📁 contexts/               # Context providers
│   └── 📁 types/                  # Definições TypeScript
├── 📁 public/                     # Arquivos estáticos
├── 📄 package.json                # Dependências do projeto
├── 📄 tailwind.config.ts          # Configuração do Tailwind
├── 📄 tsconfig.json               # Configuração do TypeScript
└── 📄 next.config.js              # Configuração do Next.js
\`\`\`

## 🎨 Screenshots

### Página Inicial
![Home Page](docs/screenshots/home.png)

### Dashboard Administrativo
![Admin Dashboard](docs/screenshots/admin-dashboard.png)

### Checkout
![Checkout Process](docs/screenshots/checkout.png)

### Scanner QR Code
![QR Scanner](docs/screenshots/scanner.png)

## 🔧 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run type-check   # Verifica tipos TypeScript
\`\`\`

## 🌐 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Suporte completo para Next.js
- **Railway**: Deploy simples com banco de dados
- **DigitalOcean**: App Platform com containers

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Siga estes passos:

1. **Fork o projeto**
2. **Crie uma branch para sua feature**
   \`\`\`bash
   git checkout -b feature/nova-funcionalidade
   \`\`\`
3. **Commit suas mudanças**
   \`\`\`bash
   git commit -m 'feat: adiciona nova funcionalidade'
   \`\`\`
4. **Push para a branch**
   \`\`\`bash
   git push origin feature/nova-funcionalidade
   \`\`\`
5. **Abra um Pull Request**

### Padrões de Commit
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 📝 Roadmap

### 🔄 Em Desenvolvimento
- [ ] Integração com Firebase/Supabase
- [ ] Gateway de pagamento real (Stripe/PagSeguro)
- [ ] Sistema de notificações push
- [ ] Testes automatizados (Jest/Cypress)

### 🚀 Futuras Implementações
- [ ] App mobile (React Native/Flutter)
- [ ] Chat de suporte integrado
- [ ] Sistema de avaliações de eventos
- [ ] Integração com redes sociais
- [ ] Relatórios avançados com IA
- [ ] Marketplace de eventos
- [ ] Sistema de afiliados
- [ ] Multi-idiomas (i18n)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Suporte

- **Email**: contato@igrejavideira.com
- **Website**: https://igrejavideira.com
- **GitHub Issues**: [Reportar problemas](https://github.com/seu-usuario/igreja-videira/issues)
- **Discussions**: [Discussões da comunidade](https://github.com/seu-usuario/igreja-videira/discussions)

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) pela excelente biblioteca de componentes
- [Lucide](https://lucide.dev/) pelos ícones modernos
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS
- [Next.js](https://nextjs.org/) pelo framework React
- Comunidade open source pelo suporte e inspiração

---

<div align="center">
  <p>Feito com ❤️ para conectar comunidades através da tecnologia</p>
  <p><strong>Igreja Videira</strong> - Transformando eventos em experiências memoráveis</p>
</div>
