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
import { Link, useLocation } from 'wouter'
import { shallow } from 'zustand/shallow'
import { useUserRegistrationStore } from '../stores/userRegistrationStore'
import { baseUrl, postRequest } from '../utils/services'

const Register = () => {
  const toast = useToast()
  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const passwordRef = useRef(null)
  const [, setLocation] = useLocation()
  const [
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    loading,
    setLoading
  ] = useUserRegistrationStore(
    (state) => [
      state.name,
      state.email,
      state.password,
      state.setName,
      state.setEmail,
      state.setPassword,
      state.loading,
      state.setLoading
    ],
    shallow
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { name, email, password }
    setLoading(true)
    // Send user to the DB
    setTimeout(async () => {
      const response = await postRequest(`${baseUrl}/api/users/register`, user)
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
        emailRef.current.value = ''
        nameRef.current.value = ''
        passwordRef.current.value = ''
        setLoading(false)
        setTimeout(() => {
          setLocation('/login')
        }, 3100)
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
              Sign up to chat with your friends
            </Heading>
            <Text color='fg.muted'>
              Already have an account?{' '}
              <Button variant='link' color='blue.600'>
                <Link to='/login'>Sign in</Link>
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
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    ref={nameRef}
                    id='name'
                    type='text'
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
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
                      id='password'
                      ref={passwordRef}
                      name='password'
                      type={isOpen ? 'text' : 'password'}
                      autoComplete='current-password'
                      onChange={(e) => setPassword(e.target.value)}
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
                      <span>Registering user</span>
                    </>
                  ) : (
                    'Sign up'
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

export default Register
