import { Buffer } from "buffer"; // NEW: Polyfill Buffer for client-side usage
import axios from "axios";
import { client } from "../lib/client";

export async function uploadImageToSanity(imageUrl: string) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", imageUrl, error);
    return null;
  }
}

export async function uploadFileToSanity(file: File) {
  try {
    console.log(`Uploading file: ${file.name}`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
    });
    console.log(`File uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload file:", file.name, error);
    return null;
  }
}

export async function updateUserInSanity(user: any, file?: File) {
  console.log(user)
  try {
    let uploadedImageId = typeof user.profilePicture !== "string" ? null : user.profilePicture; 

    if (file) {
      uploadedImageId = await uploadFileToSanity(file);
    }
    else if (typeof user.profilePicture === "string" && user.profilePicture.startsWith("image-")) {
    }
    else if (typeof user.profilePicture === "string" && user.profilePicture.startsWith("blob:")) {
      console.error("Profile picture is a blob URL. Please reselect the image file to upload.");
      uploadedImageId = null;
    }
    else if (typeof user.profilePicture === "string" && user.profilePicture) {
      uploadedImageId = await uploadImageToSanity(user.profilePicture);
    }


    const updatedUser = await client
      .patch(user._id) 
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password, 
        profilePicture: uploadedImageId
          ? { _type: "image", asset: { _ref: uploadedImageId } }
          : user.profilePicture, 
        dateOfBirth: user.dateOfBirth,
        country: user.country,
        gender: user.gender,
        isActive: user.isActive,
      })
      .commit();

    console.log("User updated successfully:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user in Sanity:", error);
    return null;
  }
}

export const getUserFromSanity = async (userId: string) => {
    const query = `*[_type == "user" && _id == $userId][0]`;
    const params = { userId };
    const user = await client.fetch(query, params);
    return user || [];
};