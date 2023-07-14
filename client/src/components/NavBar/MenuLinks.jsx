import { Box, Stack, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'wouter'

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
  const [location] = useLocation()
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      mb={isOpen ? 4 : 0}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem
          to='/'
          className={location === '/' ? 'menu-item active-link' : 'menu-item'}
        >
          Home
        </MenuItem>
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
      </Stack>
    </Box>
  )
}
