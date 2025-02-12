import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        grant_type: "refresh_token",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error("No access token received");
    }

    return response.data.access_token;
  } catch (error: any) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );

    // Add more specific error handling
    if (error.response?.data?.error === "invalid_grant") {
      throw new Error(
        "Refresh token is invalid or expired. Please generate a new refresh token."
      );
    }

    throw error;
  }
};
