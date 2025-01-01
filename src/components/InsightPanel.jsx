import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  Icon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid
} from '@chakra-ui/react'
import { FaBrain, FaChartLine, FaUserFriends, FaCalendarAlt } from 'react-icons/fa'

function InsightPanel({ insights }) {
  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="md">
          <Icon as={FaBrain} mr={2} />
          Análise Comportamental
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Engajamento</StatLabel>
                <StatNumber>85%</StatNumber>
                <StatHelpText>
                  <Icon as={FaChartLine} mr={2} />
                  Aumentou 12%
                </StatHelpText>
              </Stat>
              <Progress value={85} colorScheme="brand" mt={2} />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Frequência de Interação</StatLabel>
                <StatNumber>4.2/semana</StatNumber>
                <StatHelpText>
                  <Icon as={FaCalendarAlt} mr={2} />
                  Média últimos 30 dias
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Card>
          <CardBody>
            <Heading size="sm" mb={4}>
              <Icon as={FaUserFriends} mr={2} />
              Padrões de Comportamento
            </Heading>
            <VStack align="stretch" spacing={3}>
              <Text>🎯 Horários preferidos de comunicação: 9h-11h</Text>
              <Text>💡 Tópicos de maior interesse: Tecnologia, Negócios</Text>
              <Text>🔄 Ciclo de resposta médio: 2.5 horas</Text>
              <Text>📈 Tendência de engajamento: Crescente</Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default InsightPanel
