import { Flex } from '@chakra-ui/react'

export const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      px={8}
      bg='teal.50'
      color={['black', 'primary.700', 'primary.700']}
      {...props}
    >
      {children}
    </Flex>
  )
}
