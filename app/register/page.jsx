"use client";

import React,{useState} from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import toast, { Renderable, Toast, Toaster, ValueFunction } from "react-hot-toast";
import { useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  // async function handleSignup(formData, setLoading, router) {
  //   setLoading(true);
  //   const response = await signup(formData);
  //   setLoading(false);
    
  //   if (!response.success) {
  //     if (response.errors) {
  //       response.errors.forEach((error) => toast.error(error));
  //     } else if (response.message) {
  //       toast.error(response.message);
  //     }
  //   } else {
  //     toast.success('Registration successful!');
  //     router.push('/'); // Redirect on successful signup
  //   }
  // }


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   await handleSignup(formData, setLoading, router); 
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await pb.collection('users').create({ email, password, passwordConfirm });
  
        if (response.id) {
            toast.success('User registered successfully');

            pb.collection('users').authWithPassword(email, password);
            router.push('/dashboard');


        } else {
            toast.error(data.message);
        } 
    } catch (err) {
      toast.error(err.message);
    }
};


  return (
    <div className="flex h-full mt-16 w-full flex-col items-center justify-center">
<p className="text-2xl mt-4 font-bold text-center">Sign Up</p>

      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            variant="bordered"
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" type="submit" className="font-semibold text-white">
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>

        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
