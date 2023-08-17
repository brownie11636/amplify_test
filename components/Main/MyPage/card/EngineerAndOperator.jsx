import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedEngineerAndOperatorItemAtom,
  CheckedFieldItemAtom,
  CheckedTaskItemAtom,
  EngineerAndOperatorItemAtom,
} from "../../../../recoil/AtomStore";
import { useSession } from "next-auth/react";

export const EngineerAndOperator = ({ children }) => {
  const { data: session } = useSession();
  const searchRef = useRef();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  const CheckedTaskItem = useRecoilValue(CheckedTaskItemAtom);
  const [engineerAndOperator, setEngineerAndOperator] = useRecoilState(EngineerAndOperatorItemAtom);
  const [checkedEngineerAndOperator, setCheckedEngineerAndOperator] = useRecoilState(
    CheckedEngineerAndOperatorItemAtom
  );
  useEffect(() => {
    getEngineerAndOperator();
  }, [CheckedTaskItem, CheckedFieldItem]);
  useEffect(() => {
    console.log("engineerAndOperator");
    console.log(engineerAndOperator);
    console.log("CheckedFieldItem");
    console.log(CheckedFieldItem);
    console.log("CheckedTaskItem");
    console.log(CheckedTaskItem);
    let filtered = engineerAndOperator;
    filtered = filtered?.filter((item) => {
      if (item.part === "admin") {
        return item;
      } else if (
        item.field === CheckedFieldItem?.index?.toString() &&
        item.task === CheckedTaskItem?.toString()
      ) {
        return item;
      }
    });
    if (value) {
      filtered = filtered.filter((item) => {
        return item.name.includes(value);
      });
      setFilteredArray(filtered);
    } else {
      setFilteredArray(filtered);
    }
  }, [session, value, engineerAndOperator, CheckedTaskItem]);

  const getEngineerAndOperator = async (e) => {
    const res = await axios.post("https://localhost:3333/api/mongo/engineerAndOperator", {
      taskCount: CheckedTaskItem,
      fieldIndex: CheckedFieldItem?.index,
      companyNumber:
        session?.token?.user?.affiliation === "admin" ? "admin" : session?.token?.user?.affiliation,
    });
    console.log(res);
    setEngineerAndOperator(res?.data?.data);
  };
  return (
    <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
      <div className="fixed flex justify-center mt-[12rem] "></div>
      <div className="px-[2.625rem]">
        <div className="mb-[2.625rem]">
          <span className="text-[#222222] text-lg">{"엔지니어 & 오퍼레이터"}</span>
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
        {/* <button
          className="flex justify-center items-center gap-[0.625rem] w-full h-[2.625rem] my-[1.125rem] bg-[#182A5B]"
          onClick={async (e) => {}}
        >
          <picture className="w-[0.75rem] h-[0.75rem] top-[0.0625rem] relative">
            <Image src={`/images/main/mypage/plus.svg`} fill alt="" />
          </picture>
          <span className="text-white">신규등록</span>
        </button> */}
      </div>
      <div className="py-[2.5rem]">
        <ul className="flex flex-col h-fit">
          {filteredArray?.map((item, index) => {
            return (
              <li
                className={`flex flex-col justify-between border-b border-b-[#DCDCDC] cursor-pointer ${
                  index === 0 && "border-t border-t-[#DCDCDC]"
                }`}
                key={`en${item?.name}${index}`}
                onClick={() => {
                  setCheckedEngineerAndOperator(item);
                }}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                  htmlFor={`enlist${index}`}
                >
                  <div className="py-[1rem] flex gap-[1.125rem]">
                    <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/myPage/person.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item?.name}</span>
                  </div>
                  <input
                    type="checkbox"
                    id={`enlist${index}`}
                    className="peer hidden"
                    onChange={(e) => {}}
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
