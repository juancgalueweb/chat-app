import { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'wouter'
import { Fonts } from '../components/Font'
import Header from '../components/Header'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useUserLoginStore } from '../stores/userLoginStore'

export const AppRoutes = () => {
  const user = useUserLoginStore((state) => state.user)
  const [location, setLocation] = useLocation()

  useEffect(() => {
    if (user._id === '' && location !== '/register') {
      setLocation('/login')
    }
  }, [user, setLocation, location])

  return (
    <>
      <Fonts />
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        {user._id !== '' ? (
          <Route path='/' component={Chat} />
        ) : (
          <Redirect to='/login' />
        )}
        <Redirect to='/login' />
      </Switch>
    </>
  )
}
