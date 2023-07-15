import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Link } from 'wouter'
import { useUserLoginStore } from '../stores/userLoginStore'
import { baseUrl, postRequest } from '../utils/services'

const Login = () => {
  const toast = useToast()
  const {
    email,
    password,
    setEmail,
    setPassword,
    setUser,
    setLoading,
    loading
  } = useUserLoginStore()
  const passwordRef = useRef(null)
  const emailRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { email, password }
    setLoading(true)
    // Login existing user
    setTimeout(async () => {
      const response = await postRequest(`${baseUrl}/login`, user)
      if (response.error) {
        toast({
          title: 'Oh oh 😩',
          description: `${response.errorMsg}`,
          status: 'error',
          duration: 6000,
          isClosable: true
        })
        setLoading(false)
      } else {
        toast({
          title: 'Awesome 😎',
          description: `${response.msg}`,
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        setUser(response.user)
        emailRef.current.value = ''
        passwordRef.current.value = ''
        setLoading(false)
      }
    }, 1000)
  }

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
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    ref={emailRef}
                    id='email'
                    type='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant='text'
                        aria-label={
                          isOpen ? 'Mask password' : 'Reveal password'
                        }
                        icon={isOpen ? <HiEye /> : <HiEyeOff />}
                        onClick={onClickReveal}
                        color='blue.600'
                      />
                    </InputRightElement>
                    <Input
                      onChange={(e) => setPassword(e.target.value)}
                      id='password'
                      ref={passwordRef}
                      name='password'
                      type={isOpen ? 'text' : 'password'}
                      autoComplete='current-password'
                      required
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack spacing='6'>
                <Button colorScheme='telegram' type='submit' mt={10}>
                  {loading ? (
                    <>
                      <Spinner display='inline-block' mr={2} />
                      <span>Signing in</span>
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default Login
