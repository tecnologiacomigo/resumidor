import {
  Box,
  VStack,
  Heading,
  Card,
  CardBody,
  Text,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

function GroupList() {
  const groups = [
    { id: 1, name: 'Marketing Team', messageCount: 156 },
    { id: 2, name: 'Project Alpha', messageCount: 89 },
    { id: 3, name: 'Support Group', messageCount: 234 }
  ]

  return (
    <Box>
      <Heading size="md" mb="4">
        WhatsApp Groups
      </Heading>
      
      <InputGroup mb="4">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Search groups..." />
      </InputGroup>

      <VStack spacing="3" align="stretch">
        {groups.map(group => (
          <Card key={group.id} variant="outline" cursor="pointer" _hover={{ shadow: 'md' }}>
            <CardBody>
              <Text fontWeight="medium">{group.name}</Text>
              <Badge colorScheme="green" mt="2">
                {group.messageCount} messages
              </Badge>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  )
}

export default GroupList
