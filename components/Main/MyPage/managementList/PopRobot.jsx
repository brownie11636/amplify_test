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

export const PopRobot = ({}) => {
  const [companyItem, SetCompanyItem] = useRecoilState(CompanyItemAtom);
  const selectedRobot = useRecoilValue(SelectedRobotAtom);
  const selectedCompany = useRecoilValue(SelectedCompanyAtom);
  const selectedField = useRecoilValue(SelectedFieldAtom);
  const selectedTask = useRecoilValue(SelectedTaskAtom);
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  return (
    <div className="py-[2.625rem] w-[22.5rem] min-h-[56.25rem] h-fit bg-white relative">
      <div className="text-lg text-[#222222] pl-[2.5rem]">
        <span>배치로봇</span>
      </div>
      <div className="py-[2.5rem]">
        <ul className="flex flex-col h-fit">
          {companyItem?.map((company, index) => {
            let filtered = company?.robots;
            if (selectedCompany) {
              filtered = filtered?.filter((item) => {
                return selectedCompany?.robots?.some((selected) => selected?.id === item?.id);
              });
            }
            if (selectedField) {
              filtered = filtered?.filter((item) => {
                return item?.field === selectedField?.index;
              });
            }
            if (selectedTask) {
              filtered = filtered?.filter((item) => {
                return item?.tasks === selectedTask;
              });
            }
            return (
              <div key={`pop${index}`}>
                {filtered?.map((item, idx) => {
                  return (
                    <li
                      className={`flex flex-col justify-between border-b border-b-[#DCDCDC] ${
                        idx === 0 ? "border-t" : ""
                      }`}
                      key={`${item?.id}${idx}`}
                      onClick={() => {}}
                    >
                      <label
                        className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full relative"
                        htmlFor={`pop${idx}`}
                      >
                        <div className="py-[1rem] flex gap-[1.125rem] items-center">
                          <picture className="select-none w-[1.5rem] h-[1.5rem] top-[0.0625rem] relative">
                            <Image src={`/images/main/myPage/robot.svg`} fill alt="" />
                          </picture>
                          <span className="text-[#222222] text-base">{item?.nickName}</span>
                        </div>
                        <button
                          className="bg-[#182A5B] w-[4.25rem] h-[1.875rem] flex justify-center items-center "
                          onClick={async (e) => {
                            if (!selectedCompany) {
                              alert("회사를 선택해주세요");
                              return;
                            }
                            // if (!selectedField) {
                            //   alert("현장을 선택해주세요");
                            //   return;
                            // }
                            // if (selectedTask === null) {
                            //   alert("공정을 선택해주세요");
                            //   return;
                            // }
                            const res = await axios.post(
                              baseURL + "/api/mongo/robot/pop",
                              {
                                robotId: item?.id,
                                task: selectedTask,
                                fieldIndex: selectedField?.index,
                                companyNumber: selectedCompany?.companyNumber,
                              },
                              { headers: { Authorization: `${session?.token?.accessToken}` } }
                            );
                            console.log(res);
                            if (res?.data?.result === 1) {
                              alert("수거 성공");
                              window.location.reload();
                            } else {
                              alert("수거 실패");
                            }
                          }}
                        >
                          <span className="text-sm text-white">수거</span>
                        </button>
                      </label>
                    </li>
                  );
                })}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 30px convert to rem = 1.875rem
