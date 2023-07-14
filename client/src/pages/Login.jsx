import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Link } from 'wouter'
import { useUserStore } from '../stores/userStore'

const Login = () => {
  const passwordRef = useRef(null)
  const { setPassword, setEmail } = useUserStore()

  const { isOpen, onToggle } = useDisclosure()
  const onClickReveal = () => {
    onToggle()
    if (passwordRef.current) {
      passwordRef.current.focus({
        preventScroll: true
      })
    }
  }

  return (
    <Container
      zIndex={10}
      maxW='lg'
      py={{
        base: '12',
        md: '24'
      }}
      px={{
        base: '0',
        sm: '8'
      }}
    >
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack
            spacing={{
              base: '2',
              md: '3'
            }}
            textAlign='center'
          >
            <Heading
              size={{
                base: 'xs',
                md: 'sm'
              }}
            >
              Log in to your account
            </Heading>
            <Text color='fg.muted'>
              Don&apos;t have an account?{' '}
              <Button variant='link' color='blue.600'>
                <Link to='/register'>Sign up</Link>
              </Button>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8'
          }}
          px={{
            base: '4',
            sm: '10'
          }}
          bg={{
            base: 'transparent',
            sm: 'bg.surface'
          }}
          boxShadow={{
            base: 'none',
            sm: 'md'
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl'
          }}
        >
          <Stack spacing='6'>
            <Stack spacing='5'>
              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  id='email'
                  type='email'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant='text'
                      aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                      icon={isOpen ? <HiEye /> : <HiEyeOff />}
                      onClick={onClickReveal}
                      color='blue.600'
                    />
                  </InputRightElement>
                  <Input
                    id='password'
                    ref={passwordRef}
                    name='password'
                    type={isOpen ? 'text' : 'password'}
                    autoComplete='current-password'
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <HStack justify='end'>
              <Button variant='link' size='sm' color='blue.600' fontSize='md'>
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing='6'>
              <Button colorScheme='telegram' type='submit'>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default Login
