import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  HStack,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { getAllCameras } from '../api/cameras.api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = async event => {
    const query = event.target.value.trim();
    setSearchQuery(query);

    if (query.length > 0) {
      const fetchedSuggestions = await fetchSuggestions(query);
      setSuggestions(fetchedSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = async query => {
    try {
      const response = await getAllCameras(query);
      if (!response.data) {
        throw new Error('Failed to fetch suggestions');
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleSuggestionClick = suggestionId => {
    navigate(`/cameras/${suggestionId}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <Flex direction="column" w="35%" minW="fit-content" position="relative">
      <InputGroup direction="row">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          variant="filled"
          type="search"
          placeholder="Search for Camera"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </InputGroup>
      {showSuggestions && suggestions.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          mt={2}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          zIndex="1"
          bg="white"
          minWidth="100%"
        >
          {suggestions.map(suggestion => (
            <Box
              key={suggestion._id}
              p={2}
              _hover={{ bg: 'gray.100', cursor: 'pointer', borderRadius: 'md' }}
              onClick={() => handleSuggestionClick(suggestion._id)}
            >
              <HStack spacing="10px">
                <Button colorScheme="pink" variant="ghost">
                  {suggestion.condition}
                </Button>
                <Text>{suggestion.name}</Text> <Text color="gray.500">for</Text>{' '}
                <Text>{suggestion.price}€</Text>
                <Text color="gray.500">in</Text>
                <Text>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: '#d2438a' }}
                  />{' '}
                  {suggestion.location}
                </Text>
              </HStack>
            </Box>
          ))}
        </Box>
      )}
    </Flex>
  );
}

export default SearchBar;
