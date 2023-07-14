import { useState } from 'react'
import { Logo } from './NavBar/Logo'
import { MenuLinks } from './NavBar/MenuLinks'
import { MenuToggle } from './NavBar/MenuToggle'
import { NavBarContainer } from './NavBar/NavBarContainer'

const Header = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <NavBarContainer {...props}>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

export default Header
