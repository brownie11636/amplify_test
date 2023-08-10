import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedEngineerAndOperatorItemAtom,
  CreateFieldItemAtom,
} from "../../../../recoil/AtomStore";
import { InputTextItem } from "./InputTextItem";
import { InputSelect } from "./InputSelect";
import axios from "axios";

export const EngineerAndOperatorCard = ({ children, data }) => {
  const searchRef = useRef();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState();

  const CreateFieldItem = useRecoilValue(CreateFieldItemAtom);
  const [checkedEngineerAndOperator, setCheckedEngineerAndOperator] = useRecoilState(
    CheckedEngineerAndOperatorItemAtom
  );
  useEffect(() => {}, [CreateFieldItem]);
  return (
    <>
      <div className="flex flex-col gap-[1.25rem] py-[2.625rem] w-[22.5rem] h-fit bg-white relative ">
        <div id="fieldForm" className="px-[2.625rem]">
          {CreateFieldItem ? (
            <div className="flex items-center gap-[1.125rem]">
              <picture className="w-[1.375rem] h-[1.375rem] relative">
                <Image src={`/images/main/myPage/field.svg`} fill alt="" draggable={false} />
              </picture>
              <input
                type="text"
                id="fieldName"
                className="text-sm py-[0.625rem] px-[1rem] border-b border-b-[#182A5B]"
                placeholder="현장명 입력"
              />
            </div>
          ) : (
            <div className="flex items-center gap-[1.125rem] mb-[0.625rem]">
              <picture className="w-[1.375rem] h-[1.375rem] relative">
                <Image src={`/images/main/myPage/company.svg`} fill alt="" draggable={false} />
              </picture>
              <span id="fieldName" className="text-[#222222] text-lg">
                {checkedEngineerAndOperator?.fieldName}
              </span>
            </div>
          )}
          <InputTextItem
            title="이름"
            id="name"
            value={checkedEngineerAndOperator?.name}
            placeholder={""}
          />
          <InputTextItem
            title="연락처"
            id="phone"
            value={checkedEngineerAndOperator?.phone}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputSelect title="공정" id="tasks" value={checkedEngineerAndOperator?.tasks} />
          {CreateFieldItem ? (
            <button
              className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
              onClick={async () => {
                for (const items of document
                  .getElementById("fieldForm")
                  .querySelectorAll("input")) {
                  if (items.value === "") {
                    alert("빈칸을 모두 입력해주세요.");
                    return;
                  }
                }
                const name = document.getElementById("name").value;
                const phone = document.getElementById("phone").value;
                const tasks = document.getElementById("tasks").value;
                const data = {
                  name,
                  phone,
                  tasks,
                };
                console.log(data);
                const res = await axios.post("https://localhost:3333/api/mongo/ ", data);
                console.log(res);
                if (res.data.result === 1) {
                  alert("등록되었습니다.");
                  window.location.reload();
                } else {
                  alert("등록에 실패하였습니다.");
                }
              }}
            >
              <picture className="relative w-[0.875rem] h-[0.75rem]">
                <Image src={`/images/main/myPage/check.svg`} fill alt="" />
              </picture>
              <span className="text-base text-white">등록</span>
            </button>
          ) : (
            <button className="w-full h-[2.5rem] mt-[2.125rem] gap-[0.875rem] border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center">
              <picture className="relative w-[0.875rem] h-[0.75rem]">
                <Image src={`/images/main/myPage/edit.svg`} fill alt="" />
              </picture>
              <span className="text-white">수정</span>
            </button>
          )}
        </div>
        <div className="w-full h-[1.25rem] bg-[#F2F2F2]" />
        <div className="px-[2.625rem]">
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
          <div className="flex w-full h-[2.5rem] mt-[1.25rem] justify-between">
            {[
              { sub: "삭제", url: "", image: "/images/main/myPage/x-mark-white.svg" },
              { sub: "등록", url: "", image: "/images/main/myPage/plus.svg" },
              { sub: "수정", url: "", image: "/images/main/myPage/edit.svg" },
            ].map((item, index) => {
              return (
                <div key={`${item?.sub}${index}`} className="flex items-center gap-[1.125rem]">
                  <button
                    className="flex justify-center items-center gap-[0.625rem] w-[5.25rem] h-[2.5rem] bg-[#182A5B]"
                    onClick={() => {}}
                  >
                    <picture className="w-[0.875rem] h-[0.875rem] relative">
                      <Image src={item?.image} fill alt="" />
                    </picture>
                    <span className="text-white text-sm">{item?.sub}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
// 1px convert to rem = 0.0625rem
