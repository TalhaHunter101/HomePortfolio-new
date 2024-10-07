import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

export default function ProfileModal({ isOpen, onOpenChange, user, onSave }) {
  const [updatedUser, setUpdatedUser] = useState(user);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save the updated user information
  const handleSave = () => {
    onSave(updatedUser); // Pass updated user back to parent
    onOpenChange(false); // Close the modal
  };

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Update Profile</ModalHeader>
            <ModalBody>
              {/* Input fields for updating user data */}
              <div className="space-y-4 w-full">
                <div className="w-full">
                  <Input
                    variant="bordered"
                    type="text"
                    name="name"
                    value={updatedUser.name || ""}
                    onChange={handleInputChange}
                    className="w-full"
                    label="Name"
                  />
                </div>

                <div className="w-full">
                  <Input
                    isReadOnly
                    variant="bordered"
                    type="text"
                    name="username"
                    value={updatedUser.username || ""}
                    onChange={handleInputChange}
                    className="w-full"
                    label="Username"
                  />
                </div>

                <div className="w-full">
                  <Input
                    isReadOnly
                    variant="bordered"
                    type="email"
                    name="email"
                    value={updatedUser.email || ""}
                    className="w-full"
                    label="Email"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                Close
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
