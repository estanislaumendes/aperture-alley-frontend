import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCamera, upload } from '../api/cameras.api';
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

function AddCamerasOverlay({ userId, getCameras }) {
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
  const [cameraNames, setCameraNames] = useState([]);
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  //reset them back to the original state
  const resetStates = () => {
    setBrand('');
    setName('');
    setFormat('');
    setModel('');
    setPrice(0);
    setCondition('');
    setImg([]);
    setWhatsIncluded('');
    setIsSelling(true);
    setWasSold(false);
    setLocation('');
    setCameraNames([]);
  };

  // Define camera names for each brand
  const cameraNamesByBrand = {
    ARRI: ['ALEXA LF', 'ALEXA Mini', 'ALEXA Mini LF', 'ALEXA SXT', 'AMIRA'],
    'Blackmagic Design': [
      'Blackmagic Pocket Cinema Camera 4K',
      'Blackmagic Pocket Cinema Camera 6K Pro',
      'Blackmagic URSA Mini Pro 12K',
      'Blackmagic URSA Mini Pro 4.6K',
      'Blackmagic URSA Mini Pro 4.6K G2',
    ],
    Canon: [
      'Canon EOS-1D X Mark III',
      'Canon EOS 5D Mark IV',
      'Canon EOS C300 Mark III',
      'Canon EOS R5',
      'Canon EOS R6',
    ],
    DJI: [
      'DJI Zenmuse X4S',
      'DJI Zenmuse X5',
      'DJI Zenmuse X5R',
      'DJI Zenmuse X5S',
      'DJI Zenmuse X7',
    ],
    Fujifilm: [
      'Fujifilm GFX 100S',
      'Fujifilm X-S10',
      'Fujifilm X-T30',
      'Fujifilm X-T4',
      'Fujifilm X100V',
    ],
    GoPro: [
      'GoPro Fusion',
      'GoPro HERO7 Black',
      'GoPro HERO8 Black',
      'GoPro HERO9 Black',
      'GoPro MAX',
    ],
    Hasselblad: [
      'Hasselblad H5D-50c',
      'Hasselblad H6D-100c',
      'Hasselblad H6D-50c',
      'Hasselblad X1D II 50C',
      'Hasselblad X1D-50c',
    ],
    Leica: [
      'Leica CL',
      'Leica D-Lux 7',
      'Leica M10-R',
      'Leica Q2 Monochrom',
      'Leica SL2-S',
    ],
    Nikon: [
      'Nikon D780',
      'Nikon D850',
      'Nikon Z5',
      'Nikon Z6 II',
      'Nikon Z7 II',
    ],
    Olympus: [
      'Olympus OM-D E-M1 Mark III',
      'Olympus OM-D E-M1X',
      'Olympus OM-D E-M5 Mark III',
      'Olympus PEN-F',
      'Olympus Tough TG-6',
    ],
    Panasonic: [
      'Panasonic Lumix DC-G9',
      'Panasonic Lumix DC-GH5',
      'Panasonic Lumix DC-GH5S',
      'Panasonic Lumix DC-S1H',
      'Panasonic Lumix DC-S5',
    ],
    Pentax: [
      'Pentax 645Z',
      'Pentax K-1 Mark II',
      'Pentax K-3 III',
      'Pentax K-70',
      'Pentax KP',
    ],
    'Phase One': [
      'Phase One IQ3 100MP Trichromatic',
      'Phase One IQ4 100MP Trichromatic',
      'Phase One IQ4 150MP',
      'Phase One IQ4 Achromatic',
      'Phase One XT',
    ],
    RED: [
      'RED DSMC2 HELIUM 8K S35',
      'RED DSMC2 MONSTRO 8K VV',
      'RED KOMODO 6K',
      'RED RANGER HELIUM 8K S35',
      'RED RANGER MONSTRO 8K VV',
    ],
    Ricoh: [
      'Ricoh GR III',
      'Ricoh GR III Street Edition',
      'Ricoh Theta V',
      'Ricoh Theta Z1',
      'Ricoh WG-6',
    ],
    Sigma: [
      'Sigma dp0 Quattro',
      'Sigma fp',
      'Sigma fp L',
      'Sigma sd Quattro',
      'Sigma sd Quattro H',
    ],
    Sony: [
      'Sony Alpha a6600',
      'Sony Alpha a7R IV',
      'Sony Alpha a7S III',
      'Sony Alpha a9 II',
      'Sony Alpha 1',
      'Sony Alpha 7C',
      'Sony Alpha 7 III',
      'Sony Cyber-shot DSC-RX100 VII',
      'Sony Cyber-shot DSC-RX100 VIII',
      'Sony Cyber-shot DSC-RX1R II',
      'Sony ZV-E10',
    ],
  };

  // Update camera names based on selected brand
  const handleBrandChange = e => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    setCameraNames(cameraNamesByBrand[selectedBrand] || []);
    setName(''); // Reset the camera name when brand changes
  };

  // Function to get model name by brand and camera name
  const getModelNameByBrand = (brand, cameraName) => {
    const modelMap = {
      ARRI: {
        'ALEXA LF': 'ALEXA LF',
        'ALEXA Mini': 'ALEXA Mini',
        'ALEXA Mini LF': 'ALEXA Mini LF',
        'ALEXA SXT': 'ALEXA SXT',
        AMIRA: 'AMIRA',
      },
      'Blackmagic Design': {
        'Blackmagic Pocket Cinema Camera 4K': 'BMPCC 4K',
        'Blackmagic Pocket Cinema Camera 6K Pro': 'BMPCC 6K Pro',
        'Blackmagic URSA Mini Pro 12K': 'URSA Mini Pro 12K',
        'Blackmagic URSA Mini Pro 4.6K': 'URSA Mini Pro 4.6K',
        'Blackmagic URSA Mini Pro 4.6K G2': 'URSA Mini Pro 4.6K G2',
      },
      Canon: {
        'Canon EOS-1D X Mark III': 'EOS-1D X Mark III',
        'Canon EOS 5D Mark IV': 'EOS 5D Mark IV',
        'Canon EOS C300 Mark III': 'EOS C300 Mark III',
        'Canon EOS R5': 'EOS R5',
        'Canon EOS R6': 'EOS R6',
      },
      DJI: {
        'DJI Zenmuse X4S': 'Zenmuse X4S',
        'DJI Zenmuse X5': 'Zenmuse X5',
        'DJI Zenmuse X5R': 'Zenmuse X5R',
        'DJI Zenmuse X5S': 'Zenmuse X5S',
        'DJI Zenmuse X7': 'Zenmuse X7',
      },
      Fujifilm: {
        'Fujifilm GFX 100S': 'GFX 100S',
        'Fujifilm X-S10': 'X-S10',
        'Fujifilm X-T30': 'X-T30',
        'Fujifilm X-T4': 'X-T4',
        'Fujifilm X100V': 'X100V',
      },
      GoPro: {
        'GoPro Fusion': 'Fusion',
        'GoPro HERO7 Black': 'HERO7 Black',
        'GoPro HERO8 Black': 'HERO8 Black',
        'GoPro HERO9 Black': 'HERO9 Black',
        'GoPro MAX': 'MAX',
      },
      Hasselblad: {
        'Hasselblad H5D-50c': 'H5D-50c',
        'Hasselblad H6D-100c': 'H6D-100c',
        'Hasselblad H6D-50c': 'H6D-50c',
        'Hasselblad X1D II 50C': 'X1D II 50C',
        'Hasselblad X1D-50c': 'X1D-50c',
      },
      Leica: {
        'Leica CL': 'CL',
        'Leica D-Lux 7': 'D-Lux 7',
        'Leica M10-R': 'M10-R',
        'Leica Q2 Monochrom': 'Q2 Monochrom',
        'Leica SL2-S': 'SL2-S',
      },
      Nikon: {
        'Nikon D780': 'D780',
        'Nikon D850': 'D850',
        'Nikon Z5': 'Z5',
        'Nikon Z6 II': 'Z6 II',
        'Nikon Z7 II': 'Z7 II',
      },
      Olympus: {
        'Olympus OM-D E-M1 Mark III': 'OM-D E-M1 Mark III',
        'Olympus OM-D E-M1X': 'OM-D E-M1X',
        'Olympus OM-D E-M5 Mark III': 'OM-D E-M5 Mark III',
        'Olympus PEN-F': 'PEN-F',
        'Olympus Tough TG-6': 'Tough TG-6',
      },
      Panasonic: {
        'Panasonic Lumix DC-G9': 'Lumix DC-G9',
        'Panasonic Lumix DC-GH5': 'Lumix DC-GH5',
        'Panasonic Lumix DC-GH5S': 'Lumix DC-GH5S',
        'Panasonic Lumix DC-S1H': 'Lumix DC-S1H',
        'Panasonic Lumix DC-S5': 'Lumix DC-S5',
      },
      Pentax: {
        'Pentax 645Z': '645Z',
        'Pentax K-1 Mark II': 'K-1 Mark II',
        'Pentax K-3 III': 'K-3 III',
        'Pentax K-70': 'K-70',
        'Pentax KP': 'KP',
      },
      'Phase One': {
        'Phase One IQ3 100MP Trichromatic': 'IQ3 100MP Trichromatic',
        'Phase One IQ4 100MP Trichromatic': 'IQ4 100MP Trichromatic',
        'Phase One IQ4 150MP': 'IQ4 150MP',
        'Phase One IQ4 Achromatic': 'IQ4 Achromatic',
        'Phase One XT': 'XT',
      },
      RED: {
        'RED DSMC2 HELIUM 8K S35': 'DSMC2 HELIUM 8K S35',
        'RED DSMC2 MONSTRO 8K VV': 'DSMC2 MONSTRO 8K VV',
        'RED KOMODO 6K': 'KOMODO 6K',
        'RED RANGER HELIUM 8K S35': 'RANGER HELIUM 8K S35',
        'RED RANGER MONSTRO 8K VV': 'RANGER MONSTRO 8K VV',
      },
      Ricoh: {
        'Ricoh GR III': 'GR III',
        'Ricoh GR III Street Edition': 'GR III Street Edition',
        'Ricoh Theta V': 'Theta V',
        'Ricoh Theta Z1': 'Theta Z1',
        'Ricoh WG-6': 'WG-6',
      },
      Sigma: {
        'Sigma dp0 Quattro': 'dp0 Quattro',
        'Sigma fp': 'fp',
        'Sigma fp L': 'fp L',
        'Sigma sd Quattro': 'sd Quattro',
        'Sigma sd Quattro H': 'sd Quattro H',
      },
      Sony: {
        'Sony Alpha a6600': 'ILCE-6600',
        'Sony Alpha a7R IV': 'ILCE-7RM4',
        'Sony Alpha a7S III': 'ILCE-7SM3',
        'Sony Alpha a9 II': 'ILCE-9M2',
        'Sony Alpha 1': 'ILCE-1',
        'Sony Alpha 7C': 'ILCE-7C',
        'Sony Alpha 7 III': 'ILCE-7M3',
        'Sony Cyber-shot DSC-RX100 VII': 'DSC-RX100M7',
        'Sony Cyber-shot DSC-RX100 VIII': 'DSC-RX100M8',
        'Sony Cyber-shot DSC-RX1R II': 'DSC-RX1RM2',
        'Sony ZV-E10': 'ZV-E10',
      },
    };

    if (modelMap[brand] && modelMap[brand][cameraName]) {
      return modelMap[brand][cameraName];
    } else {
      return 'Model not found';
    }
  };

  //Update camera model based on camera name
  const handleCameraNameChange = event => {
    const selectedCameraName = event.target.value;
    setName(selectedCameraName);
    // Here you can call a method to get and set the model name based on the selected camera name
    const selectedModel = getModelNameByBrand(brand, selectedCameraName);
    setModel(selectedModel);
  };

  const handleCloseModal = () => {
    onClose();
    resetStates();
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
        whatsIncluded,
        isSelling,
        wasSold,
        location,
        user: userId,
      };

      if (img.length > 0) {
        const uploadData = new FormData();

        // Append each image to the FormData
        img.forEach((image, index) => {
          uploadData.append('files', image);
        });
        const response = await upload(uploadData);
        console.log(response.data);

        requestBody.img = response.data.img;
      }

      await addCamera(requestBody);

      navigate(`/users/${user._id}`);
      getCameras();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImages = ({ target }) => {
    // Convert FileList to Array
    const filesArray = Array.from(target.files);
    setImg(filesArray);
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
                  <FormLabel isRequired>Brand</FormLabel>
                  <Select
                    placeholder="Select brand"
                    onChange={handleBrandChange}
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

                {brand && (
                  <FormControl isRequired>
                    <FormLabel>Camera Name</FormLabel>
                    <Select
                      placeholder="Select camera name"
                      onChange={handleCameraNameChange}
                    >
                      {cameraNames.map((cameraName, index) => (
                        <option key={index} value={cameraName}>
                          {cameraName}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText>
                      The camera's commercial name
                    </FormHelperText>
                  </FormControl>
                )}

                {name && (
                  <VStack>
                    <FormControl isRequired>
                      <FormLabel>Model</FormLabel>
                      <Input
                        isReadOnly
                        value={model}
                        onChange={e => setModel(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Images</FormLabel>

                      <Input type="file" multiple onChange={handleImages} />
                      <FormHelperText>max = 5</FormHelperText>
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
                        <option value="Ilha da Graciosa">
                          Ilha da Graciosa
                        </option>
                        <option value="Ilha da Madeira">Ilha da Madeira</option>
                        <option value="Ilha das Flores">Ilha das Flores</option>
                        <option value="Ilha de Porto Santo">
                          Ilha de Porto Santo
                        </option>
                        <option value="Ilha de Santa Maria">
                          Ilha de Santa Maria
                        </option>
                        <option value="Ilha de São Jorge">
                          Ilha de São Jorge
                        </option>
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
                        <option value="Viana do Castelo">
                          Viana do Castelo
                        </option>
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
                )}
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={handleCloseModal}>
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
