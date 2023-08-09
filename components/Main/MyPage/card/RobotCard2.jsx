import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  CheckedFieldItemAtom,
  CreateFieldItemAtom,
  CreateRobotItemAtom,
} from "../../../../recoil/AtomStore";
import Image from "next/image";
import { InputTextItem } from "./InputTextItem";
import { InputAddressItem } from "./InputAddressItem";
import axios from "axios";
import { InputTextArea } from "./InputTextArea";
import { InputSelect } from "./InputSelect";

export const RobotCard2 = ({ children, data }) => {
  const CreateFieldItem = useRecoilValue(CreateFieldItemAtom);
  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  const CreateRobotItem = useRecoilValue(CreateRobotItemAtom);
  return (
    <>
      <div className="py-[2.625rem] w-fit h-fit bg-white relative ">
        <div className="flex ml-[3.75rem]">
          <label htmlFor="robotList">
            <input
              type="radio"
              name="robotList"
              id="robotList"
              className="peer hidden"
              defaultChecked
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldSelectedRadio(e.target.id);
                }
              }}
            />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
              <span className="text-base">{"로봇정보"}</span>
            </div>
          </label>
          <label htmlFor="cameraList">
            <input
              type="radio"
              name="robotList"
              id="cameraList"
              className="peer hidden"
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldSelectedRadio(e.target.id);
                }
              }}
            />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
              <span className="text-base">{"카메라정보"}</span>
            </div>
          </label>
        </div>
        <div id="fieldForm" className="flex gap-[5rem] px-[3.75rem]">
          <div>
            <InputTextItem title="로봇 ID" id="id" value={data?.id} placeholder={""} />
            <InputTextItem
              title="시리얼 번호"
              id="serialNumber"
              value={data?.serialNumber}
              placeholder={""}
            />
            <InputTextItem
              title="로봇명(닉네임)"
              id="nickName"
              value={data?.nickName}
              placeholder={""}
            />
            <InputTextArea
              title="메모"
              id="descriptions"
              value={data?.descriptions}
              placeholder={"필요한 경우 메모 입력"}
            />
            <InputSelect title="배치 현장" id="field" value={data?.field} />
            <InputSelect title="배치 공정" id="tasks" value={data?.tasks} />
          </div>
          <div className="w-[20rem]">
            <InputTextItem
              title="시리얼 번호"
              id="serialNumber"
              value={data?.serialNumber}
              placeholder={""}
            />
            <InputAddressItem title="공급사 주소" id="venderAddress" value={data?.venderAddress} />
            <InputTextItem
              title="공급사 연락처"
              id="venderPhone"
              value={data?.venderPhone}
              placeholder={""}
            />
            <InputTextItem
              title="공급사 이메일"
              id="venderEmail"
              value={data?.venderEmail}
              placeholder={""}
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
                    fieldName,
                    fieldPhoneNumber,
                    processCount,
                    fieldManager,
                    managerPhoneNumber,
                    managerEmail,
                    zipCode,
                    address,
                    detailAddress,
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
          </div>
        </div>
      </div>
    </>
  );
};
// 1px convert to rem === 0.0625rem
// 60px convert to rem === 3.75rem
