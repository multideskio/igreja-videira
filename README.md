# Igreja Videira - Sistema de Eventos e Ingressos

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=white" alt="Neon" />
</div>

<div align="center">
  <h3>🙏 Sistema completo de gerenciamento de eventos para igrejas</h3>
  <p>Plataforma moderna com backend completo, banco de dados PostgreSQL e APIs REST</p>
</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração do Banco](#configuração-do-banco)
- [APIs Disponíveis](#apis-disponíveis)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Deploy](#deploy)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

O **Igreja Videira** é uma plataforma completa desenvolvida especificamente para igrejas e organizações religiosas. O sistema oferece **backend completo** com banco de dados PostgreSQL (Neon), APIs REST e interface moderna para gerenciar eventos, vendas de ingressos e controle de acesso.

### 🌟 Principais Diferenciais

- **🗄️ Backend Completo**: APIs REST com PostgreSQL e autenticação JWT
- **🔐 Multi-nível**: Sistema com diferentes níveis de acesso
- **💳 Checkout Avançado**: Processo completo com múltiplas variações de ingresso
- **📱 QR Codes**: Geração automática para controle de acesso
- **📊 Analytics**: Dashboard com métricas em tempo real
- **🎨 Design Moderno**: Interface responsiva em dark mode
- **⚡ Performance**: Otimizado com Next.js 14 e App Router

## ✨ Funcionalidades

### 🏠 **Frontend (Área Pública)**
- ✅ Landing page responsiva com eventos em destaque
- ✅ Catálogo de eventos com filtros avançados
- ✅ Página detalhada de cada evento com variações de ingresso
- ✅ Sistema completo de autenticação (login/cadastro)
- ✅ Checkout em 4 etapas com validação de cupons
- ✅ Geração automática de QR Codes
- ✅ Área do usuário com histórico de ingressos

### 🛠 **Painel Administrativo**
- ✅ Dashboard com métricas e gráficos interativos
- ✅ CRUD completo de eventos com campos personalizados
- ✅ Sistema de variações de ingresso (VIP, comum, família)
- ✅ Gestão completa de usuários e permissões
- ✅ Sistema de cupons de desconto
- ✅ Scanner QR Code para controle de entrada
- ✅ Relatórios detalhados de vendas
- ✅ Configurações da igreja

### 🔧 **Backend (APIs REST)**
- ✅ **Autenticação JWT** com hash de senhas
- ✅ **CRUD de Eventos** com relacionamentos
- ✅ **Sistema de Compras** com validações
- ✅ **Validação de Cupons** em tempo real
- ✅ **Analytics** com métricas de dashboard
- ✅ **Middleware** de proteção de rotas
- ✅ **Tratamento de Erros** padronizado

### 🗄️ **Banco de Dados**
- ✅ **8 Tabelas** com relacionamentos otimizados
- ✅ **Índices** para alta performance
- ✅ **Triggers** automáticos para auditoria
- ✅ **Dados de exemplo** para desenvolvimento
- ✅ **Migrations** organizadas em scripts

## 🚀 Tecnologias

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Recharts](https://recharts.org/)** - Gráficos interativos

### **Backend**
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Neon](https://neon.tech/)** - PostgreSQL serverless
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - APIs REST
- **JWT** - Autenticação stateless
- **SQL** - Queries otimizadas

### **Ferramentas**
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **TypeScript** - Verificação de tipos

## 🏗 Arquitetura

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React Pages   │    │ • JWT Auth      │    │ • 8 Tables      │
│ • Components    │    │ • REST APIs     │    │ • Relationships │
│ • Contexts      │    │ • Middleware    │    │ • Indexes       │
│ • Hooks         │    │ • Validation    │    │ • Triggers      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

### **Fluxo de Dados**
1. **Frontend** faz requisições para as APIs
2. **Middleware** valida autenticação JWT
3. **APIs** processam e validam dados
4. **Database** executa queries otimizadas
5. **Response** retorna dados estruturados

## 📦 Instalação

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn
- Conta no [Neon](https://neon.tech/) (PostgreSQL gratuito)

### **Passo a passo**

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/seu-usuario/igreja-videira.git
cd igreja-videira
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Configure as variáveis de ambiente**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite o `.env.local`:
\`\`\`env
# Database (obrigatório)
DATABASE_URL="postgresql://user:pass@host:5432/db"

# JWT Secret (obrigatório)
JWT_SECRET="seu-jwt-secret-super-seguro"

# App Settings
APP_NAME="Igreja Videira"
APP_URL="http://localhost:3000"
\`\`\`

4. **Configure o banco de dados**
\`\`\`bash
# Execute os scripts SQL no seu banco Neon
# 1. scripts/001-create-tables.sql
# 2. scripts/002-seed-data.sql
\`\`\`

5. **Execute o projeto**
\`\`\`bash
npm run dev
\`\`\`

6. **Acesse a aplicação**
\`\`\`
http://localhost:3000
\`\`\`

## 🗄️ Configuração do Banco

### **1. Criar conta no Neon**
1. Acesse [neon.tech](https://neon.tech/)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a `DATABASE_URL`

### **2. Executar Scripts SQL**

Execute os scripts na seguinte ordem:

#### **Criar Tabelas**
\`\`\`sql
-- Execute: scripts/001-create-tables.sql
-- Cria todas as tabelas, índices e triggers
\`\`\`

#### **Inserir Dados de Exemplo**
\`\`\`sql
-- Execute: scripts/002-seed-data.sql  
-- Insere igreja, usuários e eventos de exemplo
\`\`\`

### **3. Estrutura do Banco**

\`\`\`
churches (igrejas)
├── users (usuários)
├── events (eventos)
│   ├── ticket_variations (variações de ingresso)
│   ├── purchases (compras)
│   └── event_analytics (analytics)
├── coupons (cupons)
└── qr_scans (histórico de scans)
\`\`\`

## 🔌 APIs Disponíveis

### **Autenticação**
\`\`\`
POST /api/auth/login      # Login de usuário
POST /api/auth/register   # Registro de usuário
\`\`\`

### **Eventos**
\`\`\`
GET    /api/events        # Listar eventos públicos
GET    /api/events/[id]   # Detalhes do evento
POST   /api/events        # Criar evento (admin)
PUT    /api/events/[id]   # Atualizar evento (admin)
DELETE /api/events/[id]   # Deletar evento (admin)
\`\`\`

### **Compras**
\`\`\`
POST /api/purchases       # Criar compra
GET  /api/purchases       # Listar compras do usuário
\`\`\`

### **Cupons**
\`\`\`
POST /api/coupons/validate # Validar cupom
\`\`\`

### **Dashboard Admin**
\`\`\`
GET /api/admin/dashboard  # Métricas do dashboard
\`\`\`

### **Exemplo de Uso**
\`\`\`javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@igrejivideira.com',
    password: 'admin123'
  })
});

const { token, user } = await response.json();

// Usar token nas próximas requisições
const events = await fetch('/api/events', {
  headers: { 'Authorization': `Bearer ${token}` }
});
\`\`\`

## 🎮 Como Usar

### **Usuários de Demonstração**

O sistema vem com usuários pré-configurados:

| Tipo | Email | Senha | Acesso |
|------|-------|-------|--------|
| **Super Admin** | `superadmin@igrejivideira.com` | `admin123` | Todas as funcionalidades |
| **Admin** | `admin@igrejivideira.com` | `admin123` | Gestão da igreja |
| **Scanner** | `scanner@igrejivideira.com` | `scanner123` | Scanner QR Code |
| **Usuário** | `usuario@exemplo.com` | `senha123` | Compra de ingressos |

### **Fluxo de Uso**

1. **👤 Como Usuário:**
   - Acesse a página inicial
   - Navegue pelos eventos
   - Faça login ou cadastre-se
   - Complete o checkout
   - Acesse "Minha Conta" para ver ingressos

2. **👨‍💼 Como Administrador:**
   - Faça login com credenciais admin
   - Acesse `/admin` para o dashboard
   - Gerencie eventos, usuários e cupons
   - Visualize relatórios e métricas

3. **📱 Como Scanner:**
   - Faça login com credenciais scanner
   - Acesse `/admin/scanner`
   - Escaneie QR Codes dos ingressos
   - Controle entrada nos eventos

## 📁 Estrutura do Projeto

\`\`\`
igreja-videira/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 14)
│   │   ├── 📁 api/                # 🔌 APIs REST
│   │   │   ├── 📁 auth/           # Autenticação
│   │   │   ├── 📁 events/         # CRUD de eventos
│   │   │   ├── 📁 purchases/      # Sistema de compras
│   │   │   ├── 📁 coupons/        # Validação de cupons
│   │   │   └── 📁 admin/          # APIs administrativas
│   │   ├── 📁 admin/              # 🛠 Painel administrativo
│   │   ├── 📁 eventos/            # 📅 Eventos públicos
│   │   ├── 📁 checkout/           # 🛒 Processo de compra
│   │   ├── 📁 minha-conta/        # 👤 Área do usuário
│   │   ├── 📄 layout.tsx          # Layout principal
│   │   ├── 📄 page.tsx            # Página inicial
│   │   └── 📄 globals.css         # Estilos globais
│   ├── 📁 components/             # 🧩 Componentes React
│   │   ├── 📁 ui/                 # Componentes base
│   │   ├── 📁 admin/              # Componentes admin
│   │   └── 📁 shared/             # Componentes compartilhados
│   ├── 📁 lib/                    # 🛠 Utilitários
│   │   ├── 📄 database.ts         # Conexão com banco
│   │   ├── 📄 auth.ts             # Funções de autenticação
│   │   └── 📄 utils.ts            # Utilitários gerais
│   ├── 📁 contexts/               # 🔄 Context providers
│   ├── 📁 hooks/                  # 🎣 Custom hooks
│   └── 📁 types/                  # 📝 Definições TypeScript
├── 📁 scripts/                    # 🗄️ Scripts SQL
│   ├── 📄 001-create-tables.sql   # Criação de tabelas
│   └── 📄 002-seed-data.sql       # Dados de exemplo
├── 📁 docs/                       # 📚 Documentação
├── 📄 middleware.ts               # 🛡️ Middleware de auth
├── 📄 package.json                # Dependências
├── 📄 tailwind.config.ts          # Config Tailwind
└── 📄 next.config.js              # Config Next.js
\`\`\`

## 🔧 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # ESLint
npm run type-check   # Verificação TypeScript

# Banco de dados
npm run db:migrate   # Executar migrations (futuro)
npm run db:seed      # Popular banco com dados (futuro)
\`\`\`

## 🚀 Deploy

### **Vercel + Neon (Recomendado)**

1. **Deploy Frontend na Vercel**
   - Conecte repositório GitHub
   - Configure variáveis de ambiente
   - Deploy automático

2. **Banco Neon**
   - Já está configurado
   - Sem configuração adicional

3. **Variáveis de Ambiente**
   \`\`\`env
   DATABASE_URL=sua-url-do-neon
   JWT_SECRET=seu-jwt-secret
   \`\`\`

### **Outras Opções**
- **Railway**: Deploy completo com banco
- **Netlify**: Frontend + Neon
- **DigitalOcean**: App Platform

## 📊 Métricas e Analytics

### **Dashboard Administrativo**
- 📈 **Vendas**: Gráficos de vendas mensais
- 👥 **Usuários**: Crescimento de usuários
- 🎫 **Eventos**: Performance por evento
- 💰 **Receita**: Análise financeira
- 🏆 **Top Eventos**: Mais populares

### **Relatórios Disponíveis**
- Vendas por período
- Ocupação de eventos
- Performance de cupons
- Análise de conversão
- Relatório de participantes

## 🔒 Segurança

### **Implementado**
- ✅ **JWT Authentication** com expiração
- ✅ **Hash de senhas** com salt
- ✅ **Middleware de proteção** de rotas
- ✅ **Validação de dados** em todas as APIs
- ✅ **SQL Injection** prevenção com queries parametrizadas
- ✅ **CORS** configurado adequadamente

### **Recomendações para Produção**
- [ ] Usar `bcrypt` real para hash de senhas
- [ ] Implementar rate limiting
- [ ] Configurar HTTPS obrigatório
- [ ] Adicionar logs de auditoria
- [ ] Implementar 2FA para admins

## 🤝 Contribuição

### **Como Contribuir**

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Desenvolva** e teste suas mudanças
5. **Commit** seguindo padrões convencionais
6. **Push** e abra um **Pull Request**

### **Padrões de Commit**
\`\`\`
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
\`\`\`

### **Desenvolvimento Local**
\`\`\`bash
# Setup completo
git clone [seu-fork]
npm install
cp .env.example .env.local
# Configure DATABASE_URL
npm run dev
\`\`\`

## 📝 Roadmap

### **🔄 Próximas Versões**

#### **v2.0 - Integrações**
- [ ] Gateway de pagamento real (Stripe/PagSeguro)
- [ ] Sistema de notificações (email/SMS)
- [ ] Upload de imagens (Cloudinary)
- [ ] Relatórios em PDF

#### **v2.1 - Mobile**
- [ ] App React Native
- [ ] Scanner offline
- [ ] Push notifications
- [ ] Sincronização automática

#### **v2.2 - Avançado**
- [ ] Multi-tenancy (múltiplas igrejas)
- [ ] IA para recomendações
- [ ] Chat de suporte
- [ ] Integração com redes sociais

### **🎯 Funcionalidades Planejadas**
- **Streaming**: Integração com YouTube/Facebook Live
- **Certificados**: Geração automática de certificados
- **Marketplace**: Eventos de diferentes organizações
- **Afiliados**: Sistema de indicações
- **Multi-idiomas**: Suporte i18n

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte e Contato

### **🆘 Precisa de Ajuda?**
- **📧 Email**: contato@igrejivideira.com
- **🐛 Issues**: [GitHub Issues](https://github.com/seu-usuario/igreja-videira/issues)
- **💬 Discussões**: [GitHub Discussions](https://github.com/seu-usuario/igreja-videira/discussions)

### **📚 Documentação**
- **📖 Wiki**: [Documentação Completa](https://github.com/seu-usuario/igreja-videira/wiki)
- **🔌 API**: [Documentação da API](docs/API.md)
- **🚀 Deploy**: [Guia de Deploy](docs/DEPLOYMENT.md)

### **🌐 Links Úteis**
- **Demo**: [https://igreja-videira.vercel.app](https://igreja-videira.vercel.app)
- **Neon**: [https://neon.tech](https://neon.tech)
- **Next.js**: [https://nextjs.org](https://nextjs.org)

## 🙏 Agradecimentos

- **[Neon](https://neon.tech/)** pelo PostgreSQL serverless gratuito
- **[Vercel](https://vercel.com/)** pela plataforma de deploy
- **[shadcn/ui](https://ui.shadcn.com/)** pelos componentes elegantes
- **[Tailwind CSS](https://tailwindcss.com/)** pelo framework CSS
- **Comunidade Open Source** pelo apoio e inspiração

---

<div align="center">
  <p><strong>🚀 Sistema completo e funcional!</strong></p>
  <p>Frontend + Backend + Banco de dados + APIs REST</p>
  <p>Feito com ❤️ para conectar comunidades através da tecnologia</p>
  
  <br>
  
  **⭐ Se este projeto foi útil, deixe uma estrela!**
</div>
\`\`\`
