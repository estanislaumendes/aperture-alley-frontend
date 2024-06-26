import { getAllCameras } from '../api/cameras.api';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Banner from '../components/Banner';
import ImageCarousel from '../components/ImageCarousel';
import { AuthContext } from '../context/auth.context';
import {
  HStack,
  useColorModeValue,
  Flex,
  Heading,
  Stack,
  Card,
  CardBody,
  Button,
  Box,
  Text,
  Tooltip,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import ChatOverlay from './ChatOverlay';

function Home() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [cameras, setCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 6; // Number of items to display per page
  const totalPages = Math.ceil(cameras.length / itemsPerPage);

  const getCameras = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCameras();

      setCameras(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCameras();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCameras = cameras.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Banner />

      <Stack p="20px">
        <Stack ml="30" mr="30" align="center">
          {isLoading ? (
            <Spinner /> // Render spinner if isLoading is true
          ) : (
            <VStack align="flex-start">
              <Heading size="md">Latest additions</Heading>
              <SimpleGrid
                p="5"
                minChildWidth="340px"
                maxWidth="1150px"
                spacing="40px"
                overflowX="visible"
                className="grid-layout"
              >
                {visibleCameras.map((camera, index) => {
                  return (
                    <motion.div
                      key={camera._id}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.1,
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 100,
                      }}
                    >
                      {camera && (
                        <Card
                          key={camera._id}
                          maxW="sm"
                          shadow="md"
                          background={useColorModeValue(
                            'gray.50',
                            'blackalpha.700'
                          )}
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
                              <Link to={`/cameras/${camera._id}`}>
                                <Heading size="md">{camera.name}</Heading>
                                <Text as="sup">{camera.model}</Text>
                                <Text>Condition: {camera.condition} </Text>
                              </Link>
                              <Flex justify="space-between">
                                <Text
                                  color={useColorModeValue(
                                    'blue.600',
                                    'pink.200'
                                  )}
                                  fontSize="2xl"
                                >
                                  €{camera.price}
                                </Text>
                                <Flex spacing="1" justify="flex-end">
                                  {isLoggedIn && user._id !== camera.user ? (
                                    <ChatOverlay
                                      userId={user._id}
                                      receiverId={camera.user}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </Flex>
                              </Flex>
                            </Stack>
                          </CardBody>
                        </Card>
                      )}
                    </motion.div>
                  );
                })}
              </SimpleGrid>
            </VStack>
          )}
          <HStack mt={4} spacing={{ base: 1, md: 4 }} justifyContent="center">
            {currentPage !== 1 && (
              <Button onClick={handlePrevPage}>Previous</Button>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                variant={currentPage === index + 1 ? 'solid' : 'outline'}
                colorScheme={currentPage === index + 1 ? 'pink' : 'gray'}
              >
                {index + 1}
              </Button>
            ))}
            {currentPage !== totalPages && (
              <Button onClick={handleNextPage}>Next</Button>
            )}
          </HStack>
        </Stack>
      </Stack>
    </>
  );
}

export default Home;
