import {
  Box,
  VStack,
  Icon,
  Text,
  Heading,
  Button,
  useColorModeValue,
  Avatar,
  HStack
} from '@chakra-ui/react'
import { FaWhatsapp, FaCog, FaHistory } from 'react-icons/fa'

function Sidebar({ recentContacts = [], onSelectContact }) {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      w="64"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      p="4"
      boxShadow="sm"
    >
      <VStack spacing="6" align="stretch">
        <Box>
          <Heading size="md" mb="4" color="brand.600">
            Message Summary
          </Heading>
        </Box>

        <VStack spacing="3" align="stretch">
          <Button
            leftIcon={<Icon as={FaWhatsapp} />}
            variant="ghost"
            justifyContent="flex-start"
            colorScheme="brand"
          >
            Groups
          </Button>
          <Button
            leftIcon={<Icon as={FaHistory} />}
            variant="ghost"
            justifyContent="flex-start"
          >
            History
          </Button>
          <Button
            leftIcon={<Icon as={FaCog} />}
            variant="ghost"
            justifyContent="flex-start"
          >
            Settings
          </Button>
        </VStack>

        {recentContacts.length > 0 && (
          <VStack spacing="3" align="stretch" mt="6">
            <Text fontWeight="medium" color="gray.500">
              Recent Contacts
            </Text>
            {recentContacts.map(contact => (
              <HStack
                key={contact.phone}
                p="2"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
                onClick={() => onSelectContact(contact.phone)}
              >
                <Avatar size="sm" name={contact.name} src={contact.picture_url} />
                <Box>
                  <Text fontSize="sm" fontWeight="medium">
                    {contact.name || contact.phone}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(contact.last_interaction).toLocaleDateString()}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  )
}

export default Sidebar
