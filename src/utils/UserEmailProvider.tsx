/* eslint-disable @typescript-eslint/no-unused-vars */
// UserEmailProvider.tsx

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

let currentUserEmail: string | null = null;

type UserEmailProviderProps = {
  email?: string | null; // Allow passing email as a prop
};

const UserEmailProvider = ({ email }: UserEmailProviderProps) => {
  const { user } = useUser();

  // Use the passed email prop or fallback to the user context email
  useEffect(() => {
    currentUserEmail = email || user?.emailAddresses[0]?.emailAddress || null;

    if (!currentUserEmail) {
      console.warn("User email not found. Ensure the user is logged in.");
    }
  }, [email, user]);

  return null; // This component doesn't render anything
};

export const initializeUserEmail = () => {
  if (!currentUserEmail) {
    console.warn("User email is not set. Please render the UserEmailProvider.");
  }
  return currentUserEmail;
};

export default UserEmailProvider;
