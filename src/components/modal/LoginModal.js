import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({
  isOpen,
  onClose,
  message = "You need to log in to perform this action.",
}) => {
  const navigation = useNavigate();

  function handleClick() {
    navigation("/Login");
  }
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login Required</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleClick}
            bgColor="brand.900"
            _hover={{ bgColor: "orange.400" }}
            color="white"
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
