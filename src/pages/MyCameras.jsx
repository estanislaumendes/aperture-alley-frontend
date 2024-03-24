import { useState, useEffect } from 'react';
import { getUserCamera } from '../api/cameras.api';
import AddCamerasOverlay from './AddCamerasOverlay';
import DeleteCamerasDialog from './DeleteCamerasDialog';

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
import EditCamerasOverlay from './EditCamerasOverlay';

function MyCameras() {
  const { user } = useContext(AuthContext);
  const [cameras, setCameras] = useState([]);

  const getCameras = async () => {
    try {
      const response = await getUserCamera(user._id);
      //console.log(response);
      setCameras(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCameras();
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
        <AddCamerasOverlay userId={user._id} getCameras={getCameras} />

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
                        <Flex spacing="1" justify="flex-end">
                          <Tooltip label="Send a message" fontSize="sm">
                            <Button
                              borderRadius="50%"
                              variant="ghost"
                              colorScheme="messenger"
                            >
                              <ChatIcon />
                            </Button>
                          </Tooltip>
                          <EditCamerasOverlay
                            cameraId={camera._id}
                            getCameras={getCameras}
                          />
                          <DeleteCamerasDialog
                            cameraId={camera._id}
                            getCameras={getCameras}
                          />
                        </Flex>
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

export default MyCameras;
