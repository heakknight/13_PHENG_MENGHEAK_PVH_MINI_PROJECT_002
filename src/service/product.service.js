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

export const getProductByIdService = async (id) => {
  const session = await auth();
  const token = session?.user?.accessToken;

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/products/${id}`, {
      cache: "no-store",  
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      console.error(`Error fetching product ${id}:`, response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch exception in getProductByIdService:", error);
    return null;
  }
};


export const patchProductRatingService = async (id, rating) => {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    return { success: false, error: "unauthorized" };
  }

  try {
    const response = await fetch(
      `${process.env.AUTH_API_URL}/products/${id}/rating?star=${rating}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      return { success: false, error: "unauthorized" };
    }

    if (!response.ok) {
      return { success: false, error: "Failed to update rating" };
    }

    const data = await response.json();
    return { success: true, payload: data.payload ?? data };

  } catch (error) {
    console.error("Fetch exception:", error);
    return { success: false, error: "Server exception" };
  }
};

export const createProductService = async (payload) => {
  const session = await auth();
  const token = session?.user?.accessToken;
  if (!token) return { success: false, error: "unauthorized" };

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 401) return { success: false, error: "unauthorized" };
    if (!response.ok) return { success: false, error: "Failed to create product" };
    const data = await response.json();
    return { success: true, payload: data.payload ?? data };
  } catch (error) {
    console.error("createProductService error:", error);
    return { success: false, error: "Server exception" };
  }
};

export const updateProductService = async (productId, payload) => {
  const session = await auth();
  const token = session?.user?.accessToken;
  if (!token) return { success: false, error: "unauthorized" };

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 401) return { success: false, error: "unauthorized" };
    if (!response.ok) return { success: false, error: "Failed to update product" };
    const data = await response.json();
    return { success: true, payload: data.payload ?? data };
  } catch (error) {
    console.error("updateProductService error:", error);
    return { success: false, error: "Server exception" };
  }
};

export const deleteProductService = async (productId) => {
  const session = await auth();
  const token = session?.user?.accessToken;
  if (!token) return { success: false, error: "unauthorized" };

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) return { success: false, error: "unauthorized" };
    if (!response.ok) return { success: false, error: "Failed to delete product" };
    return { success: true };
  } catch (error) {
    console.error("deleteProductService error:", error);
    return { success: false, error: "Server exception" };
  }
};