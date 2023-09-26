"use client";

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
  return (
    <div>
      File Upload Component
    </div>
  );
}

export default FileUpload;