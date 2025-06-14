# Documentação da API - Igreja Videira

Esta documentação descreve as APIs REST implementadas no sistema Igreja Videira.

## Base URL

Desenvolvimento: http://localhost:3000/api
Produção: https://igrejavideira.com/api

## Autenticação

Todas as rotas protegidas requerem um token JWT no header:

Authorization: Bearer <token>

## Níveis de Acesso

| Role | Descrição | Acesso |
|------|-----------|--------|
| user | Usuário comum | Comprar ingressos, ver próprios dados |
| scanner | Operador de scanner | Scanner QR + acesso de usuário |
| admin | Administrador da igreja | Gestão completa da igreja |
| superadmin | Super administrador | Acesso total ao sistema |

## Endpoints Disponíveis

### Autenticação

#### POST /api/auth/login
Realiza login do usuário.

Request Body:
{
  "email": "admin@igrejivideira.com",
  "password": "admin123"
}

Response (200):
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Administrador",
      "email": "admin@igrejivideira.com",
      "role": "admin",
      "churchId": "church-uuid"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Errors:
- 400: Email ou senha inválidos
- 401: Credenciais incorretas

#### POST /api/auth/register
Registra novo usuário.

Request Body:
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "phone": "(11) 99999-9999",
  "churchData": {
    "celula": "Célula Norte",
    "discipulador": "Maria Santos",
    "regiao": "Zona Norte"
  }
}

Response (201):
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}

### Eventos

#### GET /api/events
Lista eventos públicos com paginação e filtros.

Query Parameters:
- page: Número da página (padrão: 1)
- limit: Itens por página (padrão: 10, máx: 50)
- search: Busca por título
- status: Filtro por status (active, scheduled)
- churchId: Filtro por igreja
- featured: Apenas eventos em destaque (true/false)

Example Request:
GET /api/events?page=1&limit=10&search=conferencia&featured=true

Response (200):
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "uuid",
        "title": "Conferência Anual de Adoração",
        "description": "Uma noite especial...",
        "eventDate": "2024-06-15T19:00:00Z",
        "location": "Igreja Videira - Sede",
        "isFree": false,
        "capacity": 300,
        "ticketsSold": 145,
        "ticketVariations": [
          {
            "id": "uuid",
            "name": "Ingresso Padrão",
            "price": 75.00,
            "quantity": 200,
            "sold": 145
          }
        ],
        "church": {
          "id": "uuid",
          "name": "Igreja Videira - Sede"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}

#### GET /api/events/[id]
Obtém detalhes completos de um evento específico.

Response (200):
{
  "success": true,
  "data": {
    "event": {
      "id": "uuid",
      "title": "Conferência Anual de Adoração",
      "description": "Descrição completa do evento...",
      "eventDate": "2024-06-15T19:00:00Z",
      "eventTime": "19:00",
      "location": "Igreja Videira - Sede",
      "address": "Av. Principal, 1000 - Centro",
      "image": "https://example.com/image.jpg",
      "isFree": false,
      "capacity": 300,
      "ticketsSold": 145,
      "revenue": 18750.00,
      "customFields": [
        {
          "id": "1",
          "name": "Célula",
          "type": "text",
          "required": true
        }
      ],
      "ticketVariations": [
        {
          "id": "uuid",
          "name": "Ingresso Padrão",
          "description": "Acesso a todas as áreas",
          "price": 75.00,
          "quantity": 200,
          "sold": 145,
          "isActive": true
        }
      ],
      "church": {
        "id": "uuid",
        "name": "Igreja Videira - Sede",
        "address": "Av. Principal, 1000"
      }
    }
  }
}

Errors:
- 404: Evento não encontrado

#### POST /api/events (Admin apenas)
Cria novo evento.

Headers:
Authorization: Bearer <admin_token>

