import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  useColorModeValue,
  Button,
  Avatar,
  Divider,
  Icon,
  Skeleton
} from '@chakra-ui/react'
import { FaWhatsapp, FaBrain, FaChartLine } from 'react-icons/fa'
import { format } from 'date-fns'

function ContactView({ contact, loading }) {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  if (loading) {
    return <Box p={6}><VStack spacing={4}>{Array(5).fill(0).map((_, i) => (
      <Skeleton key={i} height="100px" width="100%" />
    ))}</VStack></Box>
  }

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <HStack spacing={4}>
          <Avatar 
            size="xl" 
            name={contact?.name} 
            src={contact?.profilePicture} 
          />
          <Box>
            <Heading size="lg">{contact?.name || contact?.id}</Heading>
            <Text color="gray.500">{contact?.status}</Text>
            <Badge colorScheme="green" mt={2}>
              <Icon as={FaWhatsapp} mr={2} />
              {contact?.presence || 'Offline'}
            </Badge>
          </Box>
        </HStack>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>
            <Icon as={FaChartLine} mr={2} />
            Conversas
          </Heading>
          <VStack align="stretch" spacing={4}>
            {contact?.messages?.map((message, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                bg={message.fromMe ? 'brand.50' : 'white'}
                ml={message.fromMe ? 'auto' : 0}
                mr={message.fromMe ? 0 : 'auto'}
                maxW="80%"
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">
                    {message.fromMe ? 'Você' : message.sender}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    {format(new Date(message.timestamp * 1000), 'PPp')}
                  </Text>
                </HStack>
                <Text>{message.text}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <HStack spacing={4}>
          <Button 
            colorScheme="brand" 
            leftIcon={<Icon as={FaBrain} />}
            isLoading={loading}
          >
            Analisar Conversas
          </Button>
          <Button 
            variant="outline" 
            leftIcon={<Icon as={FaWhatsapp} />}
            isLoading={loading}
          >
            Enviar Mensagem
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ContactView
