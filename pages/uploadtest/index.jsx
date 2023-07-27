// Nextjs로 멀티 파일 업로드 및 썸네일 보여주기

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

const UploadTest = () => {
  const { data: session, status, update } = useSession();
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: uuidv4(),
        })
      )
    );
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[600px] h-[600px] flex flex-col justify-center items-center">
        <div className="w-[500px] h-[500px] flex justify-center items-center">
          <div
            {...getRootProps()}
            className="w-[400px] h-[400px] border border-[#D9D9D9] flex justify-center items-center"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
        {/* <button
          className="w-[500px] h-[100px] border border-[#D9D9D9] flex justify-center items-center"
          onClick={handleUpload}
        >
          업로드
        </button> */}
      </div>
      <div className="w-[400px] flex flex-col">
        {files.map((file) => (
          <div key={file.id} className="">
            <img src={file.preview} /> <p>{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadTest;
