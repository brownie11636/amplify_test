import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedFieldItemAtom,
  CheckedTaskItemAtom,
  CreateFieldItemAtom,
  FieldSelectedRadioAtom,
} from "../../../../recoil/AtomStore";

export const FieldList = ({ children, data }) => {
  const searchRef = useRef();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([...data]);

  const setFieldSelectedRadio = useSetRecoilState(FieldSelectedRadioAtom);
  const setCreateFieldItem = useSetRecoilState(CreateFieldItemAtom);
  const setCheckedFieldItem = useSetRecoilState(CheckedFieldItemAtom);
  const setCheckedTaskItem = useSetRecoilState(CheckedTaskItemAtom);
  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  useEffect(() => {
    if (value) {
      const filtered = data.filter((item) => {
        return item.fieldName.includes(value);
      });
      console.log(filtered);
      setFilteredArray(filtered);
    } else {
      setFilteredArray([...data]);
    }
  }, [value, data]);
  return (
    <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
      <div className="px-[2.625rem]">
        <div className="flex mb-[2.625rem]">
          {/* <label htmlFor="fieldList">
            <input
              type="radio"
              name="fieldRadioList"
              id="fieldList"
              className="peer hidden"
              defaultChecked
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldSelectedRadio(e.target.id);
                }
              }}
            />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
              <span className="text-base">{"현장목록"}</span>
            </div>
          </label>
          <label htmlFor="robotList">
            <input
              type="radio"
              name="fieldRadioList"
              id="robotList"
              className="peer hidden"
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldSelectedRadio(e.target.id);
                }
              }}
            />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
              <span className="text-base">{"로봇목록"}</span>
            </div>
          </label> */}
          <div className="flex items-center cursor-pointer text-[#7D7D7D] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
            <span className="text-base">{"현장목록"}</span>
          </div>
        </div>

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
        <button
          className="flex justify-center items-center gap-[0.625rem] w-full h-[2.625rem] my-[1.125rem] bg-[#182A5B]"
          onClick={() => {
            setCreateFieldItem(true);
            setCheckedFieldItem(null);
          }}
        >
          <picture className="w-[0.75rem] h-[0.75rem] top-[0.0625rem] relative">
            <Image src={`/images/main/mypage/plus.svg`} fill alt="" />
          </picture>
          <span className="text-white">신규등록</span>
        </button>
      </div>
      <div className="py-[1.125rem]">
        <ul className="flex flex-col h-fit">
          {filteredArray?.map((item, index) => {
            return (
              <li
                className={`flex flex-col justify-between py-[0.625rem] border-b border-b-[#DCDCDC] cursor-pointer ${
                  index === 0 ? "border-t" : ""
                }`}
                key={`${item?.fieldName}${index}`}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                  htmlFor={`list${index}`}
                >
                  <div className="py-[1rem] flex gap-[1.125rem]">
                    <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/mypage/field.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item?.fieldName}</span>
                  </div>
                  <input
                    type="checkbox"
                    name="fieldList"
                    id={`list${index}`}
                    className="peer hidden"
                    onChange={(e) => {
                      setCreateFieldItem(false);
                      setCheckedFieldItem(item);
                      document.getElementsByName(`fieldList`).forEach((element) => {
                        if (element.checked) {
                          if (e.target.id !== element.id) {
                            element.checked = false;
                            element?.parentNode?.nextSibling?.classList?.add("hidden");
                          }
                        }
                      });
                      const target = document.querySelector(`.list${index}`);
                      if (e.target.checked) {
                        target.classList.remove("hidden");
                      } else {
                        target.classList.add("hidden");
                      }
                    }}
                  />
                  <picture className="select-none w-[1rem] h-[0.5rem] top-[0.0625rem] relative flex peer-checked:hidden">
                    <Image src={`/images/main/arrow-down.svg`} fill alt="" />
                  </picture>
                  <picture className="select-none w-[1rem] h-[0.5rem] top-[0.0625rem] relative hidden peer-checked:flex">
                    <Image src={`/images/main/arrow-up.svg`} fill alt="" />
                  </picture>
                </label>
                <div className={`list${index} hidden`}>
                  <ul className="flex flex-col w-full min-h-[3.125rem] bg-white">
                    {[...Array(item?.processCount).keys()]?.map((element, idx) => {
                      return (
                        <li
                          key={`${element.id}${index}${idx}`}
                          className="flex flex-col min-h-[3.125rem] items-center cursor-pointer"
                          onClick={() => {
                            setCheckedTaskItem(element + 1);
                          }}
                        >
                          <label
                            htmlFor={`${element.id}${index}${idx}`}
                            className="flex items-center w-full cursor-pointer relative"
                          >
                            <div className="flex py-[1rem] pl-[4.75rem]">
                              <span className="text-[#222222] text-base">{`제 ${
                                element + 1
                              } 공정`}</span>
                            </div>
                            <input
                              type="radio"
                              name={`task`}
                              id={`${element.id}${index}${idx}`}
                              className="peer hidden"
                              onChange={() => {
                                document.getElementsByName(`task${index}`).forEach((element) => {
                                  if (!element.checked) {
                                    element.nextSibling.classList.add("hidden");
                                  } else {
                                    element.nextSibling.classList.remove("hidden");
                                  }
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
