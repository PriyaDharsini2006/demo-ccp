"use client";

import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ImageComp = ({ user }: { user: any }) => {
  const email = user.email;
  const router = useRouter();
  const handleUploadSuccess = async (res: any) => {
    const url = res.info;
    try {
      await axios.put("/api/user", { email, url });
      toast.success("Image updated");
      router.refresh();
    } catch (error) {
      toast.error("Error updating image");
    }
  };

  return (
    <Flex justify="center">
      <div className="relative flex justify-center items-center">
        <CldImage
          src={user.image ? user.image : ""}
          width="200"
          height="200"
          alt="Image wasn't available"
          radius="300"
          crop={{ type: "auto" }}
          className="rounded-full object-cover shadow-md"
          style={{ zIndex: 1 }} // Set z-index for image
        />
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{ zIndex: 10 }} // Higher z-index for the button container
        >
          <CldUploadButton
            uploadPreset="klhusdyw"
            onSuccess={handleUploadSuccess}
            onClose={() => {
              toast.success("Image updated");
              router.refresh();
            }}
            className="bg-white text-black py-2 px-4 rounded-lg shadow-lg"
          >
            Upload Image
          </CldUploadButton>
        </div>
      </div>
    </Flex>
  );
};

export default ImageComp;