Request Body:
{
  "title": "Novo Evento",
  "description": "Descrição do evento",
  "eventDate": "2024-07-15T19:00:00Z",
  "eventTime": "19:00",
  "location": "Local do Evento",
  "address": "Endereço completo",
  "isFree": false,
  "capacity": 200,
  "customFields": [
    {
      "name": "Célula",
      "type": "text",
      "required": true
    }
  ],
  "ticketVariations": [
    {
      "name": "Ingresso Padrão",
      "price": 50.00,
      "quantity": 200
    }
  ]
}

Response (201):
{
  "success": true,
  "data": {
    "event": {
      "id": "new-uuid",
      "title": "Novo Evento",
      "status": "draft",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}

### Compras

#### POST /api/purchases (Autenticado)
Realiza compra de ingressos.

Headers:
Authorization: Bearer <user_token>

Request Body:
{
  "eventId": "event-uuid",
  "quantity": 2,
  "qrCodeOption": "multiple",
  "couponCode": "WELCOME20",
  "paymentMethod": "pix",
  "participants": [
    {
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "ticketVariationId": "variation-uuid",
      "customFieldsData": {
        "celula": "Célula Norte",
        "discipulador": "Maria Santos"
      }
    },
    {
      "name": "Maria Silva",
      "email": "maria@email.com",
      "phone": "(11) 99999-9998",
      "ticketVariationId": "variation-uuid",
      "customFieldsData": {
        "celula": "Célula Norte",
        "discipulador": "Maria Santos"
      }
    }
  ]
}

Response (201):
{
  "success": true,
  "data": {
    "purchase": {
      "id": "purchase-uuid",
      "eventId": "event-uuid",
      "quantity": 2,
      "totalAmount": 120.00,
      "discount": 30.00,
      "finalAmount": 90.00,
      "couponCode": "WELCOME20",
      "paymentMethod": "pix",
      "paymentStatus": "pending",
      "qrCodeOption": "multiple",
      "participants": [
        {
          "name": "João Silva",
          "qrCode": "unique-qr-code-1",
          "isUsed": false
        },
        {
          "name": "Maria Silva",
          "qrCode": "unique-qr-code-2",
          "isUsed": false
        }
      ],
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}

Errors:
- 400: Dados inválidos
- 404: Evento não encontrado
- 409: Ingressos esgotados

#### GET /api/purchases (Autenticado)
Lista compras do usuário logado.

Headers:
Authorization: Bearer <user_token>

Query Parameters:
- status: Filtro por status (pending, confirmed, failed)
- eventId: Filtro por evento

Response (200):
{
  "success": true,
  "data": {
    "purchases": [
      {
        "id": "uuid",
        "event": {
          "id": "uuid",
          "title": "Conferência de Adoração",
          "eventDate": "2024-06-15T19:00:00Z"
        },
        "quantity": 2,
        "totalAmount": 90.00,
        "paymentStatus": "confirmed",
        "participants": [
          {
            "name": "João Silva",
            "qrCode": "qr-code-1",
            "isUsed": false
          }
        ],
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ]
  }
}

### Cupons

#### POST /api/coupons/validate
Valida cupom de desconto.

Request Body:
{
  "code": "WELCOME20",
  "eventId": "event-uuid",
  "totalAmount": 150.00
}

Response (200):
{
  "success": true,
  "data": {
    "coupon": {
      "id": "uuid",
      "code": "WELCOME20",
      "type": "percentage",
      "value": 20.00,
      "discount": 30.00,
      "finalAmount": 120.00,
      "isValid": true
    }
  }
}

Errors:
- 404: Cupom não encontrado
- 400: Cupom expirado ou inválido
- 409: Limite de uso excedido

### Dashboard Admin

#### GET /api/admin/dashboard (Admin apenas)
Obtém métricas do dashboard administrativo.

Headers:
Authorization: Bearer <admin_token>

Response (200):
{
  "success": true,
  "data": {
    "metrics": {
      "totalEvents": 15,
      "totalTickets": 1250,
      "totalRevenue": 87500.00,
      "totalUsers": 450
    },
    "charts": {
      "monthlySales": [
        {
          "month": "Jan",
          "sales": 12500.00,
          "tickets": 125
        },
        {
          "month": "Feb",
          "sales": 18750.00,
          "tickets": 187
        }
      ],
      "eventPopularity": [
        {
          "name": "Conferência de Adoração",
          "tickets": 145,
          "percentage": 48.3
        }
      ],
      "userGrowth": [
        {
          "month": "Jan",
          "users": 350
        },
        {
          "month": "Feb",
          "users": 450
        }
      ]
    },
    "recentEvents": [
      {
        "id": "uuid",
        "title": "Conferência de Adoração",
        "ticketsSold": 145,
        "capacity": 300,
        "revenue": 18750.00,
        "occupancy": 48.3
      }
    ]
  }
}

## Códigos de Status HTTP

| Código | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos na requisição |
| 401 | Unauthorized | Token inválido ou ausente |
| 403 | Forbidden | Sem permissão para acessar |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Conflito (ex: ingresso esgotado) |
| 422 | Unprocessable Entity | Dados válidos mas não processáveis |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Erro interno do servidor |

## Rate Limiting

| Tipo de Usuário | Limite | Janela |
|------------------|--------|--------|
| Não autenticado | 100 requests | 1 hora |
| Usuário comum | 1000 requests | 1 hora |
| Admin/Scanner | 5000 requests | 1 hora |
| Super Admin | 10000 requests | 1 hora |

## Exemplos de Uso

### JavaScript/Fetch

// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@igrejivideira.com',
    password: 'admin123'
  })
});

const { data } = await loginResponse.json();
const token = data.token;

// Usar token nas próximas requisições
const eventsResponse = await fetch('/api/events', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const events = await eventsResponse.json();

### cURL

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@igrejivideira.com","password":"admin123"}'

# Listar eventos (com token)
curl -X GET http://localhost:3000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Criar evento (admin)
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo Evento",
    "description": "Descrição",
    "eventDate": "2024-07-15T19:00:00Z",
    "location": "Local",
    "capacity": 200
  }'

### Python/Requests

import requests

# Login
login_data = {
    "email": "admin@igrejivideira.com",
    "password": "admin123"
}

response = requests.post(
    "http://localhost:3000/api/auth/login",
    json=login_data
)

token = response.json()["data"]["token"]

# Listar eventos
headers = {"Authorization": f"Bearer {token}"}
events = requests.get(
    "http://localhost:3000/api/events",
    headers=headers
)

print(events.json())

## Status de Implementação

### Implementado
- [x] Autenticação (login/register)
- [x] CRUD de eventos (listar/detalhes)
- [x] Sistema de compras
- [x] Validação de cupons
- [x] Dashboard administrativo
- [x] Middleware de autenticação

### Em Desenvolvimento
- [ ] CRUD completo de eventos (admin)
- [ ] Gestão de usuários (admin)
- [ ] Sistema de scanner QR
- [ ] Upload de imagens
- [ ] Webhooks de pagamento

### Planejado
- [ ] Notificações push
- [ ] Relatórios avançados
- [ ] Sistema de logs
- [ ] Cache Redis
- [ ] WebSockets para real-time

## Segurança

### Implementado
- JWT Authentication com expiração
- Validação de dados em todas as rotas
- SQL Injection prevenção
- CORS configurado
- Rate Limiting básico

### Recomendações
- [ ] Implementar refresh tokens
- [ ] Adicionar 2FA para admins
- [ ] Logs de auditoria
- [ ] Criptografia de dados sensíveis
- [ ] Validação de CSP headers

## Suporte

Para dúvidas sobre a API:
- Email: dev@igrejivideira.com
- Issues: GitHub Issues
- Docs: Documentação Completa

API REST completa e funcional!
