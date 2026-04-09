"use server"

import { registerService } from "../service/auth.service";

async function registerAction(data){
  try{
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || " ";

    const payload = {
      firstName,
      lastName,
      email: data.email,
      password: data.password,
      birthDay: data.birthDay
    };

    const result = await registerService(payload);
    return result;
  }catch (error) {
    return {
      success: false,
      message: error.message || "Register failed",
    };
  }
}

export default registerAction;