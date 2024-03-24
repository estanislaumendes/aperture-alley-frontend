import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCamera } from '../api/cameras.api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Tooltip,
  Button,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';

function DeleteCamerasDialog({ cameraId, getCameras }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    onClose();
  };

  const handleDelete = async () => {
    try {
      await deleteCamera(cameraId);
      navigate(`/users/${user._id}`);
      getCameras();
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip label="Delete Camera" fontSize="sm">
        <Button
          borderRadius="50%"
          variant="ghost"
          colorScheme="red"
          onClick={onOpen}
        >
          <DeleteIcon />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Camera
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteCamerasDialog;
