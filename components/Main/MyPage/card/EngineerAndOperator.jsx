import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedEngineerAndOperatorItemAtom,
  CheckedFieldItemAtom,
  EngineerAndOperatorItemAtom,
} from "../../../../recoil/AtomStore";

export const EngineerAndOperator = ({ children, data }) => {
  const searchRef = useRef();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([...data]);

  const [engineerAndOperator, setEngineerAndOperator] = useRecoilState(EngineerAndOperatorItemAtom);
  const [checkedEngineerAndOperator, setCheckedEngineerAndOperator] = useRecoilState(
    CheckedEngineerAndOperatorItemAtom
  );
  console.log(checkedEngineerAndOperator);
  useEffect(() => {
    getEngineerAndOperator();
  }, []);
  useEffect(() => {
    if (value) {
      const filtered = data.filter((item) => {
        return item.fieldName.includes(value);
      });
      console.log(filtered);
      setFilteredArray(filtered);
    } else {
      setFilteredArray([...engineerAndOperator]);
    }
  }, [value, engineerAndOperator]);

  const getEngineerAndOperator = async () => {
    const response = await axios.get("https://localhost:3333/api/mongo/engineerAndOperator");
    setEngineerAndOperator(response?.data?.data);
  };
  return (
    <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
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
        <button
          className="flex justify-center items-center gap-[0.625rem] w-full h-[2.625rem] my-[1.125rem] bg-[#182A5B]"
          onClick={async (e) => {}}
        >
          <picture className="w-[0.75rem] h-[0.75rem] top-[0.0625rem] relative">
            <Image src={`/images/main/mypage/plus.svg`} fill alt="" />
          </picture>
          <span className="text-white">신규등록</span>
        </button>
      </div>
      <div className="py-[1.125rem]">
        <ul className="flex flex-col h-fit">
          {filteredArray?.map((item, index) => {
            return (
              <li
                className="flex flex-col justify-between py-[0.625rem] border-b border-b-[#DCDCDC] cursor-pointer"
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
                      <Image src={`/images/main/mypage/person.svg`} fill alt="" />
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
