import React from 'react';
import {
  useColorMode,
  Flex,
  Heading,
  Stack,
  Highlight,
} from '@chakra-ui/react';

function Home() {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        h="200px"
        align="center"
        bgGradient="linear(to-l, #FF0080, #7928CA)"
      >
        <Stack>
          <Heading size="lg" lineHeight="tall" color="white">
            <Highlight
              query={['Buy', 'sell', 'trade']}
              styles={{ py: '1', color: 'yellow.300' }}
            >
              Buy, sell or trade used cameras
            </Highlight>
          </Heading>
          <Heading size="sm" color="white">
            Shop for all the used cameras you need. Message directly and get a
            deal with sellers
          </Heading>
        </Stack>
      </Flex>
      <Flex>
        <Stack>
          <Heading size="md">Just Added</Heading>
        </Stack>
      </Flex>
    </>
  );
}

export default Home;
