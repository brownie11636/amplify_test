import Image from "next/image";
import { useState } from "react";

const ArmController = ({ visible }) => {
  const [controlState, setControlState] = useState("operate");
  console.log(controlState);
  return (
    <section
      id="floatDiv"
      className={`flex flex-col bg-white w-fit h-screen overflow-scroll fixed top-0 -right-[1000px] px-[40px] py-[38px] z-50 ${
        !visible ? "translate-x-[1000px]" : "-translate-x-[1000px]"
      } transition-transform duration-500`}
    >
      <div className="flex gap-[31px] w-full h-[36px] items-center">
        <span className="text-xl text-[#222222]">CONTROLLER</span>
        <div className="w-full h-full flex">
          <input
            type="radio"
            name="controller"
            id="reset"
            className="peer/reset hidden"
            onChange={(e) => {
              setControlState("reset");
            }}
          />
          <label
            htmlFor="reset"
            className={`controller-reset w-[100px] h-full cursor-pointer border-1 border-solid border-[#182A5B] flex items-center justify-center gap-[10px] ${
              controlState === "reset" ? "bg-[#182A5B] text-white" : "bg-white text-[#182a5b]"
            }`}
          >
            <div className="w-[16px] h-[16px] relative">
              {controlState === "reset" ? (
                <Image
                  src="/images/main/controller/reset-icon-white.svg"
                  fill
                  draggable={false}
                  alt=""
                />
              ) : (
                <Image src="/images/main/controller/reset-icon.svg" fill draggable={false} alt="" />
              )}
            </div>
            <span className="text-sm">RESET</span>
          </label>
          <input
            type="radio"
            name="controller"
            id="operate"
            defaultChecked
            className="peer/operate hidden"
            onChange={(e) => {
              setControlState("operate");
            }}
          />
          <label
            htmlFor="operate"
            className={`controller-operate w-[100px] h-full cursor-pointer border-1 border-solid border-[#182A5B] flex items-center justify-center ${
              controlState === "operate" ? "bg-[#182A5B] text-white" : "bg-white text-[#182a5b]"
            }`}
          >
            <span className="text-sm ">OPERATE</span>
          </label>
          <input
            type="radio"
            name="controller"
            id="stop"
            className="peer/stop hidden"
            onChange={(e) => {
              setControlState("stop");
            }}
          />
          <label
            htmlFor="stop"
            className={`controller-stop w-[100px] h-full cursor-pointer border-1 border-solid border-[#182A5B] flex items-center justify-center ${
              controlState === "stop" ? "bg-[#182A5B] text-white" : "bg-white text-[#182a5b]"
            }`}
          >
            <span className="text-sm">STOP</span>
          </label>
        </div>
      </div>
      <div className="flex gap-[40px] justify-center items-center mt-[32px]">
        <div className="flex flex-col gap-[12px]">
          <button className="w-[220px] h-[34px] flex gap-[18px] justify-center items-center bg-[#182a5b] ">
            <div className="relative w-[14px] h-[16px]">
              <Image src={"/images/main/controller/upBtn.svg"} fill alt="" />
            </div>
            <span className="text-white">UP</span>
          </button>
          <button className="w-[220px] h-[34px] flex gap-[18px] justify-center items-center bg-[#182a5b] ">
            <div className="relative w-[14px] h-[16px]">
              <Image src={"/images/main/controller/downBtn.svg"} fill alt="" />
            </div>
            <span className="text-white">DOWN</span>
          </button>
        </div>
        <div className="flex justify-center items-center w-[180px] h-[90px] relative overflow-hidden">
          <button className="absolute left-[1px] top-0 w-1/2 bg-[#182a5b] h-full rounded-tl-full border-r-[1px] border-r-[#fff]">
            <div className="w-[20px] h-[16px] absolute left-[10px] bottom-[14px]">
              <Image src={"/images/main/controller/rotate-l.svg"} fill alt="" />
            </div>
          </button>
          <button className="absolute right-0 top-0 w-1/2 bg-[#182a5b] h-full rounded-tr-full border-l-[1px] border-l-[#fff]">
            <div className="w-[20px] h-[16px] absolute right-[10px] bottom-[14px]">
              <Image src={"/images/main/controller/rotate-r.svg"} fill alt="" />
            </div>
          </button>
          <div className="relative top-1/2 rounded-full w-1/2 scale-[1.2] h-full bg-white z-10" />
        </div>
      </div>
      <div className="flex gap-[58px] justify-center">
        {/* 이동 */}
        <div className="flex justify-center items-center mt-[32px] relative w-[182px] h-[182px]">
          <div className="absolute -top-5 bg-[#182a5b] rounded-tl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 top-1 left-1">
              <Image src={"/images/main/controller/move-up.svg"} fill alt="" />
            </div>
          </div>
          <div className="absolute -right-5 bg-[#182a5b] rounded-tr-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 right-1 top-1">
              <Image src={"/images/main/controller/move-right.svg"} fill alt="" />
            </div>
          </div>
          <div className="absolute -bottom-5 bg-[#182a5b] rounded-br-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 bottom-1 right-1">
              <Image src={"/images/main/controller/move-down.svg"} fill alt="" />
            </div>
          </div>
          <div className="absolute -left-5 bg-[#182a5b] rounded-bl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 bottom-1 left-1">
              <Image src={"/images/main/controller/move-left.svg"} fill alt="" />
            </div>
          </div>
          <div className="flex justify-center items-center rounded-full w-[50px] h-[50px] bg-white z-10">
            <span className="text-black text-sm">이동</span>
          </div>
        </div>
        {/* 회전 */}
        <div className="flex justify-center items-center mt-[32px] relative w-[182px] h-[182px]">
          <div className="absolute -top-5 bg-[#182a5b] rounded-tl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 top-1 left-1">
              <Image src={"/images/main/controller/rotate-up.svg"} fill alt="" />
            </div>
          </div>
          <div className="absolute -right-5 bg-[#182a5b] rounded-tr-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 right-1 top-1">
              <Image src={"/images/main/controller/rotate-right.svg"} fill alt="" />
            </div>
          </div>
          <div className="absolute -bottom-5 bg-[#182a5b] rounded-br-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 bottom-1 right-1">
              <Image src={"/images/main/controller/rotate-down.svg"} fill alt="" />
            </div>
          </div>
          <div className="absolute -left-5 bg-[#182a5b] rounded-bl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
            <div className="w-5 h-5 relative -rotate-45 bottom-1 left-1">
              <Image src={"/images/main/controller/rotate-left.svg"} fill alt="" />
            </div>
          </div>
          <div className="flex justify-center items-center rounded-full w-[50px] h-[50px] bg-white z-10">
            <span className="text-black text-sm">회전</span>
          </div>
        </div>
      </div>
      <div className="w-full border-t-[1px] border-[#D9D9D9] mt-[30px]" />
      <div className="flex flex-col mt-[20px] ">
        <div className="flex gap-[18px]">
          <div className="w-[60px] h-[40px] relative cursor-pointer" onClick={() => {}}>
            <Image src={"/images/main/controller/minus.svg"} fill alt="" />
          </div>
          <div
            className="w-[60px] h-[40px] relative cursor-pointer"
            onClick={() => {
              const target = document.getElementById("progress-base");
              target.style.transform = `translateX(10%)`;
            }}
          >
            <Image src={"/images/main/controller/plus.svg"} fill alt="" />
          </div>
          <div className="flex flex-col gap-[14px]">
            <div className="w-[300px] h-[12px] bg-[#F2F2F2] overflow-hidden relative">
              <div
                id="progress-base"
                className="absolute right-full z-20 w-full h-full bg-[#182A5B66] transition-all duration-300"
              />
            </div>
            <div className="w-full flex justify-between">
              <span className="text-[#222222] text-xl">BASE</span>
              <span className="text-[#222222] text-lg">
                value <span>°</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t-[1px] border-[#D9D9D9] mt-[20px]" />
      <div className="w-full border-t-[1px] border-[#D9D9D9] mt-[20px]" />
    </section>
  );
};
export default ArmController;
