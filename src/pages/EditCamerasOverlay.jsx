import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCamera, getCamera, deleteCamera } from '../api/cameras.api';
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
  Stack,
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
  Flex,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function EditCamerasOverlay({ cameraId, getCameras }) {
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

  const getSingleCamera = async () => {
    try {
      const response = await getCamera(cameraId);

      setBrand(response.data.brand);
      setName(response.data.name);
      setFormat(response.data.format);
      setModel(response.data.brand);
      setPrice(response.data.price);
      setCondition(response.data.condition);
      setImg(response.data.img);
      setIsSelling(response.data.isSelling);
      setWhatsIncluded(response.data.whatsIncluded);
      setWasSold(response.data.wasSold);
      setLocation(response.data.location);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCamera();
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = {
        _id: cameraId,
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
      };

      await updateCamera(requestBody);

      navigate(`/users/${user._id}`);
      getCameras();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCamera(cameraId);
      navigate(`/users/${user._id}`);
      getCameras();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip label="Edit Camera" fontSize="sm">
        <Button
          borderRadius="50%"
          variant="ghost"
          colorScheme="messenger"
          onClick={onOpen}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>
            <Heading pb="20px" size="md">
              Edit a Camera
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px">
              <FormControl isRequired>
                <FormLabel>Camera Name</FormLabel>
                <Input value={name} onChange={e => setName(e.target.value)} />
                <FormHelperText>The camera's commercial name</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel isRequired>Brand</FormLabel>
                <Select
                  placeholder="Select brand"
                  value={brand}
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
                <Input value={model} onChange={e => setModel(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel isRequired>Format</FormLabel>
                <Select
                  placeholder="Select format"
                  value={format}
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
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  ></Input>
                  <InputRightAddon>€</InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel isRequired>Condition</FormLabel>
                <Select
                  placeholder="Select condition"
                  value={condition}
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
                  value={location}
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
                  <option value="Ilha de São Miguel">Ilha de São Miguel</option>
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
                  value={whatsIncluded}
                  onChange={e => setWhatsIncluded(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Flex justify="space-between">
              <Button
                variant="solid"
                colorScheme="red"
                mr={3}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Flex justify="flex-end">
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" colorScheme="blue" onClick={onclose}>
                  Submit
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditCamerasOverlay;
