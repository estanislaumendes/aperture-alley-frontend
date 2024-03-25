import { ReactNode } from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Heading,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <Heading size="md">Company</Heading>
              <Box as="a" href={'#'}>
                About Us
              </Box>
              <Box as="a" href={'#'}>
                Blog
              </Box>
              <Box as="a" href={'#'}>
                Careers
              </Box>
              <Box as="a" href={'#'}>
                Contact Us
              </Box>
            </Stack>

            <Stack align={'flex-start'}>
              <Heading size="md">Support</Heading>
              <Box as="a" href={'#'}>
                Help Center
              </Box>
              <Box as="a" href={'#'}>
                Safety Center
              </Box>
              <Box as="a" href={'#'}>
                Community Guidelines
              </Box>
            </Stack>

            <Stack align={'flex-start'}>
              <Heading size="md">Legal</Heading>
              <Box as="a" href={'#'}>
                Cookies Policy
              </Box>
              <Box as="a" href={'#'}>
                Privacy Policy
              </Box>
              <Box as="a" href={'#'}>
                Terms of Service
              </Box>
              <Box as="a" href={'#'}>
                Law Enforcement
              </Box>
            </Stack>

            <Stack align={'flex-start'}>
              <Heading size="md">About Me</Heading>
            </Stack>
          </SimpleGrid>
        </Container>

        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ md: 'space-between' }}
            align={{ md: 'center' }}
          >
            <Text>© 2024 Estanislau Mendes. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <Button label={'Twitter'} href={'#'}>
                <FaTwitter />
              </Button>
              <Button label={'YouTube'} href={'#'}>
                <FaYoutube />
              </Button>
              <Button label={'Instagram'} href={'#'}>
                <FaInstagram />
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
