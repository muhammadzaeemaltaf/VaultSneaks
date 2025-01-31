import axios from 'axios';
import { client } from '../lib/client';

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: string;
    gender: string;
    profilePicture: string;
}

async function uploadImageToSanity(imageUrl: string) {
    try {
      console.log(`Uploading image: ${imageUrl}`);
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);
      const asset = await client.assets.upload('image', buffer, {
        filename: imageUrl.split('/').pop()
      });
      console.log(`Image uploaded successfully: ${asset._id}`);
      return asset._id;
    } catch (error) {
      console.error('Failed to upload image:', imageUrl, error);
      return null;
    }
}

async function createUserInSanity(userData: User) {
  try {
    const { email, password, firstName, lastName, dateOfBirth, country, gender, profilePicture } = userData;

    // Check if the email already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    const imageId = await uploadImageToSanity(profilePicture);

    const newUser = {
      _type: 'user',
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      country,
      gender,
      profilePicture: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
      },
    };

    const result = await client.create(newUser);
    console.log('User created successfully:', result);
    return { success: true, userId: result._id };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { success: false, message: "Registration failed. Please try again." };
  }
}

export { createUserInSanity };


