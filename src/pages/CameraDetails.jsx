import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCamera } from '../api/cameras.api';
import { getUser } from '../api/cameras.api';
import Banner from '../components/Banner';

import {
  Flex,
  Heading,
  Stack,
  Button,
  Box,
  Text,
  Container,
  Image,
  VStack,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

function CameraDetails() {
  const [camera, setCamera] = useState(null);
  const [user, setUser] = useState(null);
  const [timeAgo, setTimeAgo] = useState(null);
  const { cameraId } = useParams();

  const getSingleCamera = async () => {
    try {
      const response = await getCamera(cameraId);
      const cameraData = response.data;

      setCamera(cameraData);

      // Calculate time difference
      const createdAt = new Date(cameraData.createdAt);
      const currentDate = new Date();
      const differenceInMs = currentDate - createdAt;

      // Convert milliseconds to days, hours, minutes, and seconds
      const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

      // Construct the time ago string
      let timeAgoString = '';
      if (days > 0) {
        timeAgoString += days + ' day(s) ';
      }
      if (hours > 0) {
        timeAgoString += hours + ' hour(s) ';
      }
      if (minutes > 0) {
        timeAgoString += minutes + ' minute(s) ';
      }
      if (seconds > 0) {
        timeAgoString += seconds + ' second(s) ';
      }

      // Set time ago in state
      setTimeAgo(timeAgoString);

      getSingleUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleUser = async userId => {
    try {
      const response = await getUser(userId);

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCamera();
  }, []);

  return (
    <>
      <Banner />
      <Stack ml="30" mr="30">
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            {camera && user && (
              <>
                <Flex>
                  <Image
                    rounded={'md'}
                    alt={'product image'}
                    src={
                      'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
                    }
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                  />
                </Flex>
                <Stack spacing={{ base: 6, md: 5 }}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                    >
                      {camera.brand} {camera.name}
                    </Heading>
                    <Text
                      color={useColorModeValue('gray.900', 'gray.400')}
                      fontWeight={300}
                      fontSize={'2xl'}
                    >
                      €{camera.price}
                    </Text>
                  </Box>

                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                      />
                    }
                  >
                    <VStack align="left" spacing={{ base: 4, sm: 6 }}>
                      <Text
                        color={useColorModeValue('gray.500', 'gray.400')}
                        fontSize={'2xl'}
                        fontWeight={'300'}
                      >
                        Model {camera.model}
                      </Text>

                      <Text fontSize={'lg'}>
                        Format: <Text as="b"> {camera.format}</Text>
                        <br />
                        Cosmetic condition:{' '}
                        <Text as="b"> {camera.condition} </Text>
                      </Text>
                    </VStack>
                    <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        color={useColorModeValue('pink.500', 'pink.300')}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}
                      >
                        What's Included
                      </Text>
                      <Text>{camera.whatsIncluded}</Text>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        color={useColorModeValue('pink.500', 'pink.300')}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}
                      >
                        Seller Details
                      </Text>

                      <List spacing={2}>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Name:
                          </Text>{' '}
                          {user.firstName} {user.lastName}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Location:
                          </Text>{' '}
                          {camera.location}
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={'center'}
                    fontSize={{ base: '10px', lg: '14px' }}
                  >
                    <Text>Created:</Text>
                    <Text>{timeAgo} ago</Text>
                  </Stack>
                </Stack>
              </>
            )}
          </SimpleGrid>
        </Container>
      </Stack>
    </>
  );
}

export default CameraDetails;
