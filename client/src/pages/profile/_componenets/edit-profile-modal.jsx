/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { usePlayer } from "@/queries/usePlayer";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditProfileModal({ open, setOpen, playerData, userData }) {
  const { updatePlayerMutate, updateUserMutate, uploadProfilePicMutate } = usePlayer();
  const { toast } = useToast();

  const [editedUser, setEditedUser] = useState(userData);
  const [bio, setBio] = useState(playerData?.bio || "");
  const [profilePic, setProfilePic] = useState(playerData?.profilePic || "");
  const [previewPic, setPreviewPic] = useState("src/assets/profile/noPfp.jpg");

  // Sync user data when userData or playerData changes
  useEffect(() => {
    if (userData) {
      setEditedUser({
        name: userData.name || "",
      });
      setBio(playerData?.bio || "");
      setProfilePic(playerData?.profilePic || "");
      setPreviewPic(null);
    }
  }, [userData, playerData]);

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

  const handleProfilePicChange = (file) => {
    if (!file) return;
    setPreviewPic(URL.createObjectURL(file));
    setProfilePic(file);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    
    try {
      // First, upload the profile picture if a new one is selected
      let profilePicPath = playerData?.profilePic;
      if (profilePic instanceof File) {
        const formData = new FormData();
        formData.append("profilePic", profilePic);
        const response = await uploadProfilePicMutate(formData);
        profilePicPath = response.profilePic;
      }

      // Then, update the profile (bio and profile pic)
      await updatePlayerMutate({
        id: userData.id,
        bio,
        profilePic: profilePicPath,
      });

      // Finally, update the name
      await updateUserMutate({
        id: userData.id,
        name: editedUser.name,
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={updateProfileHandler}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="profilePic">Profile Picture</Label>
              <div className="flex justify-center">
                {previewPic ? (
                  <img src={previewPic} alt="src/assets/profile/noPfp.jpg" className="w-32 h-32 rounded-full" />
                ) : (
                  profilePic && <img src={profilePic} alt="src/assets/profile/noPfp.jpg" className="w-32 h-32 rounded-full" />
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => document.getElementById('profilePicUpload').click()}
                  
                >
                  Upload Profile Picture
                </Button>
              </div>
              <input
                id="profilePicUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleProfilePicChange(e.target.files[0])}
              />
            </div>
          <div className="flex flex-col gap-4">
            {/* Name Input */}
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
            
            {/* Bio Input */}
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

            {/* Profile Picture Preview and Upload */}
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}