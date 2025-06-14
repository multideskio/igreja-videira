-- Dados iniciais para o sistema Igreja Videira

-- Inserir igreja principal
INSERT INTO churches (id, name, description, address, phone, email, website, pastor) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Igreja Videira - Sede', 'Igreja cristã focada no crescimento espiritual e comunidade', 'Av. Principal, 1000 - Centro', '(11) 99999-9999', 'contato@igrejivideira.com', 'https://igrejivideira.com', 'Pastor João Silva')
ON CONFLICT (id) DO NOTHING;

-- Inserir usuários de teste
INSERT INTO users (id, name, email, password_hash, phone, church_id, role, church_data) VALUES 
-- Super Admin
('550e8400-e29b-41d4-a716-446655440001', 'Super Administrador', 'superadmin@igrejivideira.com', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kO', '(11) 99999-0001', NULL, 'superadmin', '{}'),

-- Admin da Igreja
('550e8400-e29b-41d4-a716-446655440002', 'Administrador', 'admin@igrejivideira.com', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kO', '(11) 99999-0002', '550e8400-e29b-41d4-a716-446655440000', 'admin', '{"celula": "Célula Central", "discipulador": "Pastor João", "regiao": "Centro"}'),

-- Scanner
('550e8400-e29b-41d4-a716-446655440003', 'Operador Scanner', 'scanner@igrejivideira.com', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kO', '(11) 99999-0003', '550e8400-e29b-41d4-a716-446655440000', 'scanner', '{"celula": "Célula Norte", "discipulador": "Líder Maria", "regiao": "Norte"}'),

-- Usuário comum
('550e8400-e29b-41d4-a716-446655440004', 'João Silva', 'usuario@exemplo.com', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kO', '(11) 99999-0004', NULL, 'user', '{"celula": "Célula Sul", "discipulador": "Líder Pedro", "regiao": "Sul"}')
ON CONFLICT (email) DO NOTHING;

-- Inserir eventos de exemplo
INSERT INTO events (id, church_id, title, description, event_date, event_time, location, address, is_free, capacity, status, custom_fields, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Conferência Anual de Adoração', 'Uma noite de adoração e comunhão com os melhores ministérios de louvor da região. Venha participar deste momento especial de conexão com Deus através da música e adoração.', '2024-06-15 19:00:00', '19:00', 'Igreja Videira - Sede', 'Av. Principal, 1000 - Centro', false, 300, 'active', '[
    {"id": "1", "name": "Célula", "type": "text", "required": true},
    {"id": "2", "name": "Discipulador", "type": "text", "required": true},
    {"id": "3", "name": "Região", "type": "text", "required": true}
]', '550e8400-e29b-41d4-a716-446655440002'),

('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Retiro de Jovens 2024', 'Fim de semana especial para jovens com palestras, dinâmicas e muito crescimento espiritual.', '2024-07-20 08:00:00', '08:00', 'Chácara Esperança', 'Estrada Rural, km 15', false, 150, 'scheduled', '[
    {"id": "1", "name": "Célula", "type": "text", "required": true},
    {"id": "2", "name": "Idade", "type": "number", "required": true},
    {"id": "3", "name": "Responsável", "type": "text", "required": true}
]', '550e8400-e29b-41d4-a716-446655440002'),

('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'Culto de Ação de Graças', 'Culto especial de gratidão com participação de toda a família.', '2024-05-30 18:00:00', '18:00', 'Igreja Videira - Sede', 'Av. Principal, 1000 - Centro', true, 500, 'completed', '[
    {"id": "1", "name": "Célula", "type": "text", "required": true}
]', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Inserir variações de ingressos
INSERT INTO ticket_variations (id, event_id, name, description, price, quantity, sold) VALUES 
-- Conferência de Adoração
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Ingresso Padrão', 'Acesso a todas as áreas comuns do evento', 75.00, 200, 145),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440010', 'Ingresso VIP', 'Acesso a todas as áreas + área VIP com coffee break exclusivo', 150.00, 50, 35),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440010', 'Ingresso Família', 'Pacote para 4 pessoas com desconto especial', 250.00, 50, 15),

-- Retiro de Jovens
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440011', 'Ingresso Completo', 'Inclui hospedagem, alimentação e todas as atividades', 180.00, 150, 0),

-- Culto de Ação de Graças (gratuito)
('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440012', 'Entrada Gratuita', 'Acesso livre ao culto', 0.00, 500, 320)
ON CONFLICT (id) DO NOTHING;

-- Inserir cupons de exemplo
INSERT INTO coupons (id, church_id, code, type, value, start_date, end_date, usage_limit, usage_count, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 'WELCOME20', 'percentage', 20.00, '2024-01-01', '2024-12-31', 100, 15, '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', 'VIDEIRA50', 'fixed', 50.00, '2024-01-01', '2024-12-31', 50, 8, '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440000', 'VIP10', 'percentage', 10.00, '2024-01-01', '2024-12-31', 200, 25, '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (church_id, code) DO NOTHING;

-- Atualizar contadores dos eventos
UPDATE events SET 
    tickets_sold = (SELECT COALESCE(SUM(sold), 0) FROM ticket_variations WHERE event_id = events.id),
    revenue = (SELECT COALESCE(SUM(price * sold), 0) FROM ticket_variations WHERE event_id = events.id)
WHERE id IN ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440012');
