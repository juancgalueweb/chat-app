import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'wouter'
import { useUserLoginStore } from '../../stores/userLoginStore'
import Notification from '../Chat/Notification'

const MenuItem = ({ children, to = '/', ...rest }) => {
  return (
    <Link href={to}>
      <Text display='block' fontSize='lg' {...rest}>
        {children}
      </Text>
    </Link>
  )
}

export const MenuLinks = ({ isOpen }) => {
  const user = useUserLoginStore((state) => state.user)
  const resetUser = useUserLoginStore((state) => state.resetUser)
  const [location] = useLocation()

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      mb={isOpen ? 4 : 0}
    >
      <Stack
        spacing={4}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {user?._id !== '' ? (
          <>
            <Text color='blue.700' fontSize='lg'>
              {`Logged in as ${user?.name}`}
            </Text>
            <Notification />
            <MenuItem to='/login'>
              <Button colorScheme='red' onClick={resetUser}>
                Log out
              </Button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              to='/login'
              className={
                location === '/login' ? 'menu-item active-link' : 'menu-item'
              }
            >
              Login
            </MenuItem>
            <MenuItem
              to='/register'
              className={
                location === '/register' ? 'menu-item active-link' : 'menu-item'
              }
            >
              Register{' '}
            </MenuItem>
          </>
        )}
      </Stack>
    </Box>
  )
}
