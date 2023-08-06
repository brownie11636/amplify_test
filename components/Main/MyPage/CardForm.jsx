"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedCustomerItemAtom,
  CheckedCustomerPartItemAtom,
  CheckedValueAtom,
  CustomerAtom,
  DeleteModalAtom,
} from "../../../recoil/AtomStore";

const CardForm = ({ data, type, visible }) => {
  const CheckedCustomerItem = useRecoilValue(CheckedCustomerItemAtom);
  const CheckedCustomerPartItem = useRecoilValue(CheckedCustomerPartItemAtom);
  // useEffect(() => {}, [CheckedCustomerItem]);
  return (
    <>
      {type === 1 ? (
        <div className="flex gap-[60px] min-w-[calc(100%_-_60px)] w-fit">
          <거래처목록 data={data} />
          {CheckedCustomerItem ? <거래처 data={CheckedCustomerItem} /> : null}
          {CheckedCustomerPartItem ? <역할 data={CheckedCustomerPartItem} /> : null}
        </div>
      ) : null}
    </>
  );
};
export default CardForm;

const 거래처 = ({ data }) => {
  console.log(data);
  const searchRef = useRef(null);
  const [value, setValue] = useState("");
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  return (
    <>
      <div className="py-[2.625rem] w-[360px] h-fit bg-white relative">
        <div className="px-[2.625rem]">
          <div className="mb-[10px]">
            <span className="text-[#222222] text-lg">{data?.sub}</span>
          </div>
          <InputTextItem title="회원번호" value={data?.name} placeholder={""} />
          <InputTextItem title="사업자등록번호" value={data?.name} placeholder={""} />
          <InputTextItem title="전화번호" value={data?.name} placeholder={""} />
          <InputAddressItem title="전화번호" value={data?.name} placeholder={""} />
          <span
            className="flex text[#222222] text-base underline cursor-pointer mt-[2.625rem]"
            onClick={() => {
              setVisibleDeleteModal(true);
            }}
          >
            계정삭제
          </span>
        </div>
      </div>
    </>
  );
};
const 역할 = ({ data }) => {
  console.log(data);
  const searchRef = useRef(null);
  const [value, setValue] = useState("");
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  return (
    <>
      <div className="py-[2.625rem] w-[360px] h-fit bg-white relative">
        <div className="px-[2.625rem]">
          <div className="mb-[10px]">
            <span className="text-[#222222] text-lg">{data?.sub}</span>
          </div>
          <InputTextItem title="아이디" value={data?.id} placeholder={""} />
          <InputTextItem title="비밀번호" value={data?.password} placeholder={""} />
          <InputTextItem title="이름" value={data?.name} placeholder={""} />
          <InputTextItem title="연락처" value={data?.phone} placeholder={""} />
          <InputTextItem title="이메일" value={data?.email} placeholder={""} />
          <div className="flex w-[17.5rem] h-[2.5rem] mt-[2.625rem] ">
            <button className="select-none w-[8.75rem] h-[2.5rem]  border border-[#182A5B] border-solid flex justify-center items-center">
              <span>비밀번호 초기화</span>
            </button>
            <button className="select-none w-[8.75rem] h-[2.5rem]  border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center">
              <span className="text-white">수정</span>
            </button>
          </div>
          <span
            className="flex text[#222222] text-base underline cursor-pointer mt-[2.625rem]"
            onClick={() => {
              setVisibleDeleteModal(true);
            }}
          >
            계정삭제
          </span>
        </div>
      </div>
    </>
  );
};

const 거래처목록 = ({ data }) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState();
  const [checkedValue, setCheckedValue] = useRecoilState(CheckedValueAtom);
  const [checkedPartValue, setCheckedPartValue] = useRecoilState(CheckedCustomerPartItemAtom);
  const [customerItem, setCustomerItem] = useRecoilState(CustomerAtom);
  const setCheckedCustomerItem = useSetRecoilState(CheckedCustomerItemAtom);
  const CheckedCustomerItem = useRecoilValue(CheckedCustomerItemAtom);
  useEffect(() => {
    console.log(checkedValue);
    // console.log(customerItem);
    // console.log(CheckedCustomerItem);
    // console.log(checkedPartValue);
  }, [CheckedCustomerItem]);
  return (
    <>
      <div className="py-[2.625rem] w-[360px] h-fit bg-white relative">
        <div className="px-[2.625rem]">
          <div className="mb-[2.625rem]">
            <span className="text-[#222222] text-lg">{data?.title}</span>
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
          <button
            className="flex justify-center items-center gap-[10px] w-full h-[2.625rem] my-[20px] bg-[#182A5B]"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <picture className="w-[12px] h-[12px] top-[1px] relative">
              <Image src={`/images/main/mypage/plus.svg`} fill alt="" />
            </picture>
            <span className="text-white">신규등록</span>
          </button>
        </div>
        <div className="py-[20px]">
          <ul className="flex flex-col h-fit">
            {data?.list?.map((item, index) => (
              <li
                key={`${item.sub}${index}`}
                className={`flex flex-col min-h-[50px] border-b ${
                  index === 0 ? "border-t" : null
                } border-[#E0E0E0]`}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[20px] w-full cursor-pointer"
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
                            className="flex items-center justify-between pl-[2.625rem] pr-[20px] w-full cursor-pointer"
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
                                  const checked = customerItem?.find((i) => i.id === "test");
                                  const list = checked?.list?.find((i) =>
                                    i.children.filter((e) =>
                                      e.children.filter((e) => e.name === checkedValue)
                                    )
                                  );
                                  // console.log("list");
                                  // console.log(list);
                                  setCheckedCustomerItem(list);
                                  const part = list?.children?.find((i) =>
                                    i.children.find((e) => e.name === checkedValue)
                                  );
                                  // console.log("part");
                                  // console.log(part);
                                  setCheckedPartValue(part);
                                  const user = part?.children?.find((i) => i.name === checkedValue);
                                  // console.log("user");
                                  // console.log(user);
                                } else {
                                  target.classList.add("hidden");
                                  setCheckedCustomerItem(null);
                                  setCheckedPartValue(null);
                                  setCheckedCustomerItem(null);
                                }
                              }}
                            />
                            <div
                              className="w-full h-full absolute left-0 top-0 bg-[#182A5B1A] hidden"
                              onClick={(e) => {
                                e.target.previousSibling.click();
                                setCheckedValue(c.name);
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

const InputTextItem = ({ title, value, placeholder }) => {
  return (
    <div className="flex flex-col items-start justify-between mt-[42px]">
      <div className="flex items-center">
        <div className="w-[2px] h-[16px] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[10px]">{title}</span>
      </div>
      <div className="flex w-full h-[50px] items-center">
        <input
          type="text"
          className="flex w-full h-[50px] border-b border-b-[#182A5B] text-base text-[#222222] pl-[20px] focus:outline-none"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
};
const InputAddressItem = ({ title, value, placeholder }) => {
  return (
    <div className="flex flex-col mt-[2.625rem]">
      <div className="flex items-center">
        <div className="w-[2px] h-[16px] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[10px]">{title}</span>
      </div>
      <div className="flex w-full h-[50px] items-center justify-between">
        <input
          type="text"
          className="flex w-[12.625rem] h-[50px] border-b border-b-[#182A5B] text-base text-[#222222] pl-[20px] focus:outline-none"
          placeholder={placeholder}
          value={value}
        />
        <button className="flex justify-center items-center w-[120px] h-[2.625rem] bg-[#182A5B]">
          <span className=" text-white">검색</span>
        </button>
      </div>
    </div>
  );
};
// 42px convert to rem =
