import { auth } from "../app/auth";

export const getTopSellingProductService = async () => {
  const session = await auth();
  const token = session?.user?.accessToken;
  console.log(token);

  const response = await fetch(`${process.env.AUTH_API_URL}/products/top-selling`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  const result = await response.json();
  return result;
}
