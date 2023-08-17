import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedCompanyItemAtom,
  CheckedRobotItemAtom,
  CreateRobotSelectedFieldAtom,
  RobotItemListAtom,
  RobotSelectedRadioAtom,
} from "../../../../recoil/AtomStore";
import { InputAddressItem } from "./InputAddressItem";
import { InputSelect } from "./InputSelect";
import { InputTextArea } from "./InputTextArea";
import { InputTextItem } from "./InputTextItem";

export const RobotCard2 = ({ children, data, company, type }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = router.pathname;
  const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);
  const createRobotSelectedField = useRecoilValue(CreateRobotSelectedFieldAtom);
  const checkedRobotItem = useRecoilValue(CheckedRobotItemAtom);
  const setRobotSelectRadio = useSetRecoilState(RobotSelectedRadioAtom);
  useEffect(() => {
    console.log("robotItemList");
    console.log(robotItemList);
    console.log("createRobotSelectedField");
    console.log(createRobotSelectedField);
    console.log("checkedRobotItem");
    console.log(checkedRobotItem);
    console.log(session);
  }, [robotItemList, createRobotSelectedField, checkedRobotItem]);
  return (
    <>
      <div className="py-[2.625rem] w-fit h-fit bg-white relative">
        {!data ? (
          <div className="flex ml-[2.5rem]">
            <label htmlFor="robotInfo">
              <input
                type="radio"
                name="info"
                id="robotInfo"
                className="peer hidden"
                defaultChecked
                onChange={(e) => {
                  if (e.target.checked) {
                    setRobotSelectRadio(e.target.id);
                  }
                }}
              />
              <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
                <span className="text-base">로봇 정보</span>
              </div>
            </label>
            <label htmlFor="cameraInfo">
              <input
                type="radio"
                name="info"
                id="cameraInfo"
                className="peer hidden"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRobotSelectRadio(e.target.id);
                  }
                }}
              />
              <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
                <span className="text-base">카메라 정보</span>
              </div>
            </label>
          </div>
        ) : (
          <div className="flex items-center ml-[2.5rem] mb-[0.625rem]">
            <span id="fieldName" className="text-[#222222] text-lg">
              신규 로봇 등록
            </span>
          </div>
        )}
        <div id="fieldForm" className="flex gap-[5rem] px-[2.5rem]">
          <div>
            <InputTextItem
              title="로봇 ID"
              id="id"
              value={data ? robotItemList?.id : checkedRobotItem?.id}
              placeholder={""}
            />
            <InputTextItem
              title="시리얼 번호"
              id="serialNumber"
              value={data ? robotItemList?.serialNumber : checkedRobotItem?.serialNumber}
              placeholder={""}
            />
            <InputTextItem
              title="로봇명(닉네임)"
              id="nickName"
              value={data ? robotItemList?.nickName : checkedRobotItem?.nickName}
              placeholder={""}
            />
            <InputTextArea
              title="메모"
              id="descriptions"
              value={data ? robotItemList?.descriptions : checkedRobotItem?.descriptions}
              placeholder={"필요한 경우 메모 입력"}
            />
            <InputSelect
              title="배치 현장"
              id="field"
              type={"fields"}
              value={company?.fields}
              currentValue={checkedRobotItem?.fields}
            />
            {/* {!selectedTaskInAccount ? null : (
              <select name="selectTask" id="selectTask">
                {[...Array(parseInt(selectedTaskInAccount[0]?.processCount) || 0).keys()]?.map(
                  (item, index) => {
                    return (
                      <option value={item + 1} key={`selectTask${index}`}>
                        {`제 ${item + 1} 공정`}
                      </option>
                    );
                  }
                )}
              </select>
            )} */}
            {createRobotSelectedField ? (
              <InputSelect
                title="배치 공정"
                id="tasks"
                type="tasks"
                value={[...Array(parseInt(createRobotSelectedField?.processCount)).keys()]}
                currentValue={checkedRobotItem?.fields}
              />
            ) : null}
          </div>
          <div className="w-[20rem]">
            <InputTextItem
              title="공급사"
              id="vender"
              value={data ? robotItemList?.serialNumber : checkedRobotItem?.serialNumber}
              placeholder={""}
            />
            <InputAddressItem
              title="공급사 주소"
              id="venderAddress"
              zipCode={checkedRobotItem ? checkedRobotItem?.zipCode : ""}
              address={checkedRobotItem ? checkedRobotItem?.address : ""}
              detailAddress={checkedRobotItem ? checkedRobotItem?.detailAddress : ""}
              value={robotItemList?.venderAddress}
            />
            <InputTextItem
              title="공급사 연락처"
              id="venderPhone"
              value={data ? robotItemList?.venderPhone : checkedRobotItem?.venderPhone}
              placeholder={""}
            />
            <InputTextItem
              title="공급사 이메일"
              id="venderEmail"
              value={data ? robotItemList?.venderEmail : checkedRobotItem?.venderEmail}
              placeholder={""}
            />
            {type === 3 &&
            (session?.token?.user?.part === "admin" ||
              session?.token?.user?.affiliation === "admin") ? (
              <button
                className="w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center"
                onClick={async () => {
                  const id = document.getElementById("id").value;
                  const serialNumber = document.getElementById("serialNumber").value;
                  const nickName = document.getElementById("nickName").value;
                  const descriptions = document.getElementById("descriptions").value;
                  const field = document.getElementById("field").value;
                  const tasks = document.getElementById("tasks").value;
                  const vender = document.getElementById("vender").value;
                  const venderAddress = document
                    .getElementById("venderAddress")
                    .querySelectorAll("input");
                  const zipCode = venderAddress[0].value;
                  const address = venderAddress[1].value;
                  const detailAddress = venderAddress[2].value;
                  const venderPhone = document.getElementById("venderPhone").value;
                  const venderEmail = document.getElementById("venderEmail").value;

                  const data = {
                    companyNumber: session?.token?.user?.affiliation,
                    id,
                    serialNumber,
                    nickName,
                    descriptions,
                    field,
                    tasks,
                    vender,
                    zipCode,
                    address,
                    detailAddress,
                    venderPhone,
                    venderEmail,
                  };
                  console.log(data);
                  const res = await axios.put("https://localhost:3333/api/mongo/robot", data);
                  console.log(res);
                  if (res.data.result === 1) {
                    alert("수정되었습니다.");
                    window.location.reload();
                  } else {
                    alert("수정에 실패하였습니다.");
                  }
                }}
              >
                <picture className="relative w-[0.875rem] h-[0.75rem]">
                  <Image src={`/images/main/myPage/edit.svg`} fill alt="" />
                </picture>
                <span className="text-white">수정</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
// 1px convert to rem === 0.0625rem
// 60px convert to rem === 3.75rem

export const RobotCard2Submit = async () => {
  const { data: session } = useSession();
  for (const items of document.getElementById("fieldForm").querySelectorAll("input")) {
    // if (items.value === "") {
    //   alert("빈칸을 모두 입력해주세요.");
    //   return;
    // }
  }
  const id = document.getElementById("id").value;
  const serialNumber = document.getElementById("serialNumber").value;
  const nickName = document.getElementById("nickName").value;
  const descriptions = document.getElementById("descriptions").value;
  const field = document.getElementById("field").value;
  const tasks = document.getElementById("tasks").value;
  const vender = document.getElementById("vender").value;
  const venderPhone = document.getElementById("venderPhone").value;
  const venderEmail = document.getElementById("venderEmail").value;
  const venderAddress = document.getElementById("venderAddress").querySelectorAll("input");
  const zipCode = venderAddress[0].value;
  const address = venderAddress[1].value;
  const detailAddress = venderAddress[2].value;
  const data = {
    companyNumber: session?.token?.user?.companyNumber,
    id,
    serialNumber,
    nickName,
    descriptions,
    field,
    tasks,
    vender,
    venderPhone,
    venderEmail,
    zipCode,
    address,
    detailAddress,
  };
  console.log(data);
  // const res = await axios.post("https://localhost:3333/api/mongo/robot", data);
  // console.log(res);
  // if (res.data.result === 1) {
  //   alert("등록되었습니다.");
  //   window.location.reload();
  // } else {
  //   alert("등록에 실패하였습니다.");
  // }
};
