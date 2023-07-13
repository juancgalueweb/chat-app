import { Redirect, Route, Switch } from 'wouter'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Switch>
      <Route path='/' component={Chat} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
