"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateUserInSanity } from "@/lib";
import axios from "axios";

const ActivationComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      activateUserInSanity(userId).then(async (updatedUser) => {
        try {
          if (updatedUser.email && updatedUser.firstName && updatedUser.lastName) {
            await axios.post("/api/send-email", {
              to: updatedUser.email,
              subject: "Account Activated Successfully",
              text: "Your account has been activated successfully.",
              isActivationSuccess: true,
              fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
              userId: userId
            }, { withCredentials: true });
            router.push("/login");
          } else {
            console.error("Missing required user fields for email.");
          }
        } catch (error) {
          console.error("Error sending activation success email:", error);
        }
      });
    }
  }, [userId, router]);

  return <div className='h-screen font-bold px-6 py-10'>Activating your account...</div>;
};

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10'>
      <Suspense fallback={<div>Loading...</div>}>
        <ActivationComponent />
      </Suspense>
    </div>
  );
};

export default page;