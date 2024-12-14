/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { usePlayer } from "@/queries/usePlayer";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";

export default function EditProfileModal({ open, setOpen, userId }) {
  const { getPlayerData, updatePlayerMutate } = usePlayer();
  const { playerInfo, userInfo, isLoading, error } = getPlayerData();
  const { toast } = useToast();

  const [editedUser, setEditedUser] = useState({ name: "", bio: "", profilePic: "" });
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (userInfo) {
      setEditedUser({
        name: userInfo.name || "",
        bio: userInfo.bio || "",
        profilePic: userInfo.profilePic || "",
      });
      setBio(userInfo.bio || "");
      setProfilePic(userInfo.profilePic || "");
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePicChange = async (file) => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profilePic", file);
  
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      const uploadedFilePath = data.filePath;
  
      setProfilePic(uploadedFilePath);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed!",
        description: "There was an error uploading your profile picture.",
      });
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePlayerMutate({
        id: userId,
        name: editedUser.name,
        bio,
        profilePic,
      });
      setOpen(false); // Close the modal after successful update
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Update Failed!",
        description: err.message || "There was an error updating your profile.",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return (
      <div>
        <p>Failed to load user data: {error.message}</p>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={updateProfileHandler}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={editedUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Write something about yourself"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profilePic">Profile Picture</Label>
              <FileInput
                id="profilePic"
                name="profilePic"
                onChange={(e) => handleProfilePicChange(e.target.files[0])}
                accept="image/*"
              />
              <div className="mt-2">
                {profilePic && <img src={profilePic} alt="Profile Preview" className="w-32 h-32 rounded-full" />}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
