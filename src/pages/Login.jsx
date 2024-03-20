import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';

import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await login(user);
      //logon responds with the jwt token
      //console.log(response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.log('Error login', error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Flex
          as="form"
          flexDirection="column"
          p={12}
          borderRadius={8}
          boxShadow="lg"
          onSubmit={handleSubmit}
        >
          <Heading mb={6}>Log In</Heading>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
            isRequired
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
            isRequired
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" colorScheme="pink" mb={8}>
            Log In
          </Button>
          {error && <p>{error}</p>}
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="signup" mb="0">
              New to us? <Link to={'/signup'}>Signup</Link>
            </FormLabel>
          </FormControl>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;
