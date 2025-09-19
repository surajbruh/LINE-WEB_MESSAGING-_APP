import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../utils/notification";
import { Camera } from "lucide-react";
import { getProfilePic, updateProfilePic } from "../../api";
import { useCallback } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useHeightContext } from "../utils/heightContext";

const ProfilePage = () => {

    const { authUser } = useSelector((state) => state.auth);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [profilePic, setProfilePic] = useState("")

    // Preview selected image
    useEffect(() => {
        if (!selectedFile) return
        const objectUrl = URL.createObjectURL(selectedFile)
        console.log(objectUrl)
        setPreviewUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const userProfilePic = useCallback(async () => {
        const response = await getProfilePic()
        if (response && response.success && response.url) {
            setProfilePic(response.url)
        }
    }, [])

    useEffect(() => {
        userProfilePic()
    }, [userProfilePic, uploading])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return errorToast("Please select an image");

        const formData = new FormData();
        formData.append("profilePic", selectedFile);

        try {
            setUploading(true);
            const result = await updateProfilePic(formData)
            console.log(result)

            if (result.success) {
                successToast("Profile picture updated!");
                setSelectedFile(null);
                setPreviewUrl(null);
                // Ideally refetch user profile data here
            } else {
                errorToast(result.message || result.error || "Upload failed");
            }
        } catch (error) {
            errorToast("Unexpected server error");
        } finally {
            setUploading(false);
        }
    };

    const navHeight = useHeightContext()

    return (
        <div
            style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
            className="flex items-center justify-center min-h-screen px-4 bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
            <div className="w-full max-w-lg rounded-xl shadow-md p-6 bg-[var(--color-bg-surface)]">
                {/* Header */}
                <h1 className="text-2xl font-bold uppercase text-center mb-6">
                    My Profile
                </h1>

                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <label htmlFor="fileInput">
                            <Camera size={35} className="absolute right-0 bottom-0 rounded-full bg-green-600 p-1" />
                        </label>
                        <img
                            src={
                                previewUrl ||
                                profilePic ||
                                "https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg"
                            }
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-md"
                        />
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {previewUrl && (
                        <button
                            disabled={uploading}
                            onClick={handleUpload}
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-70"
                        >
                            {uploading ? "Uploading..." : "Upload Picture"}
                        </button>
                    )}
                </div>

                {/* User Info */}
                <div className="mt-10 space-y-4 text-left">
                    <div>
                        <h1 className="uppercase font-bold">username</h1>
                        <span className="font-bold">{authUser.username} </span>
                    </div>
                    <div>
                        <h1 className="uppercase font-bold">email</h1>
                        <span className="font-bold">{authUser.email} </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
