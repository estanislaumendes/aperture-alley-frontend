import React from 'react';
import bannerImg from '../assets/photographer.webp';
import { Flex, Heading, Stack, Highlight, Image } from '@chakra-ui/react';

function Banner() {
  return (
    <div>
      <Flex
        h="200px"
        align="center"
        bgGradient="linear(to-l, #FF0080, #7928CA)"
        justify="center"
        gap={[0, 10, 40]}
      >
        <Stack p="20px">
          <Heading
            size={{ base: 'sm', md: 'lg' }}
            lineHeight="tall"
            color="white"
          >
            <Highlight
              query={['Buy', 'sell', 'trade']}
              styles={{ py: '1', color: 'yellow.300' }}
            >
              Buy, sell or trade used cameras
            </Highlight>
          </Heading>
          <Heading size={{ base: 'xs', md: 'sm' }} color="white">
            Shop for all the used cameras you need. Message directly and get a
            deal with sellers
          </Heading>
        </Stack>
        <Image
          boxSize="200px"
          src={bannerImg}
          alt="bannerImage"
          pr="15px"
        ></Image>
      </Flex>
    </div>
  );
}

export default Banner;
