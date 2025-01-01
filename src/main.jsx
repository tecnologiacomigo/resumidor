import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      }
    }
  },
  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
