import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import logoUrl from '../assets/camera-no-bg.png';
import {
  Flex,
  HStack,
  Heading,
  Switch,
  Image,
  Stack,
  useColorMode,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

function Navbar() {
  const { toggleColorMode } = useColorMode();
  const { user, isLoggedIn, logoutUser } = useContext(AuthContext);
  return (
    <Flex
      direction="row"
      as="nav"
      align="center"
      justify="space-between"
      bg="#1A365D"
      p={[0, 3, 15]}
    >
      <HStack direction="row" p="10px">
        <NavLink to="/">
          <Image
            boxSize={['45px', '50px', '60px']}
            src={logoUrl}
            alt="logo"
          ></Image>
        </NavLink>
        <NavLink to="/">
          <Heading as="h1" color="white">
            Aperture Alley
          </Heading>
        </NavLink>
      </HStack>
      <HStack width="50%">
        <InputGroup direction="row">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            variant="filled"
            type="search"
            placeholder="Search for Camera"
          />
        </InputGroup>
      </HStack>

      <Stack direction="row" align="center" spacing="20px">
        <Switch
          onChange={toggleColorMode}
          colorScheme="pink"
          size={['sm', 'md']}
        ></Switch>
        {isLoggedIn ? (
          <Menu>
            <MenuButton>
              <Avatar
                name={user.firstName + ' ' + user.lastName}
                src=""
                bg="pink.500"
                size={['sm', 'md', 'lg']}
              />
            </MenuButton>
            <MenuList>
              <MenuItem size="md">
                <Link to={`/users/${user._id}`}>My Cameras</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem size="md" onClick={logoutUser}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme="pink">
            <Link to="/login">Log In</Link>
          </Button>
        )}
      </Stack>
    </Flex>
  );
}

export default Navbar;
