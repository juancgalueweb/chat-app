import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { Link } from 'wouter'
import { PasswordField } from '../components/PasswordField'

const Login = () => (
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
              <Input id='email' type='email' required />
            </FormControl>
            <PasswordField />
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

export default Login
