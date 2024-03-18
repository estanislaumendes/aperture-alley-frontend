import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCamera } from '../api/cameras.api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
  Heading,
  Tooltip,
  FormControl,
  FormLabel,
  Select,
  Input,
  VStack,
  FormHelperText,
  Textarea,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function AddCamerasOverlay({ userId }) {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [format, setFormat] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState('');
  const [img, setImg] = useState([]);
  const [whatsIncluded, setWhatsIncluded] = useState('');
  const [isSelling, setIsSelling] = useState(true);
  const [wasSold, setWasSold] = useState(false);
  const [location, setLocation] = useState('');
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = {
        brand,
        name,
        format,
        price,
        model,
        condition,
        img,
        whatsIncluded,
        isSelling,
        wasSold,
        location,
        user: userId,
      };

      await addCamera(requestBody);

      navigate(`/users/${user._id}`);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HStack align="baseline" spacing="10px">
        <Heading pb="20px" size="md">
          My Cameras
        </Heading>
        <Tooltip label="Add a camera" fontSize="sm">
          <Button
            size="xs"
            borderRadius="50%"
            variant="solid"
            colorScheme="messenger"
            onClick={onOpen}
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>
              <Heading pb="20px" size="md">
                Add a Camera
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing="20px">
                <FormControl isRequired>
                  <FormLabel>Camera Name</FormLabel>
                  <Input onChange={e => setName(e.target.value)} />
                  <FormHelperText>The camera's commercial name</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel isRequired>Brand</FormLabel>
                  <Select
                    placeholder="Select brand"
                    onChange={e => setBrand(e.target.value)}
                  >
                    '<option value="ARRI">ARRI</option>', '
                    <option value="Blackmagic Design">Blackmagic Design</option>
                    ', '<option value="Canon">Canon</option>', '
                    <option value="DJI">DJI</option>', '
                    <option value="Fujifilm">Fujifilm</option>', '
                    <option value="GoPro">GoPro</option>', '
                    <option value="Hasselblad">Hasselblad</option>', '
                    <option value="Leica">Leica</option>', '
                    <option value="Nikon">Nikon</option>', '
                    <option value="Olympus">Olympus</option>', '
                    <option value="Panasonic">Panasonic</option>', '
                    <option value="Pentax">Pentax</option>', '
                    <option value="Phase One">Phase One</option>', '
                    <option value="RED">RED</option>', '
                    <option value="Ricoh">Ricoh</option>', '
                    <option value="Sigma">Sigma</option>', '
                    <option value="Sony">Sony</option>'
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Model</FormLabel>
                  <Input onChange={e => setModel(e.target.value)} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel isRequired>Format</FormLabel>
                  <Select
                    placeholder="Select format"
                    onChange={e => setFormat(e.target.value)}
                  >
                    '<option value="APS-C">APS-C</option>', '
                    <option value="Full frame">Full frame</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      min={0}
                      onChange={e => setPrice(e.target.value)}
                    ></Input>
                    <InputRightAddon>€</InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel isRequired>Condition</FormLabel>
                  <Select
                    placeholder="Select condition"
                    onChange={e => setCondition(e.target.value)}
                  >
                    '<option value="Like new">Like new</option>', '
                    <option value="Excellent">Excellent</option>', '
                    <option value="Good">Good</option>', '
                    <option value="Well used">Well used</option>', '
                    <option value="Heavily used">Heavily used</option>'
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel isRequired>Location</FormLabel>
                  <Select
                    placeholder="Select location"
                    onChange={e => setLocation(e.target.value)}
                  >
                    <option value="Aveiro">Aveiro</option>
                    <option value="Beja">Beja</option>
                    <option value="Braga">Braga</option>
                    <option value="Bragança">Bragança</option>
                    <option value="Castelo Branco">Castelo Branco</option>
                    <option value="Coimbra">Coimbra</option>
                    <option value="Évora">Évora</option>
                    <option value="Faro">Faro</option>
                    <option value="Guarda">Guarda</option>
                    <option value="Ilha da Graciosa">Ilha da Graciosa</option>
                    <option value="Ilha da Madeira">Ilha da Madeira</option>
                    <option value="Ilha das Flores">Ilha das Flores</option>
                    <option value="Ilha de Porto Santo">
                      Ilha de Porto Santo
                    </option>
                    <option value="Ilha de Santa Maria">
                      Ilha de Santa Maria
                    </option>
                    <option value="Ilha de São Jorge">Ilha de São Jorge</option>
                    <option value="Ilha de São Miguel">
                      Ilha de São Miguel
                    </option>
                    <option value="Ilha do Corvo">Ilha do Corvo</option>
                    <option value="Ilha do Faial">Ilha do Faial</option>
                    <option value="Ilha do Pico">Ilha do Pico</option>
                    <option value="Ilha Terceira">Ilha Terceira</option>
                    <option value="Leiria">Leiria</option>
                    <option value="Lisboa">Lisboa</option>
                    <option value="Portalegre">Portalegre</option>
                    <option value="Porto">Porto</option>
                    <option value="Santarém">Santarém</option>
                    <option value="Setúbal">Setúbal</option>
                    <option value="Viana do Castelo">Viana do Castelo</option>
                    <option value="Vila Real">Vila Real</option>
                    <option value="Viseu">Viseu</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>What's Included</FormLabel>
                  <Textarea
                    size="sm"
                    onChange={e => setWhatsIncluded(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" onClick={onclose}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </>
  );
}

export default AddCamerasOverlay;
