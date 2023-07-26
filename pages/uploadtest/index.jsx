// Nextjs로 파일 업로드 및 썸네일 보여주기

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";
import MainLayout from "../../components/Main/MainLayout";

const UploadTest = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/main/login");
    }
  }, [status]);

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setThumbnail(acceptedFiles[0].preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbs = files.map((file) => (
    <div className="flex justify-center items-center w-[500px] h-[500px] bg-[#F2F2F2] mr-[20px]">
      <img src={file.preview} className="w-full h-full" />
    </div>
  ));

  const UploadTest = async () => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    formData.append("userId", session?.token?.user?.id);
    formData.append("userName", session?.token?.user?.name);
    formData.append("userEmail", session?.token?.user?.email);
    await axios
      .post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        router.push("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainLayout>
      <div className="w-full h-screen flex justify-center">
        <div className="w-[500px] h-[500px] flex flex-col justify-center">
          <div className="w-full h-[200px] flex flex-col items-center">
            <div
              {...getRootProps()}
              className="w-[400px] h-[400px] p-4 flex justify-center items-center border border-[#182a5b] rounded-[10px] cursor-pointer mb-5"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
            {thumbs}
          </div>
          {/* <div className="w-full h-[50px] flex justify-center items-center mt-5">
          <button
            className="w-[400px] h-[50px] bg-[#182a5b] rounded-[10px] text-white text-[16px] focus:outline-none"
            onClick={null}
          >
            업로드
          </button>
        </div> */}
        </div>
      </div>
    </MainLayout>
  );
};
export default UploadTest;
