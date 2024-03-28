import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import { getUserCamera } from '../api/cameras.api';
import AddCamerasOverlay from './AddCamerasOverlay';
import DeleteCamerasDialog from './DeleteCamerasDialog';
import ImageCarousel from '../components/ImageCarousel';

import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {
  Flex,
  Heading,
  Stack,
  Card,
  CardBody,
  Button,
  Box,
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
      <Banner />
      <Stack p="20px">
        <AddCamerasOverlay userId={user._id} getCameras={getCameras} />

        <Stack ml="30" mr="30">
          <Flex mt="6" gap="2" flexWrap="wrap" justifyContent="flex-start">
            {cameras.map(camera => {
              return (
                <Card
                  key={camera._id}
                  maxW="sm"
                  shadow="md"
                  _hover={{ shadow: '2xl' }}
                >
                  <CardBody>
                    <Box
                      key={camera._id}
                      width="300px"
                      height="300px"
                      overflow="hidden"
                      position="relative"
                    >
                      <ImageCarousel camera={camera} />
                    </Box>
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
