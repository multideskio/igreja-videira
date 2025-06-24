# Especificação do Backend - Igreja Videira

## Visão Geral

Este documento especifica como deve ser implementado o backend para o sistema Igreja Videira, garantindo compatibilidade total com o frontend existente.

## Tecnologias Recomendadas

### Opção 1: Python (Recomendado)
- **FastAPI**: Framework web moderno e rápido
- **SQLAlchemy**: ORM para PostgreSQL
- **Pydantic**: Validação de dados
- **JWT**: Autenticação stateless
- **Alembic**: Migrations do banco

### Opção 2: Node.js (Alternativa)
- **Express.js**: Framework web
- **Prisma**: ORM moderno
- **Joi/Zod**: Validação de dados
- **JWT**: Autenticação
- **PostgreSQL**: Banco de dados

## Estrutura do Banco de Dados

### Tabelas Principais

#### 1. churches (Igrejas)
- id: UUID (PK)
- name: VARCHAR(255)
- description: TEXT
- address: TEXT
- phone: VARCHAR(20)
- email: VARCHAR(255)
- website: VARCHAR(255)
- pastor: VARCHAR(255)
- logo: TEXT
- settings: JSONB
- status: VARCHAR(20)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

#### 2. users (Usuários)
- id: UUID (PK)
- church_id: UUID (FK)
- name: VARCHAR(255)
- email: VARCHAR(255) UNIQUE
- password_hash: VARCHAR(255)
- phone: VARCHAR(20)
- address: TEXT
- role: ENUM('superadmin', 'admin', 'scanner', 'user')
- church_data: JSONB
- avatar: TEXT
- status: VARCHAR(20)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- last_login: TIMESTAMP

#### 3. events (Eventos)
- id: UUID (PK)
- church_id: UUID (FK)
- title: VARCHAR(255)
- description: TEXT
- date: TIMESTAMP
- time: VARCHAR(10)
- location: VARCHAR(255)
- address: TEXT
- image: TEXT
- is_free: BOOLEAN
- allow_multiple_qr_code: BOOLEAN
- max_tickets_per_purchase: INTEGER
- is_featured: BOOLEAN
- require_registration: BOOLEAN
- sales_start_date: TIMESTAMP
- sales_end_date: TIMESTAMP
- status: VARCHAR(20)
- capacity: INTEGER
- tickets_sold: INTEGER
- revenue: DECIMAL(10,2)
- custom_fields: JSONB
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- created_by: UUID (FK)

#### 4. ticket_variations (Variações de Ingresso)
- id: UUID (PK)
- event_id: UUID (FK)
- name: VARCHAR(255)
- description: TEXT
- price: DECIMAL(10,2)
- quantity: INTEGER
- sold: INTEGER
- is_active: BOOLEAN
- start_date: TIMESTAMP
- end_date: TIMESTAMP
- created_at: TIMESTAMP

#### 5. purchases (Compras)
- id: UUID (PK)
- event_id: UUID (FK)
- church_id: UUID (FK)
- user_id: UUID (FK)
- quantity: INTEGER
- total_amount: DECIMAL(10,2)
- discount: DECIMAL(10,2)
- coupon_code: VARCHAR(50)
- qr_code_option: VARCHAR(20)
- payment_method: VARCHAR(20)
- payment_status: VARCHAR(20)
- payment_id: VARCHAR(255)
- participants: JSONB
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

#### 6. coupons (Cupons)
- id: UUID (PK)
- church_id: UUID (FK)
- code: VARCHAR(50) UNIQUE
- type: VARCHAR(20)
- value: DECIMAL(10,2)
- start_date: TIMESTAMP
- end_date: TIMESTAMP
- usage_limit: INTEGER
- usage_count: INTEGER
- applicable_events: VARCHAR(20)
- specific_event_ids: JSONB
- is_active: BOOLEAN
- created_at: TIMESTAMP
- created_by: UUID (FK)

#### 7. qr_scans (Histórico de Scans)
- id: UUID (PK)
- event_id: UUID (FK)
- church_id: UUID (FK)
- purchase_id: UUID (FK)
- participant_index: INTEGER
- scanned_by: UUID (FK)
- scanned_at: TIMESTAMP
- location: VARCHAR(255)
- notes: TEXT

## APIs REST Necessárias

### Base URL
- Desenvolvimento: http://localhost:8000/api/v1
- Produção: https://api.igrejivideira.com/v1

### Autenticação

#### POST /auth/login
Realiza login do usuário

Request:
{
  "email": "admin@igrejivideira.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Administrador",
      "email": "admin@igrejivideira.com",
      "role": "admin"
    },
    "access_token": "jwt_token",
    "token_type": "bearer"
  }
}

#### POST /auth/register
Registra novo usuário

Request:
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "phone": "(11) 99999-9999",
  "church_data": {
    "celula": "Célula Norte",
    "discipulador": "Maria Santos",
    "regiao": "Zona Norte"
  }
}

