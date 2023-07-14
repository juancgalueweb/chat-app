import { Box } from '@chakra-ui/react'
import { CloseIcon } from './CloseIcon'
import { MenuIcon } from './MenuIcon'

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}
