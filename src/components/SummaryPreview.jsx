import {
  Box,
  VStack,
  Heading,
  Card,
  CardBody,
  Text,
  Button,
  HStack,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import { format } from 'date-fns'

function SummaryPreview() {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box>
      <HStack justify="space-between" mb="4">
        <Heading size="md">Summary Preview</Heading>
        <Button colorScheme="brand">Generate Summary</Button>
      </HStack>

      <Card variant="outline" borderColor={borderColor}>
        <CardBody>
          <VStack align="stretch" spacing="4">
            <Box>
              <Text fontSize="sm" color="gray.500">
                Last Updated: {format(new Date(), 'PPp')}
              </Text>
              <Badge colorScheme="blue" mt="2">
                300 messages analyzed
              </Badge>
            </Box>

            <Box p="4" bg="gray.50" borderRadius="md">
              <Text whiteSpace="pre-line">
                🎯 Key Discussion Points:
                • Project timeline updates
                • Marketing campaign results
                • Team collaboration improvements

                💡 Main Insights:
                • Positive feedback on recent changes
                • New ideas for upcoming features
                • Customer satisfaction metrics
              </Text>
            </Box>

            <HStack justify="flex-end">
              <Button variant="outline">Edit</Button>
              <Button colorScheme="brand">Send to Group</Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default SummaryPreview
