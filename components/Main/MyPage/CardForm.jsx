"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CardForm = ({ data, type, visible }) => {
  return (
    <>
      {type === 1 ? (
        <div className="flex gap-[60px] min-w-[calc(100%_-_60px)] w-fit">
          <거래처목록 data={data} />
          <역할 data={data} />
          <역할 data={data} />
        </div>
      ) : null}
    </>
  );
};
export default CardForm;
const 역할 = ({ data, ref }) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState("");
  return (
    <>
      <div className="py-[40px] w-[360px] h-fit bg-white relative">
        <div className="px-[40px]">
          <div className="mb-[40px]">
            <span className="text-[#222222] text-lg">{data.title}</span>
          </div>
          <div className="flex h-[50px] relative">
            <input
              type="text"
              ref={searchRef}
              placeholder="검색"
              className="border-b border-b-[#182A5B] px-[20px] py-[20px] w-full ring-0 focus:outline-none placeholder:text-[#7D7D7D] placeholder:text-base"
              onChange={() => {
                setValue(searchRef.current.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const 거래처목록 = ({ data, ref }) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState("");
  return (
    <>
      <div className="py-[40px] w-[360px] h-fit bg-white relative">
        <div className="px-[40px]">
          <div className="mb-[40px]">
            <span className="text-[#222222] text-lg">{data.title}</span>
          </div>
          <div className="flex h-[50px] relative">
            <input
              type="text"
              ref={searchRef}
              placeholder="검색"
              className="border-b border-b-[#182A5B] px-[20px] py-[20px] w-full ring-0 focus:outline-none placeholder:text-[#7D7D7D] placeholder:text-base"
              onChange={() => {
                setValue(searchRef.current.value);
              }}
            />
            <span className="absolute top-[32%] right-[5.7142857142857%] flex w-[18px] h-[18px] cursor-pointer">
              <Image src={`/images/main/mypage/search.svg`} fill alt="" />
            </span>
          </div>
          <button className="flex justify-center items-center gap-[10px] w-full h-[40px] my-[20px] bg-[#182A5B]">
            <picture className="w-[12px] h-[12px] top-[1px] relative">
              <Image src={`/images/main/mypage/plus.svg`} fill alt="" />
            </picture>
            <span className="text-white">신규등록</span>
          </button>
        </div>
        <div className="py-[20px]">
          <ul className="flex flex-col h-fit">
            {data.list.map((item, index) => (
              <li
                key={`${item.sub}${index}`}
                className={`flex flex-col min-h-[50px] border-b ${
                  index === 0 ? "border-t" : null
                } border-[#E0E0E0]`}
              >
                <label
                  className="flex items-center justify-between pl-[40px] pr-[20px] w-full cursor-pointer"
                  htmlFor={`check${index}`}
                >
                  <div className="py-[16px] flex gap-[18px]">
                    <picture className="select-none w-[18px] h-[18px] top-[1px] relative">
                      <Image src={`/images/main/mypage/company.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item.sub}</span>
                  </div>
                  <input
                    type="checkbox"
                    id={`check${index}`}
                    className="peer hidden"
                    onChange={(e) => {
                      const target = document.querySelector(`.check${index}`);
                      if (e.target.checked) {
                        target.classList.remove("hidden");
                      } else {
                        target.classList.add("hidden");
                      }
                    }}
                  />
                  <picture className="select-none w-[16px] h-[8px] top-[1px] relative flex peer-checked:hidden">
                    <Image src={`/images/main/arrow-down.svg`} fill alt="" />
                  </picture>
                  <picture className="select-none w-[16px] h-[8px] top-[1px] relative hidden peer-checked:flex">
                    <Image src={`/images/main/arrow-up.svg`} fill alt="" />
                  </picture>
                </label>
                <div className={`check${index} hidden`}>
                  {item.children.map((child, idx) => (
                    <div key={`${child.name}${index}${idx}`}>
                      <ul className="flex w-full h-[50px] bg-white">
                        <li className="flex flex-col h-[50px] items-center pl-[14px] w-full cursor-pointer">
                          <label
                            htmlFor={`check${index}${idx}`}
                            className="flex items-center justify-between pl-[40px] pr-[20px] w-full cursor-pointer"
                          >
                            <div className="py-[16px] flex gap-[18px]">
                              <picture className="select-none w-[18px] h-[18px] top-[1px] relative">
                                <Image src={`/images/main/mypage/folder.svg`} fill alt="" />
                              </picture>
                              <span className="text-[#222222] text-base">{child.name}</span>
                            </div>
                            <input
                              type="checkbox"
                              id={`check${index}${idx}`}
                              className="peer hidden"
                              onChange={(e) => {
                                const target = document.querySelector(`.check${index}${idx}`);
                                if (e.target.checked) {
                                  target.classList.remove("hidden");
                                } else {
                                  target.classList.add("hidden");
                                }
                              }}
                            />
                            <picture className="select-none w-[16px] h-[8px] top-[1px] relative flex peer-checked:hidden">
                              <Image src={`/images/main/arrow-down.svg`} fill alt="" />
                            </picture>
                            <picture className="select-none w-[16px] h-[8px] top-[1px] relative hidden peer-checked:flex">
                              <Image src={`/images/main/arrow-up.svg`} fill alt="" />
                            </picture>
                          </label>
                        </li>
                      </ul>
                      <div className={`check${index}${idx} hidden`}>
                        {child.children.map((c, i) => (
                          <div
                            key={`${c.name}${index}${idx}${i}`}
                            className="relative flex items-center justify-between pr-[20px] w-full cursor-pointer"
                          >
                            <label
                              htmlFor={`check${index}${idx}${i}`}
                              className="flex w-full h-[50px] bg-white"
                            >
                              <div className="flex flex-col h-[50px] pl-[68px] w-full cursor-pointer">
                                <div className="py-[16px] flex gap-[18px]">
                                  <picture className="select-none w-[18px] h-[18px] top-[1px] relative">
                                    <Image src={`/images/main/mypage/person.svg`} fill alt="" />
                                  </picture>
                                  <span className="text-[#222222] text-base">{c.name}</span>
                                </div>
                              </div>
                            </label>
                            <input
                              type="checkbox"
                              name=""
                              id={`check${index}${idx}${i}`}
                              className="peer "
                              onChange={(e) => {
                                const target = e.target.nextSibling;
                                if (e.target.checked) {
                                  target.classList.remove("hidden");
                                } else {
                                  target.classList.add("hidden");
                                }
                              }}
                            />
                            <div
                              className="w-full h-full absolute left-0 top-0 bg-[#182A5B1A] hidden"
                              onClick={(e) => {
                                e.target.previousSibling.click();
                              }}
                            >
                              <span className="flex h-full w-[8px] bg-[#182A5B]"></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
