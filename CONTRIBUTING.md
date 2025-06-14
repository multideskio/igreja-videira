# Contribuindo para o Igreja Videira

Obrigado por considerar contribuir para o projeto Igreja Videira! Este documento fornece diretrizes para contribuições.

## 🤝 Como Contribuir

### Reportando Bugs

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/igreja-videira/issues)
2. Se não encontrar, crie uma nova issue com:
   - Título claro e descritivo
   - Passos para reproduzir o bug
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente (OS, browser, versão)

### Sugerindo Melhorias

1. Abra uma issue com a tag `enhancement`
2. Descreva claramente a melhoria proposta
3. Explique por que seria útil para o projeto
4. Inclua mockups ou exemplos se possível

### Contribuindo com Código

1. **Fork o repositório**
2. **Clone seu fork**
   \`\`\`bash
   git clone https://github.com/seu-usuario/igreja-videira.git
   \`\`\`
3. **Crie uma branch para sua feature**
   \`\`\`bash
   git checkout -b feature/nome-da-feature
   \`\`\`
4. **Faça suas alterações**
5. **Teste suas alterações**
   \`\`\`bash
   npm run dev
   npm run lint
   npm run type-check
   \`\`\`
6. **Commit suas mudanças**
   \`\`\`bash
   git commit -m "feat: adiciona nova funcionalidade"
   \`\`\`
7. **Push para sua branch**
   \`\`\`bash
   git push origin feature/nome-da-feature
   \`\`\`
8. **Abra um Pull Request**

## 📝 Padrões de Código

### Commits
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não afeta funcionalidade)
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Manutenção

### Código TypeScript
- Use TypeScript para todos os arquivos
- Defina tipos explícitos quando necessário
- Evite `any`, prefira tipos específicos
- Use interfaces para objetos complexos

### Componentes React
- Use componentes funcionais com hooks
- Nomeie componentes em PascalCase
- Use props tipadas com TypeScript
- Mantenha componentes pequenos e focados

### Estilização
- Use Tailwind CSS para estilização
- Prefira classes utilitárias
- Use componentes shadcn/ui quando possível
- Mantenha consistência visual

## 🧪 Testes

Antes de submeter um PR:

1. **Execute os lints**
   \`\`\`bash
   npm run lint
   \`\`\`

2. **Verifique os tipos**
   \`\`\`bash
   npm run type-check
   \`\`\`

3. **Teste a aplicação**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Teste diferentes cenários**
   - Diferentes tamanhos de tela
   - Diferentes navegadores
   - Diferentes roles de usuário

## 📋 Checklist do Pull Request

- [ ] Código segue os padrões do projeto
- [ ] Commits seguem o padrão Conventional Commits
- [ ] Código foi testado localmente
- [ ] Documentação foi atualizada (se necessário)
- [ ] Não há conflitos com a branch main
- [ ] PR tem título e descrição claros

## 🎯 Áreas que Precisam de Ajuda

- [ ] Testes automatizados (Jest, Cypress)
- [ ] Documentação adicional
- [ ] Melhorias de acessibilidade
- [ ] Otimizações de performance
- [ ] Internacionalização (i18n)
- [ ] Integração com APIs reais

## 💬 Dúvidas?

- Abra uma [Discussion](https://github.com/seu-usuario/igreja-videira/discussions)
- Entre em contato: contato@igrejavideira.com

Obrigado por contribuir! 🙏
