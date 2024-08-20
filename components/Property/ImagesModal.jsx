'use client';
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image
} from "@nextui-org/react";

const ImageModal = ({ isOpen, onOpenChange, images }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      className="w-full h-full"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      scrollBehavior={"inside"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">All Photos</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-3 gap-4">
                {images && images.map((image, index) => (
                  <div key={index} className="w-full">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
