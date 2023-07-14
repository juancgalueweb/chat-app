import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Redirect, Route, Switch } from 'wouter'
import { Fonts } from './components/Font'
import Header from './components/Header'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

const theme = extendTheme({
  fonts: {
    body: 'Raleway'
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Header />
      <Switch>
        <Route path='/' component={Chat} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Redirect to='/' />
      </Switch>
    </ChakraProvider>
  )
}

export default App
