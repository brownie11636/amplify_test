import { useRouter } from "next/router";
import MainLayout from "../../../components/Main/MainLayout";
import MainView from "../../../components/Main/MainView";
import Image from "next/image";
import { useState } from "react";
import ArmController from "../../../components/Main/ArmController";

const Test = () => {
  const router = useRouter();
  const [controlVisible, setControlVisible] = useState(false);
  console.log(controlVisible);
  return (
    <>
      <MainLayout>
        <section className="px-[60px]">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl">Test1</span>
            <div className="flex gap-[30px]">
              <div className="flex">
                <button className="w-[100px] h-[50px] bg-white flex gap-[10px] justify-center items-center">
                  <span className="relative w-[10px] h-[10px]">
                    <picture>
                      <Image src={"/images/main/playBtn.svg"} fill draggable={false} alt="" />
                    </picture>
                  </span>
                  <span>재생</span>
                </button>
                <button className="w-[100px] h-[50px] bg-white flex gap-[10px] justify-center items-center">
                  <span className="relative w-[10px] h-[10px]">
                    <picture>
                      <Image src={"/images/main/stopBtn.svg"} fill draggable={false} alt="" />
                    </picture>
                  </span>
                  <span>저장</span>
                </button>
              </div>
              <button
                className="w-[130px] h-[50px] flex justify-center items-center bg-[#182A5B]"
                onClick={() => {
                  setControlVisible(!controlVisible);
                }}
              >
                <span className="text-white">Control</span>
              </button>
            </div>
          </div>
          <MainView />
        </section>
        <section className="flex flex-col w-[342px] h-fit gap-[26px] border-l-[4px] border-[#182A5B] mr-[180px]">
          <div className="w-full h-fit p-[30px] bg-white flex flex-col gap-[20px]">
            <span className="mb-[4px] text-[#182A5B]">로봇 정보</span>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d]">Robot ID</span>
              <span className="min-w-[160px]">abv-12131-af</span>
            </div>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d] min">Serial number</span>
              <span className="min-w-[160px]">ab2315312</span>
            </div>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d]">Robot name</span>
              <span className="min-w-[160px]">CB1-반도체A</span>
            </div>
          </div>
        </section>
        <ArmController visible={controlVisible} />
      </MainLayout>
    </>
  );
};

export default Test;
