import { Box, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { verifyDatabaseSetup } from './utils/setupVerification'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { searchContact } from './services/api'
import { 
  updateContactData,
  getContactWithHistory
} from './services/supabase'

function App() {
  const [selectedContact, setSelectedContact] = useState(null)
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [setupVerified, setSetupVerified] = useState(false)
  const toast = useToast()

  useEffect(() => {
    verifySetup()
  }, [])

  const verifySetup = async () => {
    const result = await verifyDatabaseSetup()
    
    if (!result.success) {
      toast({
        title: 'Database Setup Error',
        description: result.error,
        status: 'error',
        duration: null,
        isClosable: true
      })
      return
    }

    setSetupVerified(true)
    loadRecentContacts()
  }

  const loadRecentContacts = async () => {
    if (!setupVerified) return

    try {
      const { data: contacts, error } = await getContactWithHistory()
      if (error) throw error
      setRecentContacts(contacts || [])
    } catch (error) {
      console.error('Error loading recent contacts:', error)
      toast({
        title: 'Error loading contacts',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleSearch = async (phone) => {
    setLoading(true)
    try {
      // Buscar contato na API do WhatsApp
      const contactData = await searchContact(phone)
      
      // Salvar/atualizar contato no Supabase
      await updateContactData(phone, {
        name: contactData.profile.name,
        status: contactData.profile.status,
        picture_url: contactData.profile.profilePicture,
        profile_data: contactData.profile
      })

      setSelectedContact(contactData)
      await loadRecentContacts() // Recarregar lista de contatos
    } catch (error) {
      console.error('Error searching contact:', error)
      toast({
        title: 'Error searching contact',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  if (!setupVerified) {
    return (
      <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
        Verificando configuração do banco de dados...
      </Box>
    )
  }

  return (
    <Box display="flex" h="100vh">
      <Sidebar 
        recentContacts={recentContacts} 
        onSelectContact={handleSearch}
      />
      <MainContent
        selectedContact={selectedContact}
        loading={loading}
        onSearch={handleSearch}
      />
    </Box>
  )
}

export default App
