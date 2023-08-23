import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CompanyItemAtom,
  SelectedCompanyAtom,
  SelectedFieldAtom,
  SelectedRobotAtom,
  SelectedTaskAtom,
} from "../../../../recoil/AtomStore";
import axios from "axios";

export const SelectField = ({}) => {
  const [companyItem, SetCompanyItem] = useRecoilState(CompanyItemAtom);
  const selectedRobot = useRecoilValue(SelectedRobotAtom);
  const selectedCompany = useRecoilValue(SelectedCompanyAtom);
  const [selectedField, setSelectedField] = useRecoilState(SelectedFieldAtom);
  const [selectedTask, setSelectedTask] = useRecoilState(SelectedTaskAtom);
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  return (
    <div
      className={`flex ${
        !selectedField ? "w-[22.5rem]" : "w-[38.75rem]"
      } min-h-[56.25rem] h-fit bg-white relative`}
    >
      <div className="w-full my-[2.5rem]">
        <div className="text-lg text-[#222222] pl-[2.5rem]">
          <span>현장 선택</span>
        </div>
        <div className="w-full mt-[2.5rem] pr-[0.625rem] border-r">
          <ul className="flex flex-col h-fit">
            {companyItem?.map((company, index) => {
              return (
                <>
                  {company?.fields?.map((item, idx) => {
                    return (
                      <li
                        className={`flex flex-col justify-between border-b border-b-[#DCDCDC] cursor-pointer ${
                          idx === 0 ? "border-t" : ""
                        }`}
                        key={`${item?.fieldName}${idx}`}
                        onClick={() => {}}
                      >
                        <label
                          className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer relative"
                          htmlFor={`field${idx}`}
                        >
                          <div className="py-[1rem] flex gap-[1.125rem]">
                            <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                              <Image src={`/images/main/mypage/field.svg`} fill alt="" />
                            </picture>
                            <span className="text-[#222222] text-base">{item?.fieldName}</span>
                          </div>
                          <input
                            type="checkbox"
                            name={`field`}
                            id={`field${idx}`}
                            className="peer hidden"
                            onChange={(e) => {
                              if (!e.target.checked) {
                                setSelectedField(null);
                                setSelectedTask(null);
                              }
                            }}
                            onClick={(e) => {
                              document.getElementsByName("field").forEach((item) => {
                                if (item.id !== e.target.id) {
                                  item.checked = false;
                                  item.nextSibling.classList.add("hidden");
                                }
                              });
                              if (e.target.checked) {
                                e.target.nextSibling.classList.remove("hidden");
                              } else {
                                e.target.nextSibling.classList.add("hidden");
                              }
                              setSelectedField((current) => {
                                return current === item ? null : item;
                              });
                              setSelectedTask(null);
                            }}
                          />
                          <div className="w-[calc(100%)] h-full absolute z-0 -left-0 top-0 bg-[#182A5B1A] hidden peer-checked:block">
                            <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </>
              );
            })}
          </ul>
        </div>
      </div>
      {selectedField ? (
        <div className="w-full my-[2.5rem]">
          <>
            <div className="text-lg text-[#222222] pl-[2.5rem]">
              <span>공정 선택</span>
            </div>
            <div className="mt-[2.5rem] pl-[0.625rem] border-l relative right-[0.0625rem]">
              <ul className="flex flex-col h-fit">
                {[...Array(parseInt(selectedField?.processCount)).keys()]?.map((item, idx) => {
                  return (
                    <li
                      className={`flex flex-col min-h-[3.4375rem] justify-between border-b border-b-[#DCDCDC] cursor-pointer ${
                        idx === 0 ? "border-t" : ""
                      }`}
                      key={`task${item}${idx}`}
                      onClick={() => {
                        setSelectedTask(item + 1);
                      }}
                    >
                      <label
                        className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full h-full cursor-pointer relative"
                        htmlFor={`task${idx}`}
                      >
                        <div className="py-[1rem] flex gap-[1.125rem]">
                          <span className="text-[#222222] text-base">{`제 ${item + 1} 공정`}</span>
                        </div>
                        <input
                          type="checkbox"
                          name={`task`}
                          id={`task${idx}`}
                          className="peer hidden"
                          onClick={(e) => {
                            document.getElementsByName("task").forEach((item) => {
                              if (item.id !== e.target.id) {
                                item.checked = false;
                                item.nextSibling.classList.add("hidden");
                              }
                            });
                            if (e.target.checked) {
                              e.target.nextSibling.classList.remove("hidden");
                            } else {
                              e.target.nextSibling.classList.add("hidden");
                            }
                            setSelectedTask((current) => {
                              return current === item + 1 ? null : item + 1;
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
            <button
              className="bg-[#182A5B] w-full h-[2.75rem] mt-[1.25rem] flex justify-center items-center "
              onClick={async () => {
                console.log(selectedTask);
                if (selectedTask === null) {
                  alert("공정을 선택해주세요.");
                  return;
                }
                if (!selectedField) {
                  alert("현장을 선택해주세요.");
                  return;
                }
                const res = await axios.post(baseURL + "/api/mongo/robot/batch", {
                  task: selectedTask,
                  fieldIndex: selectedField?.index,
                  companyNumber: selectedCompany?.companyNumber,
                  robotId: selectedRobot?.id,
                });
                console.log(res);
                if (res) {
                  alert("배치가 완료되었습니다.");
                  setSelectedField(null);
                  setSelectedTask(null);
                  window.location.reload();
                } else {
                  alert("배치에 실패하였습니다.");
                }
              }}
            >
              <span className="text-base text-white">배치하기</span>
            </button>
          </>
        </div>
      ) : null}
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 360
