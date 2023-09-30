"use client";

import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from 'next/image'

interface FileUploadProps {
  onChange: (url?: string) => void,
  value: string,
  endpoint: "messageFile" | "serverImage"
}

const FileUpload = ({ 
  onChange,
  value,
  endpoint
}: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image 
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        <button 
          className="absolute top-0 right-0 bg-rose-500 rounded-full p-1"
          onClick={() => onChange("")}
        >
          <X className="text-white h-4 w-4"/>
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      appearance={{
        button: "text-black"
      }}
    />
  );
}

export default FileUpload;