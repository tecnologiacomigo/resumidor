import {
  Box,
  Container,
  Grid,
  GridItem,
  useColorModeValue
} from '@chakra-ui/react'
import SearchContact from './SearchContact'
import ContactView from './ContactView'
import InsightPanel from './InsightPanel'

function MainContent({ selectedContact, loading, onSearch }) {
  const bg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box flex="1" bg={bg} p="6" overflowY="auto">
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(12, 1fr)" gap="6">
          <GridItem colSpan={12} mb={6}>
            <SearchContact 
              onSearch={onSearch}
              loading={loading}
            />
          </GridItem>
          
          {selectedContact && (
            <>
              <GridItem colSpan={8}>
                <ContactView 
                  contact={selectedContact}
                  loading={loading}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InsightPanel 
                  contact={selectedContact}
                  loading={loading}
                />
              </GridItem>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default MainContent
