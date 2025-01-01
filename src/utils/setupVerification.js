import { supabase } from '../services/supabase'

export const verifyDatabaseSetup = async () => {
  try {
    // Test contacts table
    const { data: contactsTest, error: contactsError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)
    
    if (contactsError) throw new Error(`Contacts table error: ${contactsError.message}`)

    // Test messages table
    const { data: messagesTest, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .limit(1)

    if (messagesError) throw new Error(`Messages table error: ${messagesError.message}`)

    // Test functions
    const { data: analyticsTest, error: analyticsError } = await supabase
      .rpc('analyze_conversation', { contact_phone: '1234567890' })

    if (analyticsError) throw new Error(`Analytics function error: ${analyticsError.message}`)

    return {
      success: true,
      tables: {
        contacts: !!contactsTest,
        messages: !!messagesTest
      },
      functions: {
        analytics: !!analyticsTest
      }
    }
  } catch (error) {
    console.error('Setup verification failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
