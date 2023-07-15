import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AppRoutes } from './routes/AppRoutes'

const theme = extendTheme({
  fonts: {
    body: 'Raleway'
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  )
}

export default App
