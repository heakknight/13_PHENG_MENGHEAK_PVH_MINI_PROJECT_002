export const loginService = async (data) => {
  const user = {
    email: data.email,
    password: data.password
  };

  const response = await fetch(`${process.env.AUTH_API_URL}/auths/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    return null; 
  }

  const result = await response.json();
  return result;
}

export const registerService = async (data) => {
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    birthDate: data.birthDate
  };

  const response = await fetch(`${process.env.AUTH_API_URL}/auths/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

  const result = await response.json();
  return result;
}