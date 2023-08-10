import Image from "next/image";
import { InputTextItem } from "./InputTextItem";
import { InputAddressItem } from "./InputAddressItem";
import axios from "axios";
import { InputTextArea } from "./InputTextArea";
import { InputSelect } from "./InputSelect";
import { useRouter } from "next/router";

export const RobotCard2 = ({ children, data }) => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <>
      <div className="py-[2.625rem] w-fit h-fit bg-white relative">
        <div className="flex items-center ml-[2.5rem] mb-[0.625rem]">
          <span id="fieldName" className="text-[#222222] text-lg">
            신규 로봇 등록
          </span>
        </div>
        <div id="fieldForm" className="flex gap-[5rem] px-[2.5rem]">
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
            <InputTextItem title="공급사" id="vender" value={data?.serialNumber} placeholder={""} />
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
          </div>
        </div>
      </div>
    </>
  );
};
// 1px convert to rem === 0.0625rem
// 60px convert to rem === 3.75rem

export const RobotCard2Submit = async () => {
  for (const items of document.getElementById("fieldForm").querySelectorAll("input")) {
    if (items.value === "") {
      alert("빈칸을 모두 입력해주세요.");
      return;
    }
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
  const res = await axios.post("https://localhost:3333/api/mongo/robot", data);
  console.log(res);
  if (res.data.result === 1) {
    alert("등록되었습니다.");
    window.location.reload();
  } else {
    alert("등록에 실패하였습니다.");
  }
};
