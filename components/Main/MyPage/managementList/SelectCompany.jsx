import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  CompanyItemAtom,
  SelectedCompanyAtom,
  SelectedFieldAtom,
  SelectedRobotAtom,
  SelectedTaskAtom,
} from "../../../../recoil/AtomStore";

export const SelectCompany = ({}) => {
  const [companyItem, SetCompanyItem] = useRecoilState(CompanyItemAtom);
  const [selectedCompany, setSelectedCompany] = useRecoilState(SelectedCompanyAtom);
  const [selectedField, setSelectedField] = useRecoilState(SelectedFieldAtom);
  const [selectedTask, setSelectedTask] = useRecoilState(SelectedTaskAtom);

  return (
    <div className="py-[2.625rem] w-[22.5rem] min-h-[56.25rem] h-fit bg-white relative">
      <div className="text-lg text-[#222222] pl-[2.5rem]">
        <span>거래처 선택</span>
      </div>
      <div className="py-[2.5rem]">
        <ul className="flex flex-col h-fit">
          {companyItem?.map((item, idx) => {
            return (
              <li
                className={`flex flex-col justify-between border-b border-b-[#DCDCDC] cursor-pointer ${
                  idx === 0 ? "border-t" : ""
                }`}
                key={`${item?.companyName}${idx}`}
                onClick={() => {}}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer relative"
                  htmlFor={`company${idx}`}
                >
                  <div className="py-[1rem] flex gap-[1.125rem]">
                    <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/mypage/field.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item?.companyName}</span>
                  </div>
                  <input
                    type="checkbox"
                    name={`company`}
                    id={`company${idx}`}
                    className="peer hidden"
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setSelectedTask(null);
                        setSelectedField(null);
                        setSelectedCompany(null);
                      }
                    }}
                    onClick={(e) => {
                      document.getElementsByName("company").forEach((item) => {
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
                      setSelectedCompany((current) => {
                        console.log(current, item);
                        return current === item ? null : item;
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
    </div>
  );
};
// 1px convert to rem = 0.0625rem
//
