"use server"

import { signIn } from "../app/auth";

async function signInAction(data){
  await signIn("credentials",{
    email: data.email,
    password: data.password,
    redirectTo: "/"
  })
};


export default signInAction;