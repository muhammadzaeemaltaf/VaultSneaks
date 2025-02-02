"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, Edit2, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "../../../../store";
import { urlFor } from "@/sanity/lib/image";
import { toast, ToastContainer } from "react-toastify";
import {
  updateUserInSanity,
  getUserFromSanity,
} from "@/sanity/user/updateUserInSanity";

export default function AccountPage() {
  const { getUser, setUser: setUserStore } = useUserStore();
  const storedUser = getUser();
  const [user, setUser] = useState(storedUser);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchUserData = async () => {
    try {
      const data = await getUserFromSanity(user._id);
      setUser(data);
      setUserStore(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchUserData();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleActivateAccount = async () => {
    setIsLoading(true);
    try {
      // ...existing code...
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.email,
          subject: "Activate Your Account",
          text: "Please click the link below to activate your account.",
          userId: user._id,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to send activation email");
      }
      toast.success("Activation email sent");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delay helper function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSave = async () => {
    setIsEditing(false);
    setIsLoading(true);
    try {
      const updatedUser = await updateUserInSanity(user, selectedFile || undefined);
      if (!updatedUser) {
        toast.error("User update failed.");
        return;
      }
      setUserStore(updatedUser);
      toast.success("Profile updated successfully.");
      await delay(2000);
      await fetchUserData();
      await delay(2000);
      await fetchUserData();
    } catch (error: any) {
      toast.error("User update error.");
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePicture: previewUrl });
    }
  };

  const handleDeactivateAccount = async () => {
    setIsUpdating(true);
    try {
      const updatedUser = await updateUserInSanity({ ...user, isActive: false });
      if (!updatedUser) {
        toast.error("Failed to deactivate account.");
        return;
      }
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.email,
          subject: "Account Deactivated",
          text: "Your account has been deactivated.",
          userId: user._id,
        }),
      });
      if (!res.ok) throw new Error("Failed to send deactivation email");
      toast.success("Account deactivated and email sent.");
    setIsLoading(true);
      await delay(2000);
      await fetchUserData();
      await delay(2000);
      await fetchUserData();
    } catch (error: any) {
      console.error("Error deactivating account:", error);
      toast.error("Error deactivating account.");
    } finally {
        setIsLoading(false);
      setIsUpdating(false);
    }
  };

  if (!user || isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-2xl mx-auto animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <ToastContainer />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View and edit your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative flex items-center space-x-4">
            <div className="relative rounded-full w-20 h-20">
              <Avatar className="w-20 h-20">
                {typeof user.profilePicture === "string" &&
                  user.profilePicture && (
                    <AvatarImage
                      src={
                        user.profilePicture.startsWith("blob:")
                          ? user.profilePicture
                          : urlFor(user.profilePicture).url()
                      }
                      alt="Selected Product Image"
                      width={100}
                      height={100}
                      className="rounded border"
                    />
                  )}
                {typeof user.profilePicture === "object" &&
                  user.profilePicture && (
                    <AvatarImage
                      src={urlFor(user.profilePicture).url()}
                      alt="Selected Product Image"
                      width={100}
                      height={100}
                      className=" rounded border"
                    />
                  )}

                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <label
                    htmlFor="fileInput"
                    className="absolute bottom-0 right-0 p-1 bg-gray-200 border border-black rounded-full cursor-pointer"
                  >
                    <Edit2 size={16} />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <div
                className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Existing fields */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={user.country}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                readOnly
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={user.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!user.isActive && (
            <div
              className={`w-full text-center px-4 py-3 rounded relative ${
                user.unactiveByAdmin
                  ? "bg-red-100 border border-red-400 text-red-700"
                  : "bg-yellow-100 border border-yellow-400 text-yellow-700"
              }`}
              role="alert"
            >
              {user.unactiveByAdmin ? (
                <>
                  <strong className="font-bold">Dear {user.firstName},</strong>
                  <span className="block sm:inline">
                    {" "}
                    Your account is deactivated by admin. Contact us for more
                    details.
                  </span>
                </>
              ) : (
                <>
                  <strong className="font-bold">Warning:</strong>
                  <span className="block sm:inline">
                    {" "}
                    Your account is not activated. Please activate your account
                    to access all features.
                  </span>
                </>
              )}
            </div>
          )}
          {/* Hide buttons if account is deactivated by admin */}
          {!user.unactiveByAdmin && (
            <div className="flex justify-between w-full">
              {!user.isActive ? (
                <Button
                  onClick={handleActivateAccount}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Activate Account
                </Button>
              ) : isEditing ? (
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save Changes
                </Button>
              ) : (
                // When account is active and not editing, show Edit and Deactivate buttons
                <>
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Information
                  </Button>
                  <Button
                    onClick={handleDeactivateAccount}
                    disabled={isUpdating}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold"
                  >
                    {isUpdating  ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Deactivate Account
                  </Button>
                </>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
