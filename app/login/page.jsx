"use client";

import React,{useState} from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import { login } from "./action";
import toast, { Toaster } from "react-hot-toast";

// import {AcmeIcon} from "./acme";



async function handleLogin(formData) {
  const response = await login(formData);
  if (!response.success) {
    toast.error(response.message);
  } else {
    toast.success(response.message);
    window.location.href = '/dashboard';
  }
}


export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);






const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  const formData = new FormData(event.currentTarget);
  await handleLogin(formData);
  setLoading(false);
};

  return (
    <div className="flex h-full  w-full flex-col items-center justify-center">
        <p className="text-2xl mt-4 font-bold text-center">Log In</p>

      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />

          <Input
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
            variant="bordered"
          />

          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button color="primary" type="submit" className="font-semibold text-white">
            Log In
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
          Need to create an account?&nbsp;
          <Link href="/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}