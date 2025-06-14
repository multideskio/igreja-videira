# Guia de Deploy

Este documento fornece instruções detalhadas para fazer deploy da aplicação Igreja Videira.

## 🚀 Opções de Deploy

### 1. Vercel (Recomendado)

A Vercel é a plataforma recomendada para deploy de aplicações Next.js.

#### Passo a passo:

1. **Conecte seu repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o repositório `igreja-videira`

2. **Configure as variáveis de ambiente**
   \`\`\`bash
   NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
   NEXT_PUBLIC_APP_NAME="Igreja Videira"
   \`\`\`

3. **Deploy automático**
   - A cada push na branch `main`, o deploy será automático
   - Preview deployments para outras branches

#### Configurações avançadas:
\`\`\`json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
\`\`\`

### 2. Netlify

#### Passo a passo:

1. **Conecte o repositório**
   - Acesse [netlify.com](https://netlify.com)
   - Conecte com GitHub
   - Selecione o repositório

2. **Configurações de build**
   \`\`\`
   Build command: npm run build
   Publish directory: .next
   \`\`\`

3. **Variáveis de ambiente**
   - Configure no painel da Netlify
   - Seção: Site settings > Environment variables

### 3. Railway

#### Passo a passo:

1. **Conecte o repositório**
   - Acesse [railway.app](https://railway.app)
   - Conecte com GitHub
   - Deploy from GitHub repo

2. **Configurações automáticas**
   - Railway detecta Next.js automaticamente
   - Build e deploy automáticos

### 4. DigitalOcean App Platform

#### Passo a passo:

1. **Crie uma nova app**
   - Acesse DigitalOcean App Platform
   - Conecte com GitHub
   - Selecione o repositório

2. **Configurações**
   \`\`\`
   Build Command: npm run build
   Run Command: npm start
   \`\`\`

## 🔧 Configurações de Produção

### Variáveis de Ambiente

Crie um arquivo `.env.production` com:

\`\`\`env
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
NEXT_PUBLIC_APP_NAME="Igreja Videira"

# Database
DATABASE_URL=sua-url-do-banco

# Authentication
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=seu-secret-super-seguro

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app

# Payment
STRIPE_PUBLIC_KEY=pk_live_sua_chave_publica
STRIPE_SECRET_KEY=sk_live_sua_chave_secreta
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret

# Storage
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
\`\`\`

### Otimizações de Performance

1. **Imagens**
   - Use Next.js Image component
   - Configure domínios externos no `next.config.js`

2. **Bundle Analysis**
   \`\`\`bash
   npm install --save-dev @next/bundle-analyzer
   \`\`\`

3. **Caching**
   - Configure headers de cache
   - Use ISR (Incremental Static Regeneration)

### Monitoramento

1. **Vercel Analytics**
   \`\`\`bash
   npm install @vercel/analytics
   \`\`\`

2. **Sentry (Error Tracking)**
   \`\`\`bash
   npm install @sentry/nextjs
   \`\`\`

3. **Google Analytics**
   - Configure no `layout.tsx`

## 🔒 Segurança

### Headers de Segurança

Configure no `next.config.js`:

\`\`\`javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
\`\`\`

### SSL/TLS

- Use HTTPS em produção
- Configure certificados SSL
- Redirecione HTTP para HTTPS

## 📊 Monitoramento Pós-Deploy

### Métricas Importantes

1. **Performance**
   - Core Web Vitals
   - Tempo de carregamento
   - First Contentful Paint

2. **Disponibilidade**
   - Uptime monitoring
   - Health checks
   - Error rates

3. **Uso**
   - Usuários ativos
   - Páginas mais visitadas
   - Conversões

### Ferramentas Recomendadas

- **Vercel Analytics**: Métricas de performance
- **Google Analytics**: Análise de uso
- **Sentry**: Monitoramento de erros
- **Uptime Robot**: Monitoramento de disponibilidade

## 🔄 CI/CD

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm run test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
\`\`\`

## 🆘 Troubleshooting

### Problemas Comuns

1. **Build Failures**
   - Verifique dependências
   - Confirme variáveis de ambiente
   - Analise logs de build

2. **Runtime Errors**
   - Configure error boundaries
   - Implemente logging adequado
   - Use ferramentas de monitoramento

3. **Performance Issues**
   - Analise bundle size
   - Otimize imagens
   - Configure caching

### Logs e Debugging

- Use `console.log` com moderação
- Configure logging estruturado
- Implemente health checks

## 📞 Suporte

Para problemas de deploy:
- Abra uma issue no GitHub
- Consulte a documentação da plataforma
- Entre em contato: contato@igrejavideira.com
