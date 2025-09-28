import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

// Import Icons
import {
  LogOutIcon,
  VolumeOffIcon,
  Volume2Icon,
  LoaderIcon,
} from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isUpdatingProfileImage } =
    useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const based64Image = reader.result;
      setSelectedImg(based64Image);

      await updateProfile({ profileImage: based64Image });
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* AVATAR */}

          <div className="avatar online">
            <button
              className="relative overflow-hidden rounded-full size-14 group"
              onClick={() => fileInputRef.current.click()}
            >
              {isUpdatingProfileImage ? (
                <div className="flex items-center w-full h-full bg-white/20">
                  <LoaderIcon className="w-full h-5 text-center animate-spin" />
                </div>
              ) : (
                <img
                  src={selectedImg || authUser.profileImage || "/avatar.png"}
                  alt="User Profile Image"
                  className="object-cover size-full"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                <span className="text-xs text-white">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          {/* USERNAME */}
          <div>
            <h3 className="text-slate-200 font-medium text-sm max-w-[100px] truncate">
              {authUser.fullName || "Full Name"}
            </h3>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4">
          {/* LOGOUT BTN */}
          <button
            className="transition-colors text-salte-400 hover:text-slate-200"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="transition-colors text-slate-400 hover:text-slate-200"
            onClick={() => {
              // Play Click Sound Before Toggling
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => {
                console.log("Audio play failed: ", error);
              });
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
