import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';

import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNr, setPhoneNr] = useState('');
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { firstName, lastName, email, password, phoneNr, cameras };

    try {
      await signup(user);
      console.log(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signup', error);
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
          w="auto"
        >
          <Heading mb={6}>Sign up</Heading>

          <Input
            placeholder="First Name"
            type="text"
            variant="filled"
            mb={3}
            isRequired
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            type="text"
            variant="filled"
            mb={3}
            isRequired
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />

          <Input
            placeholder="Phone Number"
            type="number"
            variant="filled"
            mb={10}
            isRequired
            value={phoneNr}
            onChange={e => setPhoneNr(e.target.value)}
          />

          <Input
            placeholder="Email"
            type="email"
            variant="filled"
            mb={3}
            isRequired
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <InputGroup size="md">
            <Input
              placeholder="Password"
              type={show ? 'text' : 'password'}
              variant="filled"
              mb={6}
              isRequired
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="pink" type="submit">
            Sign Up
          </Button>

          {error && <p>{error}</p>}
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormLabel htmlFor="login" mb="0">
              Already have an account?{' '}
              <Button colorScheme="pink" variant="link">
                <Link to="/login">Login</Link>
              </Button>
            </FormLabel>
          </FormControl>
        </Flex>
      </Flex>
    </div>
  );
};

export default Signup;
