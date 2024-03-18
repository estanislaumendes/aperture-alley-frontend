import { useState, useEffect } from 'react';

import AddCamerasOverlay from './AddCamerasOverlay';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {
  Flex,
  Heading,
  Stack,
  Highlight,
  Card,
  CardBody,
  Button,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

function MyCameras() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Flex
        h="200px"
        align="center"
        bgGradient="linear(to-l, #FF0080, #7928CA)"
      >
        <Stack p="20px">
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
      <Stack p="20px">
        <AddCamerasOverlay userId={user._id} />

        <Flex>
          <Card maxW="sm" shadow="md">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Camera Name</Heading>
                <Text>Condition: Excellent</Text>
                <Flex justify="space-between">
                  <Text color="blue.600" fontSize="2xl">
                    €450
                  </Text>
                  <Tooltip label="Send a message" fontSize="sm">
                    <Button
                      borderRadius="50%"
                      variant="solid"
                      colorScheme="messenger"
                    >
                      <ChatIcon />
                    </Button>
                  </Tooltip>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </Stack>
    </>
  );
}

export default MyCameras;
