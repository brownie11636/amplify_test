import { useRouter } from "next/router";
import MainLayout from "../../../components/Main/MainLayout";
import MainView from "../../../components/Main/MainView";
import Image from "next/image";
import { useState } from "react";
import ArmController from "../../../components/Main/ArmController";

const Test = () => {
  const router = useRouter();
  const [controlVisible, setControlVisible] = useState(false);
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
          <div className="w-full h-[100px] px-[20px] py-[30px] flex gap-[20px]">
            <select name="" id="" className="w-[220px] px-[20px]">
              <option value="1">1</option>
            </select>
            <div className="w-[220px] h-[40px] flex justify-center items-center gap-[20px] bg-white">
              <picture className="relative w-[18px] h-[18px]">
                <Image src={"/images/main/task-simulator.svg"} fill draggable={false} alt="" />
              </picture>
              <span className="text-base text-[#222222]">작업동작 시뮬레이션</span>
            </div>
            <div className="w-[220px] h-[40px] flex justify-center items-center gap-[20px] bg-white">
              <picture className="relative w-[18px] h-[18px]">
                <Image src={"/images/main/bar-graph.svg"} fill draggable={false} alt="" />
              </picture>
              <span className="text-base text-[#222222]">통계</span>
            </div>
            <div className="w-[220px] h-[40px] flex justify-center items-center gap-[20px] bg-white">
              <picture className="relative w-[18px] h-[18px]">
                <Image src={"/images/main/config.svg"} fill draggable={false} alt="" />
              </picture>
              <span className="text-base text-[#222222]">그래프설정</span>
            </div>
          </div>
          <div className="w-full h-[222px] flex items-center gap-[20px] bg-white"></div>
        </section>
        <section className="flex flex-col w-[342px] h-fit gap-[26px] mr-[180px]">
          <div className="w-full h-fit p-[30px] bg-white border-l-[4px] border-[#182A5B] flex flex-col gap-[20px]">
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
          <div className="w-full h-fit p-[30px] bg-white border-l-[4px] border-[#182A5B] flex flex-col gap-[20px]">
            <span className="mb-[4px] text-[#182A5B]">배치 정보</span>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d]">배치현장</span>
              <span className="min-w-[160px]">test</span>
            </div>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d] min">배치공정</span>
              <span className="min-w-[160px]">test</span>
            </div>
          </div>
          <div
            id="test"
            className="w-full h-fit p-[30px] bg-white border-l-[4px] border-[#182A5B] flex flex-col gap-[20px]"
          >
            <span className="mb-[4px] text-[#182A5B]">관리자 정보</span>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d]">Engineer</span>
              <span className="min-w-[160px]">test 1</span>
            </div>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d] min">Operator 1</span>
              <span className="min-w-[160px]">test 2</span>
            </div>
            <div className="w-fit flex gap-[50px]">
              <span className="min-w-[100px] text-sm text-[#7d7d7d]">Operator 2</span>
              <span className="min-w-[160px]">test 3</span>
            </div>
          </div>
        </section>
        <ArmController visible={controlVisible} />
      </MainLayout>
    </>
  );
};

export default Test;