### Eventos

#### GET /events
Lista eventos públicos

Query Parameters:
- page: Número da página
- limit: Itens por página
- search: Busca por título
- featured: Apenas destacados
- church_id: Filtro por igreja

Response:
{
  "success": true,
  "data": {
    "events": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}

#### GET /events/{event_id}
Detalhes do evento

#### POST /events (Admin)
Criar evento

#### PUT /events/{event_id} (Admin)
Atualizar evento

#### DELETE /events/{event_id} (Admin)
Deletar evento

### Compras

#### POST /purchases
Realizar compra

Request:
{
  "event_id": "uuid",
  "quantity": 2,
  "qr_code_option": "multiple",
  "coupon_code": "WELCOME20",
  "payment_method": "pix",
  "participants": [
    {
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "ticket_variation_id": "uuid",
      "custom_fields_data": {
        "celula": "Célula Norte"
      }
    }
  ]
}

#### GET /purchases/my-purchases
Listar compras do usuário

### Cupons

#### POST /coupons/validate
Validar cupom

Request:
{
  "code": "WELCOME20",
  "event_id": "uuid",
  "total_amount": 150.00
}

#### GET /coupons (Admin)
Listar cupons

#### POST /coupons (Admin)
Criar cupom

### Dashboard Admin

#### GET /admin/dashboard
Métricas do dashboard

Response:
{
  "success": true,
  "data": {
    "metrics": {
      "total_events": 15,
      "total_tickets": 1250,
      "total_revenue": 87500.00,
      "total_users": 450
    },
    "charts": {
      "monthly_sales": [...],
      "event_popularity": [...],
      "user_growth": [...]
    }
  }
}

### Scanner

#### POST /scanner/validate-qr
Validar QR Code

Request:
{
  "qr_code": "unique-code-123",
  "event_id": "uuid"
}

#### POST /scanner/mark-as-used
Marcar como usado

## Implementação Python/FastAPI

### Estrutura do Projeto
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── api/
│   ├── core/
│   └── utils/
├── alembic/
├── requirements.txt
└── .env

### Dependências Principais
- fastapi==0.104.1
- uvicorn[standard]==0.24.0
- sqlalchemy==2.0.23
- psycopg2-binary==2.9.9
- python-jose[cryptography]==3.3.0
- passlib[bcrypt]==1.7.4
- pydantic[email]==2.5.0
- qrcode[pil]==7.4.2

### Configuração do Banco
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

## Validações e Regras de Negócio

### Compra de Ingressos
1. Verificar se evento está ativo
2. Verificar disponibilidade
3. Validar dados dos participantes
4. Aplicar cupons de desconto
5. Gerar QR codes únicos
6. Processar pagamento
7. Enviar confirmação por email

### Validação de Cupom
1. Verificar se existe e está ativo
2. Verificar período de validade
3. Verificar limite de uso
4. Verificar aplicabilidade ao evento
5. Calcular desconto

### Scanner QR
1. Validar formato do QR code
2. Verificar se existe no banco
3. Verificar se não foi usado
4. Verificar se pertence ao evento
5. Marcar como usado
6. Registrar histórico

## Autenticação e Segurança

### JWT Implementation
- Access token com expiração de 30 minutos
- Refresh token com expiração de 7 dias
- Hash de senhas com bcrypt
- Middleware de autenticação em rotas protegidas

### Níveis de Acesso
- superadmin: Acesso total
- admin: Gestão da igreja
- scanner: Scanner QR + usuário
- user: Compra de ingressos

### Rate Limiting
- Usuários não autenticados: 100 req/hora
- Usuários comuns: 1000 req/hora
- Admins: 5000 req/hora

## Testes

### Estrutura
tests/
├── test_auth.py
├── test_events.py
├── test_purchases.py
├── test_coupons.py
└── test_scanner.py

### Cobertura Mínima
- Autenticação: 95%
- CRUD de eventos: 90%
- Sistema de compras: 95%
- Validações: 100%

## Deploy

### Docker
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

### Variáveis de Ambiente
- DATABASE_URL
- SECRET_KEY
- SMTP_HOST
- SMTP_USER
- SMTP_PASSWORD

## Monitoramento

### Logs
- Estrutura JSON
- Log de operações críticas
- Monitoramento de erros

### Métricas
- Tempo de resposta
- Taxa de erro
- Uso de recursos
- Usuários ativos

## Conclusão

Esta especificação garante que o backend seja totalmente compatível com o frontend existente. A implementação deve seguir as especificações de API, validações e regras de negócio descritas.

Para implementação completa:
1. Setup do projeto
2. Configuração do banco
3. Implementação das APIs
4. Testes automatizados
5. Deploy em produção

O resultado será um backend robusto, escalável e seguro para o sistema Igreja Videira.
