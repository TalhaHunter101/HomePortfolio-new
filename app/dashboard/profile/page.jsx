'use client'; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import pb from '@/lib/pocketbase'; 
import { Button, Card, Image } from '@nextui-org/react';
import ProfileModal from '../../../components/profile/modal'; // Import the modal component
import { useDisclosure } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal hook

  useEffect(() => {
    // Get the authenticated user
    const currentUser = pb.authStore.model;

    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Function to extract the first letter from email
  const getInitial = (email) => {
    return email && email.length > 0 ? email.charAt(0).toUpperCase() : 'U'; // Default to 'U' if email is undefined or empty
  };

  // Handle user update from the modal
  const handleSave = (updatedUser) => {
    setUser(updatedUser); // Update the user data in the page
  };

  return (
    <div className="flex items-center justify-center mt-16 bg-gray-100 p-2">
      {user ? (
        <Card className="w-full mx-auto bg-white shadow-lg rounded-xl p-6  text-center space-y-4">
          {/* Profile Avatar */}
          <div className="flex justify-center">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-600"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center border-4 border-purple-600">
                <span className="text-gray-700 text-2xl">
                  {getInitial(user.email)}
                </span> 
              </div>
            )}
          </div>

          {/* Name and Username */}
          <h2 className="text-xl font-semibold text-gray-800">
            {user.name || 'Anonymous'} <span className="text-purple-500">({user.username})</span>
          </h2>

          {/* verified */}
         

          {/* Email */}
          <p className="text-gray-600">{user.email}</p>
          {user.verified ? (
            <p className="text-green-500"> <Icon icon="octicon:verified-16" className="inline" /> Verified</p>
          ) : (
            <p className="text-red-500"><Icon icon="octicon:unverified-16" className="inline" /> Not Verified</p>
          )}
          {/* Update Button to trigger the modal */}
          <div className="flex justify-center">
  <Button size='' className="bg-purple-600   justify-center hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out" onPress={onOpen}>
    Update
  </Button>
</div>

          {/* Modal for updating user info */}
          <ProfileModal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            user={user} 
            onSave={handleSave} // Pass the save function to modal
          />
        </Card>
      ) : (
        <Card>Error: No user data found</Card>
      )}
    </div>
  );
}
