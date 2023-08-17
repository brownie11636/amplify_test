import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  CheckedFieldItemAtom,
  CheckedRobotItemAtom,
  CreateFieldItemAtom,
  FieldSelectedRadioAtom,
} from "../../../../recoil/AtomStore";

export const RobotList = ({ children, data, type }) => {
  const searchRef = useRef();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState();
  const setCheckedRobotItem = useSetRecoilState(CheckedRobotItemAtom);
  useEffect(() => {
    if (value) {
      const filtered = data?.filter((item) => {
        return item?.nickName?.includes(value);
      });
      setFilteredArray(filtered);
    } else {
      setFilteredArray(data);
    }
  }, [value, data]);
  return (
    <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
      <div className="px-[2.625rem]">
        <div className="mb-[2.625rem]">
          <span className="text-[#222222] text-lg">보유 로봇 리스트</span>
        </div>
        <div className="flex h-[3.125rem] relative">
          <input
            type="text"
            ref={searchRef}
            placeholder="검색"
            className="border-b border-b-[#182A5B] px-[1.125rem] py-[1.125rem] w-full ring-0 focus:outline-none placeholder:text-[#7D7D7D] placeholder:text-base"
            onChange={() => {
              setValue(searchRef.current.value);
            }}
          />
          <span className="absolute top-[32%] right-[5.7142857142857%] flex w-[1.125rem] h-[1.125rem] cursor-pointer">
            <Image src={`/images/main/mypage/search.svg`} fill alt="" />
          </span>
        </div>
      </div>
      <div className="py-[2.5rem]">
        <ul className="flex flex-col h-fit">
          {filteredArray?.map((item, index) => {
            return (
              <li
                className={`flex flex-col justify-between border-b border-b-[#DCDCDC] cursor-pointer ${
                  index === 0 ? "border-t border-t-[#DCDCDC]" : ""
                }`}
                key={`${item?.serialNumber}${index}`}
                onClick={() => {
                  setCheckedRobotItem(item);
                }}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer relative"
                  htmlFor={`list${index}`}
                >
                  <div className="py-[1rem] flex gap-[1.125rem]">
                    <picture className="select-none w-[1.5rem] h-[1.5rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/myPage/robot.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item?.nickName}</span>
                  </div>
                  <input
                    type="radio"
                    name="list"
                    id={`list${index}`}
                    className="peer hidden"
                    onChange={() => {
                      document.getElementsByName(`task${index}`).forEach((element) => {
                        if (!element.checked) {
                          element.nextSibling.classList.add("hidden");
                        } else {
                          element.nextSibling.classList.remove("hidden");
                        }
                      });
                    }}
                  />
                  <div className="w-[calc(100%)] h-full absolute z-0 -left-0 top-0 bg-[#182A5B1A] hidden peer-checked:block">
                    <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 24px convert to rem = 1.5rem
