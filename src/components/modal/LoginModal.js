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
import { useTranslation } from "react-i18next";

const LoginModal = ({ isOpen, onClose, message = "LOGIN_REQUIRED_ACTION" }) => {
  const { t } = useTranslation("common");
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
        <ModalHeader>{t("LOGIN_REQUIRED_TEXT")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t(message)}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleClick}
            bgColor="brand.900"
            _hover={{ bgColor: "orange.400" }}
            color="white"
          >
            {t("LOGIN")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
