// ShareModal.js
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function ShareModal({ isOpen, onClose, pageURL }) {
  const [copyText, setCopyText] = useState("Copy");
  const link = "https://homeportfolio.com" + pageURL;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopyText("Copied!");
    setTimeout(() => setCopyText("Copy"), 2000);
  };

  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(link);
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedUrl}`,
      instagram: `https://www.instagram.com/share?url=${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Modal  backdrop="blur" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader>Share this property</ModalHeader>
          <ModalBody className="flex flex-col gap-4 items-center p-4">
            <div className="flex items-center gap-2 w-full">
              <Input
                readOnly
                value={link}
                className="w-full"
                bordered
                aria-label="Share Link"
              />
              <Button auto onPress={handleCopy}>
                {copyText}
              </Button>
            </div>

            <div className="flex gap-4 justify-center">
              <Button isIconOnly variant="bordered" radius="full" onPress={() => shareToSocial('facebook')}>
                <Icon icon="logos:facebook" width="30" height="30" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full" onPress={() => shareToSocial('twitter')}>
                <Icon icon="devicon:twitter" width="30" height="24" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full" onPress={() => shareToSocial('telegram')}>
                <Icon icon="logos:telegram" width="30" height="30" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full" onPress={() => shareToSocial('whatsapp')}>
                <Icon icon="logos:whatsapp-icon" width="30" height="30" />
              </Button>
              <Button isIconOnly variant="bordered" radius="full" onPress={() => shareToSocial('instagram')}>
                <Icon icon="skill-icons:instagram" width="28" height="28" />
              </Button>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
