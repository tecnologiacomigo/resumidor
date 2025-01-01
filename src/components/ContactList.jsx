import {
  Box,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Card,
  CardBody,
  Text,
  Badge,
  Avatar,
  HStack
} from '@chakra-ui/react'
import { FaSearch, FaUserCircle } from 'react-icons/fa'

function ContactList({ contacts, onSelectContact }) {
  return (
    <Box>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Buscar contatos..." />
      </InputGroup>

      <VStack spacing={3} align="stretch">
        {contacts.map(contact => (
          <Card
            key={contact.id}
            variant="outline"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            onClick={() => onSelectContact(contact)}
          >
            <CardBody>
              <HStack spacing={4}>
                <Avatar size="md" name={contact.name} />
                <Box flex={1}>
                  <Text fontWeight="medium">{contact.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {contact.phone}
                  </Text>
                  <Badge colorScheme="brand" mt={2}>
                    {contact.messageCount} mensagens
                  </Badge>
                </Box>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  )
}

export default ContactList
