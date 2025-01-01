import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Button,
  useToast,
  VStack
} from '@chakra-ui/react'
import { FaSearch, FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'

function SearchContact({ onSearch, loading }) {
  const [phone, setPhone] = useState('')
  const toast = useToast()

  const handleSearch = async () => {
    if (!phone) {
      toast({
        title: 'Digite um número',
        status: 'warning',
        duration: 2000
      })
      return
    }

    const formattedPhone = phone.replace(/\D/g, '')
    if (formattedPhone.length < 10) {
      toast({
        title: 'Número inválido',
        status: 'error',
        duration: 2000
      })
      return
    }

    onSearch(formattedPhone)
  }

  return (
    <VStack spacing={4}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaWhatsapp} color="gray.400" />
        </InputLeftElement>
        
        <Input
          placeholder="Digite o número..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleSearch}
            isLoading={loading}
            colorScheme="brand"
          >
            <Icon as={FaSearch} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}

export default SearchContact
