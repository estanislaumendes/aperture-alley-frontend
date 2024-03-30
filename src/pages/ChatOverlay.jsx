import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getMessages, sendMessage, getOtherUsers } from '../api/messaging.api';
import { ChatIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
  Heading,
  Tooltip,
  Text,
  Input,
  Flex,
  Box,
  Stack,
} from '@chakra-ui/react';

const socket = io(`${import.meta.env.VITE_PROJECTS_API}`);

function ChatOverlay({ userId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUserClick = receiverId => {
    fetchMessages(receiverId);
  };

  const fetchMessages = async receiverId => {
    try {
      const response = await getMessages(userId, receiverId);

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch other users the current user has exchanged messages with
  const fetchOtherUsers = async () => {
    try {
      const response = await getOtherUsers(userId);
      setOtherUsers(response.data);
    } catch (error) {
      console.error('Error fetching other users:', error);
    }
  };

  useEffect(() => {
    // Fetch other users when the component mounts
    fetchOtherUsers();

    // Listen for new messages
    socket.on('message', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      // Clean up WebSocket connection
      socket.disconnect();
    };
  }, []);

  const sendMessages = async () => {
    try {
      await sendMessage(userId, otherUsers[0]._id, message);

      // Clear input field after sending message
      setMessage('');
      fetchMessages(otherUsers[0]._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setMessage('');
  };

  return (
    <>
      <HStack align="baseline" spacing="10px">
        <Tooltip label="Send a message" fontSize="sm">
          <Button
            borderRadius="50%"
            variant="ghost"
            colorScheme="messenger"
            onClick={onOpen}
          >
            <ChatIcon />
          </Button>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading pb="20px" size="md">
                Chat
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                {/* Side panel for other users */}
                <Box w="180px" bg="gray.200" p={4} mr={4}>
                  <Heading size="md" mb={4}>
                    Users
                  </Heading>
                  <Stack spacing={2}>
                    {otherUsers.map(user => (
                      <Box
                        key={user._id}
                        p={2}
                        bg="gray.100"
                        borderRadius="md"
                        cursor="pointer"
                        onClick={() => handleUserClick(user._id)}
                      >
                        <Text>
                          {user.firstName} {user.lastName}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                {/* Main chat area */}
                <Flex direction="column" flex={1}>
                  <Box flex={1} overflowY="auto">
                    {messages.map((msg, index) => (
                      <Box
                        key={index}
                        bg={msg.sender === userId ? 'blue.100' : 'gray.100'}
                        p={2}
                        mb={2}
                        borderRadius="md"
                      >
                        <Text>{msg.message}</Text>
                        <Text fontSize="xs" fontStyle="italic">
                          {msg.sender === userId ? 'You' : 'Receiver'}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex>
                <Input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  mr={2}
                />
                <Button onClick={sendMessages} colorScheme="pink">
                  Send
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </>
  );
}

export default ChatOverlay;
