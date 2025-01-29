import axios from "axios";

export const loginUser = async (email: string, password: string, keepSignedIn: boolean) => {
  try {
    const response = await axios.post("/api/login", { email, password, keepSignedIn });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
