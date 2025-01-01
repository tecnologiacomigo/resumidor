import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpyvocowszyrwagrudqr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1weXZvY293c3p5cndhZ3J1ZHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTUwNjY2MywiZXhwIjoyMDUxMDgyNjYzfQ.8uZj-sraiPzky6l738PFMgkirFmMS8flmvfD6MPck5Q'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const getContactAnalytics = async (phone) => {
  const { data, error } = await supabase
    .rpc('analyze_conversation', { contact_phone: phone })
  
  if (error) throw error
  return data
}

export const getContactWithHistory = async (phone) => {
  if (phone) {
    const { data, error } = await supabase
      .rpc('get_contact_history', { contact_phone: phone })
    
    if (error) throw error
    return data
  } else {
    // Se não houver telefone, retorna lista de contatos recentes
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('last_interaction', { ascending: false })
      .limit(10)
    
    if (error) throw error
    return { data }
  }
}

export const updateContactData = async (phone, contactData) => {
  const { data, error } = await supabase
    .rpc('update_contact', {
      contact_phone: phone,
      contact_data: contactData
    })
  
  if (error) throw error
  return data
}

export const saveMessages = async (phone, messages) => {
  const { error } = await supabase
    .from('messages')
    .insert(
      messages.map(msg => ({
        phone,
        message: msg.text,
        timestamp: new Date(msg.timestamp * 1000),
        sender: msg.sender,
        from_me: msg.fromMe,
        metadata: msg
      }))
    )
  
  if (error) throw error
}
