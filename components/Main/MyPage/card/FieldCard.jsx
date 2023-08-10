import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { CheckedFieldItemAtom, CreateFieldItemAtom } from "../../../../recoil/AtomStore";
import Image from "next/image";
import { InputTextItem } from "./InputTextItem";
import { InputAddressItem } from "./InputAddressItem";
import axios from "axios";
import { useSession } from "next-auth/react";

export const FieldCard = ({ children }) => {
  const { data: session } = useSession();
  const CreateFieldItem = useRecoilValue(CreateFieldItemAtom);
  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  useEffect(() => {}, [CheckedFieldItem]);
  return (
    <>
      <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative ">
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
                {CheckedFieldItem ? CheckedFieldItem?.fieldName : ""}
              </span>
            </div>
          )}
          <InputTextItem
            title="현장 전화번호"
            id="fieldPhoneNumber"
            value={CheckedFieldItem ? CheckedFieldItem?.fieldPhoneNumber : ""}
            placeholder={""}
          />
          <InputAddressItem
            title="현장 주소"
            id="fieldAddress"
            zipCode={CheckedFieldItem ? CheckedFieldItem?.zipCode : ""}
            address={CheckedFieldItem ? CheckedFieldItem?.address : ""}
            detailAddress={CheckedFieldItem ? CheckedFieldItem?.detailAddress : ""}
          />
          <InputTextItem
            title="공정 수"
            id="processCount"
            value={CheckedFieldItem ? CheckedFieldItem?.processCount : ""}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputTextItem
            title="현장 관리자"
            id="fieldManager"
            value={CheckedFieldItem ? CheckedFieldItem?.fieldManager : ""}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputTextItem
            title="관리자 연락처"
            id="managerPhoneNumber"
            value={CheckedFieldItem ? CheckedFieldItem?.managerPhoneNumber : ""}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputTextItem
            title="관리자 이메일"
            id="managerEmail"
            value={CheckedFieldItem ? CheckedFieldItem?.managerEmail : ""}
            placeholder={"'-'를 포함하여 입력"}
          />
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
                const fieldName = document.getElementById("fieldName").value;
                const fieldPhoneNumber = document.getElementById("fieldPhoneNumber").value;
                const processCount = document.getElementById("processCount").value;
                const fieldManager = document.getElementById("fieldManager").value;
                const managerPhoneNumber = document.getElementById("managerPhoneNumber").value;
                const managerEmail = document.getElementById("managerEmail").value;
                const fieldAddress = document
                  .getElementById("fieldAddress")
                  .querySelectorAll("input");
                const zipCode = fieldAddress[0].value;
                const address = fieldAddress[1].value;
                const detailAddress = fieldAddress[2].value;
                const data = {
                  companyNumber: session.token.user.affiliation,
                  processCount,
                  fieldName,
                  fieldPhoneNumber,
                  fieldManager,
                  managerPhoneNumber,
                  managerEmail,
                  zipCode,
                  address,
                  detailAddress,
                  processCount,
                };
                console.log(data);
                const res = await axios.post("https://localhost:3333/api/mongo/field", data);
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
            <button className="w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center">
              <picture className="relative w-[0.875rem] h-[0.75rem]">
                <Image src={`/images/main/myPage/edit.svg`} fill alt="" />
              </picture>
              <span className="text-white">수정</span>
            </button>
          )}
          {CreateFieldItem ? null : (
            <span
              className="flex text[#222222] text-base underline cursor-pointer mt-[2rem]"
              onClick={() => {
                setVisibleDeleteModal(true);
              }}
            >
              계정삭제
            </span>
          )}
        </div>
      </div>
    </>
  );
};
