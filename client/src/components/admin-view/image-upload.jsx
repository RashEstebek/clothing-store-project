import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import api from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode = false,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);

      const data = new FormData();
      data.append("my_file", imageFile);

      const response = await api.post("/api/admin/products/upload-image", data);

      console.log("UPLOAD RESPONSE:", response.data);

      const imageUrl =
        response?.data?.result?.secure_url ||
        response?.data?.result?.url ||
        "";

      console.log("FINAL IMAGE URL:", imageUrl);

      if (response?.data?.success && imageUrl) {
        setUploadedImageUrl(imageUrl);
      } else {
        console.log("Image URL not found in response");
        setUploadedImageUrl("");
      }
    } catch (error) {
      console.log("UPLOAD ERROR:", error.response?.data || error.message);
      setUploadedImageUrl("");
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div
      className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{imageFile.name}</p>
              {uploadedImageUrl ? (
                <a
                  href={uploadedImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-500 underline break-all"
                >
                  Uploaded image preview
                </a>
              ) : null}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;