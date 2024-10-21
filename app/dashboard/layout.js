"use client";
import React from "react";
import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = pb.authStore.model;
    console.log(user);
    setUser(user);

    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {children}

      <div className="mt-24">
        {/* {
                JSON.stringify(user)
              } */}
      </div>
    </>
  );
}
