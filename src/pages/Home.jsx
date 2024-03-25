import { useState, useEffect, useContext } from 'react';

import Banner from '../components/Banner';
import { getAllCameras } from '../api/cameras.api';
import { AuthContext } from '../context/auth.context';
import {
  HStack,
  useColorMode,
  Flex,
  Heading,
  Stack,
  Card,
  CardBody,
  Button,
  Image,
  Text,
  Tooltip,
  SimpleGrid,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

function Home() {
  const { toggleColorMode } = useColorMode();
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
        <Stack ml="30" mr="30">
          <SimpleGrid columns={3} p="5" spacing={4} overflowX="visible">
            {visibleCameras.map(camera => {
              return (
                <Card
                  key={camera._id}
                  maxW="sm"
                  shadow="md"
                  _hover={{ shadow: '2xl' }}
                >
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
                            variant="ghost"
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
