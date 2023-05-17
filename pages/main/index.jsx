import Image from "next/image";
import { useState } from "react";

const Main = () => {
  return (
    <div className="bg-[#F2F2F2]">
      <SideNavigator />
      <div></div>
    </div>
  );
};

export default Main;

const SideNavigator = () => {
  const [all, setAll] = useState(false);
  const [allGroupIsChecked, setAllGroupIsChecked] = useState();

  return (
    <div className="flex flex-col w-[300px] h-screen py-[4.44444444444%] border-r border-[#D9D9D9]">
      <div className="flex flex-col border-b w-full px-[40px] pb-[20px] text-[#222222]">
        <span className="font-['NotoSans'] font-medium text-2xl text-[#222222] w-fit">
          조각모음
        </span>
        <div className="mt-[40px] flex items-center">
          <span className="text-lg">My page</span>
          <div className="mx-[40px] border-l w-[1px] h-[12px]" />
          <span className="text-lg">Logout</span>
        </div>
      </div>
      <div className="w-full mt-[56px] text-[#7d7d7d]">
        <ul className="w-full">
          <li className="relative flex w-full cursor-pointer z-10 pl-[30px] pr-[24px] ">
            <input
              type="checkbox"
              id="all"
              className="hidden"
              onChange={(e) => {
                if (e.target.checked) {
                  setAll(true);
                } else {
                  setAll(false);
                }
              }}
            />
            <label htmlFor="all" className="flex gap-[25px] items-center w-full h-fit">
              <picture className="h-[18px] w-[18px] relative">
                <Image layout="fill" objectFit="contain" src="/images/main/icon.svg" alt="" />
              </picture>
              <span className="text-[#222222]">전체</span>
              <picture className="absolute right-[24px] h-[8px] w-[16px] justify-self-end">
                {all ? (
                  <Image layout="fill" objectFit="contain" src="/images/main/arrow-up.svg" alt="" />
                ) : (
                  <Image
                    layout="fill"
                    objectFit="contain"
                    src="/images/main/arrow-down.svg"
                    alt=""
                  />
                )}
              </picture>
            </label>
          </li>
          <ul className={`flex flex-col pt-[30px] overflow-hidden ${all ? "h-fit" : "h-0"} w-full`}>
            {["전체 선택", "CB1-반도체A", "CB1-반도체B", "CB1-반도체C"].map((item, index) => {
              return (
                <li key={index} className="flex h-[50px] w-full items-center gap-[20px]">
                  <div className={`h-full w-[8px] border-0 bg-[#182a5b]`} />
                  <input
                    type="checkbox"
                    id={`selectAll${index}`}
                    className="h-[18px] w-[18px]"
                    onChange={null}
                  />
                  <label htmlFor="selectAll" className={`h-fit w-full cursor-pointer`}>
                    <span>{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    </div>
  );
};
