import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedEngineerAndOperatorItemAtom,
  CheckedFieldItemAtom,
  CheckedTaskItemAtom,
  CreateFieldItemAtom,
  RobotItemListAtom,
} from "../../../../recoil/AtomStore";
import { InputTextItem } from "./InputTextItem";
import { InputSelect } from "./InputSelect";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RobotList } from "./RobotList";

export const EngineerAndOperatorCard = ({ children, data }) => {
  const searchRef = useRef();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState();
  const { data: session } = useSession();
  const CreateFieldItem = useRecoilValue(CreateFieldItemAtom);
  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  const CheckedTaskItem = useRecoilValue(CheckedTaskItemAtom);
  const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);
  const [checkedEngineerAndOperator, setCheckedEngineerAndOperator] = useRecoilState(
    CheckedEngineerAndOperatorItemAtom
  );
  const [selectedRobot, setSelectedRobot] = useState();
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (baseURL && session?.token?.accessToken) {
      getRobot();
    }
  }, [session, baseURL]);
  useEffect(() => {
    if (robotItemList) {
      console.log("robotItemList");
      console.log(robotItemList);
      let filtered = robotItemList?.robots || [];
      filtered = filtered?.filter((item) => {
        if (
          parseInt(item.field) === CheckedFieldItem?.index &&
          parseInt(item.tasks) === CheckedTaskItem
        ) {
          return item;
        }
      });
      if (value) {
        filtered = filtered?.filter((item) => {
          return item?.nickName?.includes(value);
        });
        setFilteredArray(filtered);
      } else {
        setFilteredArray(filtered);
      }
    }
  }, [session, value, robotItemList, CheckedTaskItem]);

  const getRobot = async () => {
    const response = await axios.post(
      baseURL + "/api/mongo/robotList",
      {
        companyNumber:
          session?.token?.user?.affiliation === "admin"
            ? "admin"
            : session?.token?.user?.affiliation,
      },
      { headers: { Authorization: `${session?.token?.accessToken}` } }
    );
    SetRobotItemList(response.data?.data?.robots);
  };
  return (
    <>
      <div className="flex flex-col gap-[1.25rem] py-[2.625rem] w-[22.5rem] h-fit bg-white relative ">
        {/* <div id="fieldForm" className="px-[2.625rem]">
          <div className="flex items-center gap-[1.125rem]">
            <picture className="w-[1.375rem] h-[1.375rem] relative">
              <Image src={`/images/main/myPage/field.svg`} fill alt="" draggable={false} />
            </picture>
            <input
              type="text"
              id="fieldName"
              className="text-sm py-[0.625rem] px-[1rem] border-b border-b-[#182A5B]"
              placeholder="현장명 입력"
              defaultValue={
                checkedEngineerAndOperator?.part === "admin"
                  ? "관리자"
                  : checkedEngineerAndOperator?.part === "engineer"
                  ? "엔지니어"
                  : "오퍼레이터"
              }
            />
          </div>
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
          <InputSelect
            title="공정"
            id="tasks"
            type="tasks"
            value={checkedEngineerAndOperator?.tasks}
            CheckedFieldItem={CheckedFieldItem}
          />
          {CreateFieldItem ? (
          <button
            className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
            onClick={async () => {
              for (const items of document.getElementById("fieldForm").querySelectorAll("input")) {
                if (items.value === "") {
                  alert("빈칸을 모두 입력해주세요.");
                  return;
                }
              }
              if (document.getElementById("tasks").value === null) {
                alert("공정을 선택해주세요.");
                return;
              }
              const data = {
                companyNumber:
                  session?.token?.user?.affiliation === "admin"
                    ? "123"
                    : session?.token?.user?.affiliation,
                id: checkedEngineerAndOperator.id,
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                part: checkedEngineerAndOperator.part,
                fieldIndex: CheckedFieldItem.index,
                task: document.getElementById("tasks").value,
              };
              const res = await axios.put(baseURL+"/api/mongo/task", data);
              if (res.data.result === 1) {
                alert("등록되었습니다.");
                window.location.reload();
              } else {
                alert(res.data.msg);
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
        <div className="w-full h-[1.25rem] bg-[#F2F2F2]" /> */}
        <div className="">
          <div className="flex h-[3.125rem] relative px-[2.625rem]">
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
          {/* <div className="flex w-full h-[2.5rem] mt-[1.25rem] px-[2.625rem] justify-between">
            {[
              { sub: "삭제", url: "", image: "/images/main/myPage/x-mark-white.svg" },
              { sub: "등록", url: "", image: "/images/main/myPage/plus.svg" },
              { sub: "수정", url: "", image: "/images/main/myPage/edit.svg" },
            ].map((item, index) => {
              return (
                <div key={`${item?.sub}${index}`} className="flex items-center gap-[1.125rem]">
                  <button
                    className="flex justify-center items-center gap-[0.625rem] w-[5.25rem] h-[2.5rem] bg-[#182A5B]"
                    onClick={async (e) => {
                      if (item?.sub === "삭제") {
                        if (!selectedRobot) {
                          alert("삭제할 로봇을 선택해주세요.");
                          return;
                        }
                        // if (window.confirm("삭제하시겠습니까?")) {
                        //   const data = {
                        //     companyNumber:
                        //       session?.token?.user?.affiliation === "admin"
                        //         ? "123"
                        //         : session?.token?.user?.affiliation,
                        //     id: checkedEngineerAndOperator.id,
                        //     fieldIndex: CheckedFieldItem.index,
                        //   };
                        //   axios
                        //     .delete(url, {
                        //       data,
                        //     })
                        //     .then((res) => {
                        //       if (res.data.result === 1) {
                        //         alert("삭제되었습니다.");
                        //         window.location.reload();
                        //       } else {
                        //         alert("삭제에 실패하였습니다.");
                        //       }
                        //     });
                        // }
                      } else if (item?.sub === "등록") {
                      } else if (item?.sub === "수정") {
                        if (!CheckedFieldItem) {
                          alert("수정할 필드를 선택해주세요.");
                          return;
                        }
                        if (!checkedEngineerAndOperator) {
                          alert("수정할 엔지니어/오퍼레이터를 선택해주세요.");
                          return;
                        }
                        if (!selectedRobot) {
                          alert("수정할 로봇을 선택해주세요.");
                          return;
                        }
                        const data = {
                          companyNumber:
                            session?.token?.user?.affiliation === "admin"
                              ? "123"
                              : session?.token?.user?.affiliation,
                          id: checkedEngineerAndOperator.id,
                          fieldIndex: CheckedFieldItem.index,
                          tasks: checkedTaskItem,
                          robotId: selectedRobot.id,
                        };
                        const res = await axios.put(
                          baseURL+"/api/mongo/robotIntoEngineerAndOperator",
                          data
                        );
                        if (res.data.result === 1) {
                          alert("수정되었습니다.");
                          window.location.reload();
                        } else {
                          alert(res.data.msg);
                        }
                      }
                    }}
                  >
                    <picture className="w-[0.875rem] h-[0.875rem] relative">
                      <Image src={item?.image} fill alt="" />
                    </picture>
                    <span className="text-white text-sm">{item?.sub}</span>
                  </button>
                </div>
              );
            })}
          </div> */}
          <ul className="flex flex-col w-full min-h-[3.125rem] mt-[1.875rem] bg-white">
            {filteredArray?.map((item, index) => {
              return (
                <li
                  key={`${item?.id}${index}`}
                  className={`flex flex-col min-h-[3.125rem] border-b border-[#E0E0E0] items-center cursor-pointer ${
                    index === 0 ? "border-t border-[#E0E0E0]" : ""
                  }}`}
                  onClick={(e) => {}}
                >
                  <label
                    htmlFor={`${item?.id}${index}`}
                    className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer relative"
                  >
                    <div className="flex items-center gap-[1.125rem] py-[1rem]">
                      <picture className="select-none w-[1.75rem] h-[1.75rem] top-[0.0625rem] relative flex peer-checked:hidden">
                        <Image src={`/images/main/myPage/robot.svg`} fill alt="" />
                      </picture>
                      <span className="text-[#222222] text-base">{item?.nickName}</span>
                    </div>
                    <input
                      type="checkbox"
                      name={`robots`}
                      id={`${item?.id}${index}`}
                      className="peer hidden"
                      onClick={(e) => {
                        document.getElementsByName("robots").forEach((item) => {
                          if (item.id !== e.target.id) {
                            item.checked = false;
                            item.nextSibling.classList.add("hidden");
                            item.nextSibling.nextSibling.classList.remove("hidden");
                            item.parentNode.nextSibling.classList.add("hidden");
                          }
                        });
                        const target = document.querySelector(`.robot${item?.id}${index}`);
                        if (e.target.checked) {
                          target.classList.remove("hidden");
                          e.target.nextSibling.classList.remove("hidden");
                          e.target.nextSibling.nextSibling.classList.add("hidden");
                        } else {
                          target.classList.add("hidden");
                          e.target.nextSibling.classList.add("hidden");
                          e.target.nextSibling.nextSibling.classList.remove("hidden");
                        }
                        setSelectedRobot((current) => {
                          console.log(current, item);
                          return current === item ? null : item;
                        });
                      }}
                    />
                    <picture className="select-none w-[1rem] h-[0.5rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/arrow-down.svg`} fill alt="" />
                    </picture>
                    <picture className="select-none w-[1rem] h-[0.5rem] top-[0.0625rem] relative hidden">
                      <Image src={`/images/main/arrow-up.svg`} fill alt="" />
                    </picture>
                    <div className="w-[calc(100%)] h-full absolute z-0 -left-0 top-0 bg-[#182A5B1A] hidden peer-checked:block">
                      <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
                    </div>
                  </label>
                  <div className={`robot${item?.id}${index} w-full px-[2.5rem] hidden`}>
                    <div className="flex justify-between py-[0.3125rem] text-sm">
                      <span>로봇 ID</span>
                      <span>{item.id}</span>
                    </div>
                    <div className="flex justify-between py-[0.3125rem] text-sm">
                      <span>시리얼 번호</span>
                      <span></span>
                    </div>
                    <div className="flex justify-between py-[0.3125rem] text-sm">
                      <span>담당자</span>
                      <span></span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
// 1px convert to rem = 0.0625rem
// 18
