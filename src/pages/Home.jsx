import { useState, useEffect, useContext } from 'react';

import Banner from '../components/Banner';
import ImageCarousel from '../components/ImageCarousel';
import { getAllCameras } from '../api/cameras.api';
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
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

function Home() {
  const { user } = useContext(AuthContext);
  const [cameras, setCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // Number of items to display per page
  const totalPages = Math.ceil(cameras.length / itemsPerPage);

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
        <Heading size="md">Latest additions</Heading>
        <Stack ml="30" mr="30" align="center">
          <SimpleGrid
            columns={3}
            p="5"
            minChildWidth="340px"
            maxWidth="1150px"
            spacing="40px"
            overflowX="visible"
          >
            {visibleCameras.map((camera, index) => {
              return (
                <motion.div
                  key={camera._id}
                  initial={{ opacity: 0, y: -500 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  <Card
                    key={camera._id}
                    maxW="sm"
                    shadow="md"
                    background={useColorModeValue('gray.50', 'blackalpha.700')}
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
                          <Text
                            color={useColorModeValue('blue.600', 'pink.200')}
                            fontSize="2xl"
                          >
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
                          </Flex>
                        </Flex>
                      </Stack>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </SimpleGrid>
          <HStack mt={4} spacing={4} justifyContent="center">
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
