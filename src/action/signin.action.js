"use server";

import { signIn } from "../app/auth";
import { AuthError } from "next-auth";

async function signInAction(data) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error; 
  }
}

export default signInAction;