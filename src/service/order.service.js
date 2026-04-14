import { auth } from "../app/auth";

export const createOrderService = async (payload) => {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    return { success: false, error: "unauthorized" };
  }

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      return { success: false, error: "unauthorized" };
    }

    if (!response.ok) {
      return { success: false, error: "Failed to create order" };
    }

    const data = await response.json();
    return { success: true, payload: data.payload ?? data };

  } catch (error) {
    console.error("createOrderService error:", error);
    return { success: false, error: "Server exception" };
  }
};

export const getOrdersService = async () => {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    return { success: false, error: "unauthorized" };
  }

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return { success: false, error: "unauthorized" };
    }

    if (!response.ok) {
      return { success: false, error: "Failed to fetch orders" };
    }

    const data = await response.json();
    return { success: true, payload: data.payload ?? data };

  } catch (error) {
    console.error("getOrdersService error:", error);
    return { success: false, error: "Server exception" };
  }
};  