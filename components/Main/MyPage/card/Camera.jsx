import { useRouter } from "next/router";
import { InputTextItem } from "./InputTextItem";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { RobotCard2Submit } from "./RobotCard2";
export const Camera = () => {
  const router = useRouter();
  const pathName = router.pathname;
  const { data: session } = useSession();
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    console.log("session");
    console.log(session);
  }, [session]);
  const RobotCard2Submit = async () => {
    // for (const items of document.getElementById("fieldForm").querySelectorAll("input")) {
    //   if (items.value === "") {
    //     alert("빈칸을 모두 입력해주세요.");
    //     return;
    //   }
    // }
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
      companyNumber:
        session?.token?.user?.affiliation === "admin" ? "admin" : session?.token?.user?.affiliation,
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
    const res = await axios.post(baseURL + "/api/mongo/robot", data, {
      headers: { Authorization: `${session?.token?.accessToken}` },
    });
    console.log(res);
    if (res.data.result === 1) {
      alert("등록되었습니다.");
      window.location.reload();
    } else {
      alert(res?.data?.msg);
    }
  };
  return (
    <div className="p-[1.875rem] w-fit h-fit bg-white relative ">
      <div className="flex flex-col">
        <div>
          <label htmlFor="view1">
            <input type="radio" name="view" id="view1" className="peer hidden" defaultChecked />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">VIEW 1</span>
            </div>
          </label>
          <label htmlFor="view2">
            <input type="radio" name="view" id="view2" className="peer hidden" />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">VIEW 2</span>
            </div>
          </label>
          <label htmlFor="view3">
            <input type="radio" name="view" id="view3" className="peer hidden" />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">VIEW 3</span>
            </div>
          </label>
          <label htmlFor="xr-view">
            <input type="radio" name="view" id="xr-view" className="peer hidden" />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">XR VIEW</span>
            </div>
          </label>
        </div>
        <div className="w-[40rem] h-[23.75rem] mt-[1.875rem] bg-[#D9D9D9]"></div>
        <div className="mt-[1.875rem] flex flex-col gap-[1.875rem]">
          <div className="flex gap-[3.125rem] justify-between">
            <InputTextItem
              title="카메라 1"
              type="camera"
              id="camera1"
              placeholder="'-'를 포함하여 입력"
            />
            <div className="flex h-fit w-[15rem] self-end">
              <button className="w-[7.5rem] h-[2.5rem] border border-[#182A5B] text-[#182A5B]">
                <span>삭제</span>
              </button>
              <button className="w-[7.5rem] h-[2.5rem] bg-[#182A5B] text-white">
                <span>연동</span>
              </button>
            </div>
          </div>
          <div className="flex gap-[3.125rem] justify-between">
            <InputTextItem
              title="카메라 2"
              type="camera"
              id="camera2"
              placeholder="'-'를 포함하여 입력"
            />
            <div className="flex h-fit w-[15rem] self-end">
              <button className="w-[7.5rem] h-[2.5rem] border border-[#182A5B] text-[#182A5B]">
                <span>삭제</span>
              </button>
              <button className="w-[7.5rem] h-[2.5rem] bg-[#182A5B] text-white">
                <span>연동</span>
              </button>
            </div>
          </div>
          <div className="flex gap-[3.125rem] justify-between">
            <InputTextItem
              title="카메라 3"
              type="camera"
              id="camera3"
              placeholder="'-'를 포함하여 입력"
            />
            <div className="flex h-fit w-[15rem] self-end">
              <button className="w-[7.5rem] h-[2.5rem] border border-[#182A5B] text-[#182A5B]">
                <span>삭제</span>
              </button>
              <button className="w-[7.5rem] h-[2.5rem] bg-[#182A5B] text-white">
                <span>연동</span>
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-between relative">
            <div className="w-[0.125rem] h-[1rem] bg-[#182A5B] absolute left-0" />
            <span className="text-[#222222] text-lg ml-[0.625rem]">XR VIEW 사용 여부</span>
            <div className="flex h-fit w-[11.25rem] self-end justify-self-end">
              <button className="w-[5.625rem] h-[1.875rem] border border-[#182A5B] text-[#182A5B]">
                <span>OFF</span>
              </button>
              <button className="w-[5.625rem] h-[1.875rem] bg-[#182A5B] text-white">
                <span>ON</span>
              </button>
            </div>
          </div>
        </div>
        {session?.token?.user?.part === "admin" || session?.token?.user?.affiliation === "admin" ? (
          <button
            className="w-[17.5rem] h-[2.5rem] mt-[1.875rem] bg-[#182A5B] flex justify-center items-center self-end"
            onClick={pathName.includes("new") ? RobotCard2Submit : null}
          >
            <span className="text-white text-base">등록</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 180px convert to rem = 11.25rem
