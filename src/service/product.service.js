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

export const getAllProductsService = async () => {
  const session = await auth();
  const token = session?.user?.accessToken;

  const response = await fetch(`${process.env.AUTH_API_URL}/products`, {
    cache: "no-store",
    headers: { 
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
  
  if (!response.ok) return null;
  return await response.json();
};

export const getAllCategoriesService = async () => {
  const session = await auth();
  const token = session?.user?.accessToken;

  const response = await fetch(`${process.env.AUTH_API_URL}/categories`, {
    cache: "no-store",
    headers: { 
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
  
  if (!response.ok) return null;
  return await response.json();
};