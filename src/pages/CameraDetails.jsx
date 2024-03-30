import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCamera } from '../api/cameras.api';
import { getUser } from '../api/cameras.api';
import Banner from '../components/Banner';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import fallbackImage from '../assets/fallback-camera.png';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modelPhotos, setModelPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [page, setPage] = useState(1);
  const photosPerPage = 8;
  const { cameraId } = useParams();
  const apiKey = import.meta.env.VITE_FLICKR_KEY;

  const navigateToPreviousImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? camera.img.length - 1 : prevIndex - 1
    );
  };

  const navigateToNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === camera.img.length - 1 ? 0 : prevIndex + 1
    );
  };

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
  }, [cameraId]);

  useEffect(() => {
    if (camera && camera.model) {
      const fetchModelPhotos = async () => {
        try {
          // Fetch photos from Flickr API based on camera model
          const response = await fetch(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${camera.model}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch model photos');
          }

          const data = await response.json();
          /* console.log('data', data); */
          if (data.photos && data.photos.photo) {
            setModelPhotos(prevPhotos => [...prevPhotos, ...data.photos.photo]);
          }
        } catch (error) {
          console.error('Error fetching model photos:', error);
        }
      };

      fetchModelPhotos();
    }
  }, [camera]);

  useEffect(() => {
    // Update visiblePhotos when photos change or page changes
    setVisiblePhotos(modelPhotos.slice(0, photosPerPage * page));
  }, [modelPhotos, page]);

  const handleShowMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Banner />
      <Stack ml="30" mr="30">
        {camera && user && (
          <Container maxW={'7xl'}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <>
                <Flex direction="column">
                  <Image
                    rounded={'md'}
                    alt={'product image'}
                    src={
                      camera.img.length > 0
                        ? camera.img[currentImageIndex]
                        : fallbackImage
                    }
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                  />
                  {/* Navigation Buttons */}
                  <Stack direction="row" justifyContent="center" mt={4}>
                    <Button variant="link" onClick={navigateToPreviousImage}>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        size="xl"
                        style={{ color: '#e41f8c' }}
                      />
                    </Button>
                    <Button variant="link" onClick={navigateToNextImage}>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        size="xl"
                        style={{ color: '#e41f8c' }}
                      />
                    </Button>
                  </Stack>
                </Flex>
                <Stack spacing={{ base: 6, md: 5 }}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                    >
                      {camera.name}
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
            </SimpleGrid>
          </Container>
        )}
      </Stack>
      <Stack
        alignItems="center"
        spacing={{ base: 4, sm: 6 }}
        direction={'column'}
        divider={
          <StackDivider
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          />
        }
      >
        <Text
          color={useColorModeValue('gray.500', 'gray.400')}
          fontSize={'xl'}
          fontWeight={'300'}
        >
          The pictures below were taken with the same model
        </Text>
        {/* Model Photos */}
        <Container maxW={'7xl'} mt={8}>
          {modelPhotos.length !== 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
              {Array.isArray(modelPhotos) &&
                visiblePhotos.map(photo => (
                  <img
                    key={photo.id}
                    src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                    alt={photo.title}
                  />
                ))}
            </SimpleGrid>
          ) : (
            <Stack align="center" mb={4}>
              <Spinner />
              {/* <Text as="mark">Error: Couldn't find any photo</Text> */}
            </Stack>
          )}
          {visiblePhotos.length < modelPhotos.length && (
            <Stack align="center">
              <Button mt={4} mb={4} onClick={handleShowMore}>
                Show More
              </Button>
            </Stack>
          )}
        </Container>
      </Stack>
    </>
  );
}

export default CameraDetails;
