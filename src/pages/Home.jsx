import { useState, useEffect } from 'react';
import { getAllCameras } from '../api/cameras.api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {
  useColorMode,
  Flex,
  Heading,
  Stack,
  Highlight,
  Tooltip,
  CardBody,
  Card,
  Button,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

function Home() {
  const { toggleColorMode } = useColorMode();
  const { user } = useContext(AuthContext);
  const [cameras, setCameras] = useState([]);

  const getCameras = async () => {
    try {
      const response = await getAllCameras();
      //console.log(response);
      setCameras(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCameras();
  }, []);

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
        <Heading size="md">Latest additions</Heading>
        <Stack ml="30" mr="30">
          <Flex mt="6" gap="2" flexWrap="wrap" justifyContent="flex-start">
            {cameras.map(camera => {
              return (
                <Card key={camera._id} maxW="sm" shadow="md">
                  <CardBody>
                    <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">
                        {camera.brand} {camera.name}
                      </Heading>
                      <Text as="sup">{camera.model}</Text>
                      <Text>Condition: {camera.condition} </Text>
                      <Flex justify="space-between">
                        <Text color="blue.600" fontSize="2xl">
                          €{camera.price}
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
              );
            })}
          </Flex>
        </Stack>
      </Stack>
    </>
  );
}

export default Home;
