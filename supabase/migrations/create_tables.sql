-- Habilita a extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Contatos
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR NOT NULL UNIQUE,
  name VARCHAR,
  status VARCHAR,
  picture_url TEXT,
  profile_data JSONB DEFAULT '{}',
  last_interaction TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar timestamp
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Mensagens
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR NOT NULL REFERENCES contacts(phone),
  message TEXT NOT NULL,
  message_type VARCHAR DEFAULT 'text',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  sender VARCHAR,
  from_me BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone);
CREATE INDEX IF NOT EXISTS idx_contacts_last_interaction ON contacts(last_interaction);
CREATE INDEX IF NOT EXISTS idx_messages_phone ON messages(phone);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);

-- View para análise de interações
CREATE OR REPLACE VIEW contact_interactions AS
SELECT 
  c.phone,
  c.name,
  COUNT(m.id) as total_messages,
  COUNT(CASE WHEN m.from_me THEN 1 END) as sent_messages,
  COUNT(CASE WHEN NOT m.from_me THEN 1 END) as received_messages,
  MAX(m.timestamp) as last_message_date,
  MIN(m.timestamp) as first_message_date
FROM contacts c
LEFT JOIN messages m ON c.phone = m.phone
GROUP BY c.phone, c.name;

-- Função para buscar histórico de contato
CREATE OR REPLACE FUNCTION get_contact_history(contact_phone VARCHAR)
RETURNS TABLE (
  contact_info jsonb,
  messages jsonb
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    row_to_json(c.*)::jsonb as contact_info,
    COALESCE(
      (
        SELECT jsonb_agg(row_to_json(m.*)::jsonb)
        FROM messages m
        WHERE m.phone = c.phone
        ORDER BY m.timestamp DESC
        LIMIT 100
      ),
      '[]'::jsonb
    ) as messages
  FROM contacts c
  WHERE c.phone = contact_phone;
END;
$$;

-- Função para atualizar contato
CREATE OR REPLACE FUNCTION update_contact(
  contact_phone VARCHAR,
  contact_data jsonb
)
RETURNS contacts
LANGUAGE plpgsql AS $$
DECLARE
  updated_contact contacts;
BEGIN
  UPDATE contacts
  SET
    name = COALESCE(contact_data->>'name', name),
    status = COALESCE(contact_data->>'status', status),
    picture_url = COALESCE(contact_data->>'picture_url', picture_url),
    profile_data = COALESCE(contact_data->'profile_data', profile_data),
    last_interaction = CURRENT_TIMESTAMP
  WHERE phone = contact_phone
  RETURNING * INTO updated_contact;

  IF NOT FOUND THEN
    INSERT INTO contacts (phone, name, status, picture_url, profile_data)
    VALUES (
      contact_phone,
      contact_data->>'name',
      contact_data->>'status',
      contact_data->>'picture_url',
      COALESCE(contact_data->'profile_data', '{}'::jsonb)
    )
    RETURNING * INTO updated_contact;
  END IF;

  RETURN updated_contact;
END;
$$;

-- Políticas de Segurança (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para contacts
CREATE POLICY "Enable read access for all users" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON contacts
  FOR UPDATE USING (true);

-- Políticas para messages
CREATE POLICY "Enable read access for all users" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON messages
  FOR INSERT WITH CHECK (true);

-- Função para análise de sentimento (placeholder)
CREATE OR REPLACE FUNCTION analyze_conversation(contact_phone VARCHAR)
RETURNS jsonb
LANGUAGE plpgsql AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_messages', COUNT(*),
    'avg_message_length', AVG(LENGTH(message)),
    'response_time_hours', 
      AVG(
        EXTRACT(EPOCH FROM (timestamp - LAG(timestamp) OVER (ORDER BY timestamp))) / 3600
      ),
    'most_active_hour', 
      MODE() WITHIN GROUP (ORDER BY EXTRACT(HOUR FROM timestamp))
  )
  INTO result
  FROM messages
  WHERE phone = contact_phone;
  
  RETURN result;
END;
$$;
