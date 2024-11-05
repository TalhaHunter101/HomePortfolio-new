// ShareModal.js
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function ShareModal({ isOpen, onClose }) {
  const [link] = useState("https://homeportfolio.com/proper");

  return (
    <Modal isDismissable={false} backdrop="blur" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader>Share this property</ModalHeader>
          <ModalBody className="flex flex-col gap-4 items-center p-4">
            {/* Link with Copy Button */}
            <div className="flex items-center gap-2 w-full">
              <Input
                readOnly
                value={link}
                className="w-full"
                bordered
                aria-label="Share Link"
              />
              <Button auto onPress={() => navigator.clipboard.writeText(link)}>
                Copy
              </Button>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 justify-center">
              <Button isIconOnly variant="bordered" radius="full">
                <Icon icon="logos:facebook" width="30" height="30" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full">
                <Icon icon="devicon:twitter" width="30" height="24" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full">
                <Icon icon="logos:telegram" color="red" width="30" height="30" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full">
                <Icon icon="logos:whatsapp-icon" color="green" width="30" height="30" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full">
                <Icon icon="skill-icons:instagram" width="28" height="28" />
              </Button>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
