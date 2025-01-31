import { Users } from "lucide-react";

export const UserSchema = {
  name: "user",
  type: "document",
  title: "User",
  icon: Users,
  fields: [
    {
      name: "email",
      type: "string",
      title: "Email Address",
      validation: (Rule: any) =>
        Rule.required().email().error("Invalid email address"),
    },
    {
      name: "password",
      type: "string",
      title: "Password",
      description: "Ensure the password is secure.",
      validation: (Rule: any) =>
        Rule.required().min(8).error("Password must be at least 8 characters"),
    },
    {
      name: "firstName",
      type: "string",
      title: "First Name",
      validation: (Rule: any) => Rule.required().error("First Name is required"),
    },
    {
      name: "lastName",
      type: "string",
      title: "Last Name",
      validation: (Rule: any) => Rule.required().error("Last Name is required"),
    },
    {
      name: "dateOfBirth",
      type: "date",
      title: "Date of Birth",
      description: "Enter your date of birth in YYYY-MM-DD format.",
      validation: (Rule: any) => Rule.required().error("Date of Birth is required"),
    },
    {
      name: "country",
      type: "string",
      title: "Country",
      validation: (Rule: any) => Rule.required().error("Country is required"),
    },
    {
      name: "gender",
      type: "string",
      title: "Gender",
      options: {
        list: [
          { title: "Male", value: "Male" },
          { title: "Female", value: "Female" },
        ],
      },
      validation: (Rule: any) => Rule.required().error("Gender is required"),
    },
    {
      name: "profilePicture",
      type: "image",
      title: "Profile Picture",
      description: "Upload a profile picture.",
      options: {
        hotspot: true, // Enables image cropping in Sanity Studio
      },
      validation: (Rule: any) => Rule.required().error("Profile picture is required"),
    },
    {
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      initialValue: false,
      description: "Indicates whether the user account is active.",
    },
  ],
};
