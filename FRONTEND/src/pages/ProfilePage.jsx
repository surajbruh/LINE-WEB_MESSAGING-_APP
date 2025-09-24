import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../utils/notification";
import { Camera } from "lucide-react";
import { useHeightContext } from "../utils/heightContext";
import { fetchAvatarThunk, updateAvatarThunk } from "../features/auth/authSlice";

const ProfilePage = () => {

    const { authUser, authUserAvatar, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Preview selected image
    useEffect(() => {
        if (!selectedFile) return
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreviewUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    //UPATES USER AVATAR
    const handleUpload = async () => {
        if (!selectedFile) return errorToast("Please select an image");

        const formData = new FormData();
        formData.append("profilePic", selectedFile);

        const result = await dispatch(updateAvatarThunk(formData))
        if (updateAvatarThunk.rejected.match(result)) {
            errorToast("upload failed")
        } else {
            successToast("upload success")
        }
        setSelectedFile(null)
    };

    useEffect(() => {
        dispatch(fetchAvatarThunk())
    }, [selectedFile])

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
                        {isLoading.fetchAvatar ?
                            <h1>loading...</h1>
                            :
                            <>
                                <label htmlFor="fileInput">
                                    <Camera size={35} className="absolute right-0 bottom-0 rounded-full bg-green-600 p-1" />
                                </label>
                                <img
                                    src={
                                        previewUrl ||
                                        authUserAvatar ||
                                        "/avatar.png"
                                    }
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-md"
                                />
                            </>
                        }
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
                            disabled={isLoading.avatar}
                            onClick={handleUpload}
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-70"
                        >
                            {isLoading.avatar ? "Uploading..." : "Upload Picture"}
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
