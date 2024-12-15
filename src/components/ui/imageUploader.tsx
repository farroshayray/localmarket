import React, { useState } from "react";
import axios from "axios";

interface ImageUploaderProps {
  currentImageUrl: string; // Existing image URL
  onUploadSuccess: (url: string) => void; // Callback to update parent with the new URL
  uploadUrl: string; // API endpoint for image upload
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onUploadSuccess,
  uploadUrl,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(currentImageUrl);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size exceeds 5 MB.");
      return;
    }

    // Set preview
    setImagePreview(URL.createObjectURL(file));
    setMessage(null);

    // Automatically upload image
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploading(false);
      onUploadSuccess(response.data.url); // Pass the uploaded image URL back to the parent
      setMessage("Image uploaded successfully!");
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image.");
    }
  };

  return (
    <div>
      <label htmlFor="imageUpload" className="block text-gray-700 font-medium mb-2">
        Upload Image
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full px-4 py-2 border rounded-lg cursor-pointer text-gray-500"
      />
      {imagePreview && (
        <div className="mt-4">
          <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
        </div>
      )}
      {uploading && <p className="text-gray-500 mt-2">Uploading...</p>}
      {message && (
        <p
          className={`mt-2 ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
