"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedAccountItemAtom,
  CheckedCompanyItemAtom,
  CheckedCustomerItemAtom,
  CheckedCustomerPartItemAtom,
  CheckedValueAtom,
  CreateAccountItemAtom,
  CustomerAtom,
  DeleteModalAtom,
} from "../../../recoil/AtomStore";
import Head from "next/head";
import axios from "axios";

const CardForm = ({ data, type, visible }) => {
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  const CheckedAccountItem = useRecoilValue(CheckedAccountItemAtom);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const CheckedCustomerItem = useRecoilValue(CheckedCustomerItemAtom);
  const CheckedCustomerPartItem = useRecoilValue(CheckedCustomerPartItemAtom);
  useEffect(() => {}, [CheckedCompanyItem]);
  return (
    <>
      <Head>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
      </Head>
      {type === 1 ? (
        <div className="flex gap-[3.75rem] min-w-[calc(100%_-_3.75rem)] w-fit">
          <VenderList data={data} />
          {CreateAccountItem ? <Company isCreate={CreateAccountItem} /> : null}
          {CreateAccountItem ? null : CheckedCompanyItem ? (
            <Company data={CheckedCompanyItem} isCreate={CreateAccountItem} />
          ) : null}
          {CreateAccountItem ? null : CheckedCompanyItem && !CheckedAccountItem ? (
            <Part sub="관리자" isCreate={CreateAccountItem} />
          ) : CheckedAccountItem ? (
            <Part data={CheckedAccountItem} isCreate={CreateAccountItem} />
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default CardForm;

const Company = ({ data }) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState("");
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  return (
    <>
      <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative ">
        <div className="px-[2.625rem]">
          {CreateAccountItem ? (
            <div className="flex items-center gap-[1.125rem]">
              <picture className="w-[1.375rem] h-[1.375rem] relative">
                <Image src={`/images/main/myPage/company.svg`} fill alt="" draggable={false} />
              </picture>
              <input
                type="text"
                id="companyName"
                className="text-sm py-[0.625rem] px-[1rem] border-b border-b-[#182A5B]"
                placeholder="회사명 입력"
              />
            </div>
          ) : (
            <div className="flex items-center gap-[1.125rem] mb-[0.625rem]">
              <picture className="w-[1.375rem] h-[1.375rem] relative">
                <Image src={`/images/main/myPage/company.svg`} fill alt="" draggable={false} />
              </picture>
              <span className="text-[#222222] text-lg">{data?.companyName}</span>
            </div>
          )}
          <InputTextItem
            title="회원번호"
            id="userNumber"
            value={data?.userNumber}
            placeholder={""}
          />
          <InputTextItem
            title="사업자등록번호"
            id="companyNumber"
            value={data?.companyNumber}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputTextItem
            title="전화번호"
            id="phoneNumber"
            value={data?.phoneNumber}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputAddressItem
            title="회사주소"
            id="companyAddress"
            zipCode={data?.zipCode}
            address={data?.address}
            detailAddress={data?.detailAddress}
          />
          {CreateAccountItem ? (
            <button
              className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
              onClick={async () => {
                const companyName = document.getElementById("companyName").value;
                const userNumber = document.getElementById("userNumber").value;
                const companyNumber = document.getElementById("companyNumber").value;
                const phoneNumber = document.getElementById("phoneNumber").value;
                const companyAddress = document
                  .getElementById("companyAddress")
                  .querySelectorAll("input");
                const zipCode = companyAddress[0].value;
                const address = companyAddress[1].value;
                const detailAddress = companyAddress[2].value;
                const data = {
                  companyName,
                  userNumber,
                  companyNumber,
                  phoneNumber,
                  zipCode,
                  address,
                  detailAddress,
                };
                console.log(data);
                const res = await axios.post(
                  "https://localhost:3333/api/mongo/createAccount",
                  data
                );
                console.log(res);
                if (res.data.result === 1) {
                  alert("등록되었습니다.");
                  window.location.reload();
                }
              }}
            >
              <picture className="relative w-[0.875rem] h-[0.75rem]">
                <Image src={`/images/main/myPage/check.svg`} fill alt="" />
              </picture>
              <span className="text-base text-white">등록</span>
            </button>
          ) : (
            <button className="w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center">
              <picture className="relative w-[0.875rem] h-[0.75rem]">
                <Image src={`/images/main/myPage/edit.svg`} fill alt="" />
              </picture>
              <span className="text-white">수정</span>
            </button>
          )}
          {CreateAccountItem ? null : (
            <span
              className="flex text[#222222] text-base underline cursor-pointer mt-[2rem]"
              onClick={() => {
                setVisibleDeleteModal(true);
              }}
            >
              계정삭제
            </span>
          )}
        </div>
      </div>
    </>
  );
};
const Part = ({ data, sub, isCreate }) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState("");
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  useEffect(() => {
    const password = document.getElementById("password");
    const passwordCheck = document.getElementById("passwordCheck");
    passwordCheck.addEventListener("blur", () => {
      if (password.value !== passwordCheck.value) {
        passwordCheck.nextSibling.classList.remove("hidden");
      }
    });
    passwordCheck.addEventListener("keyup", () => {
      if (password.value === passwordCheck.value) {
        passwordCheck.nextSibling.classList.add("hidden");
      }
    });
  }, []);

  return (
    <>
      <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
        <div className="px-[2.625rem]">
          <div className="flex items-center gap-[1.125rem]">
            <picture className="w-[1.375rem] h-[1.375rem] relative">
              <Image src={`/images/main/myPage/folder.svg`} fill alt="" draggable={false} />
            </picture>
            <span id="part" className="text-[#222222] text-lg">
              {sub}
            </span>
          </div>
          <InputTextItem
            title="아이디"
            id={"userId"}
            value={data?.id}
            placeholder={"영문자+숫자, 20자제한, 특수기호 금지"}
          />
          <InputTextItem
            title="비밀번호"
            id={"password"}
            type="password"
            value={data?.password}
            placeholder={"영문자+숫자, 20자 제한"}
          />
          <InputTextItem
            title="비밀번호 확인"
            id={"passwordCheck"}
            type="password"
            value={""}
            placeholder={"비밀번호를 한번 더 입력"}
          />
          <InputTextItem title="이름" value={data?.name} placeholder={"이름 입력"} />
          <InputTextItem title="연락처" value={data?.phone} placeholder={"'-'를 포함하여 입력"} />
          <InputTextItem
            title="이메일"
            value={data?.email}
            placeholder={"이메일 주소를 끝까지 입력"}
          />
          {
            (isCreate = { CreateAccountItem } ? (
              <button
                className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
                onClick={async (e) => {
                  const targetArr = e.target.parentNode.parentNode.querySelectorAll("input");
                  [...targetArr].map((item) => {
                    if (item.value === "") {
                      return alert("빈칸을 모두 채워주세요.");
                    }
                  });
                  const part = document.getElementById("part").innerText;
                  const id = targetArr[0].value;
                  const password = targetArr[1].value;
                  const name = targetArr[3].value;
                  const phone = targetArr[4].value;
                  const email = targetArr[5].value;
                  const data = {
                    parent: CheckedCompanyItem?.companyNumber,
                    sub:
                      part === "관리자"
                        ? "admins"
                        : part === "엔지니어"
                        ? "engineers"
                        : "operators",
                    id,
                    password,
                    name,
                    phone,
                    email,
                  };
                  console.log(data);
                  const res = await axios.post("https://localhost:3333/api/mongo/createPart", data);
                  console.log(res);
                  if (res.data.result === 1) {
                    alert("등록되었습니다.");
                    return window.location.reload();
                  } else if (res.data.result === 0) {
                    targetArr[0].value = "";
                    targetArr[0].focus();
                    return alert("이미 존재하는 아이디입니다.");
                  }
                }}
              >
                <picture className="relative w-[0.875rem] h-[0.75rem]">
                  <Image src={`/images/main/myPage/check.svg`} fill alt="" />
                </picture>
                <span className="text-base text-white">등록</span>
              </button>
            ) : (
              <div className="flex w-[17.5rem] h-[2.5rem] mt-[2.625rem] ">
                <button className="select-none w-[8.75rem] h-[2.5rem]  border border-[#182A5B] border-solid flex justify-center items-center">
                  <span>비밀번호 초기화</span>
                </button>
                <button className="select-none w-[8.75rem] h-[2.5rem]  border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center">
                  <span className="text-white">수정</span>
                </button>
              </div>
            ))
          }
          {CreateAccountItem ? null : (
            <span
              className="flex text[#222222] text-base underline cursor-pointer mt-[2.625rem]"
              onClick={() => {
                setVisibleDeleteModal(true);
              }}
            >
              계정삭제
            </span>
          )}
        </div>
      </div>
    </>
  );
};

const VenderList = ({ data }) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState();
  const [checkedValue, setCheckedValue] = useRecoilState(CheckedValueAtom);
  const [checkedCompanyItem, setCheckedCompanyItem] = useRecoilState(CheckedCompanyItemAtom);
  const [createAccountItem, setCreateAccountItem] = useRecoilState(CreateAccountItemAtom);

  const [filteredArray, setFilteredArray] = useState([]);
  return (
    <>
      <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
        <div className="px-[2.625rem]">
          <div className="mb-[2.625rem]">
            <span className="text-[#222222] text-lg">{"계정 목록"}</span>
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
            onClick={async (e) => {
              e.preventDefault();
              setCreateAccountItem(true);
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
            {data?.map((item, index) => (
              <li
                key={`${item.companyName}${index}`}
                className={`flex flex-col min-h-[3.125rem] border-b ${
                  index === 0 ? "border-t" : null
                } border-[#E0E0E0]`}
                onClick={() => {
                  setCheckedCompanyItem(item);
                  setCreateAccountItem(false);
                }}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                  htmlFor={`check${index}`}
                >
                  <div className="py-[1rem] flex gap-[1.125rem]">
                    <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/mypage/company.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item.companyName}</span>
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
                  <picture className="select-none w-[1rem] h-[0.5rem] top-[0.0625rem] relative flex peer-checked:hidden">
                    <Image src={`/images/main/arrow-down.svg`} fill alt="" />
                  </picture>
                  <picture className="select-none w-[1rem] h-[0.5rem] top-[0.0625rem] relative hidden peer-checked:flex">
                    <Image src={`/images/main/arrow-up.svg`} fill alt="" />
                  </picture>
                </label>
                <div className={`check${index} hidden`}>
                  <ul className="flex flex-col w-full min-h-[3.125rem] bg-white">
                    {["관리자", "엔지니어", "오퍼레이터"].map((element, idx) => {
                      return (
                        <li
                          key={`${element}${idx}`}
                          className="flex flex-col w-full h-[3.125rem] items-center pl-[0.875rem]  cursor-pointer"
                          onClick={() => {}}
                        >
                          <label
                            htmlFor={`admin${idx}`}
                            className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                          >
                            <div className="py-[1rem] flex gap-[1.125rem]">
                              <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                                <Image src={`/images/main/myPage/folder.svg`} fill alt="" />
                              </picture>
                              <span className="text-[#222222] text-base">{element}</span>
                            </div>
                            <input
                              type="checkbox"
                              id={`admin${idx}`}
                              className="peer hidden"
                              onChange={(e) => {
                                const target = document.querySelector(`.${element}${idx}`);
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
                          <span className={`${element}${i} hidden`}>123</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
const PartItem = ({ title, value }) => {
  return (
    <div className={`admin${index} hidden`}>
      <div
        key={`admin${index}`}
        className="relative flex items-center justify-between pr-[1.125rem] w-full cursor-pointer"
      >
        <label htmlFor={`adminPart${index}`} className="flex w-full h-[3.125rem] bg-white">
          <div className="flex flex-col h-[3.125rem] pl-[4.25rem] w-full cursor-pointer">
            <div className="py-[1rem] flex gap-[1.125rem]">
              <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                <Image src={`/images/main/myPage/person.svg`} fill alt="" />
              </picture>
              <span className="text-[#222222] text-base">{"123"}</span>
            </div>
          </div>
        </label>
        <input
          type="checkbox"
          id={`adminPart${index}`}
          className="peer "
          onChange={(e) => {
            const target = e.target.nextSibling;
            if (e.target.checked) {
              setCheckedValue(child?.name);
            }
          }}
        />
        <div className="w-full h-full absolute left-0 top-0 bg-[#182A5B1A] hidden">
          <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
        </div>
      </div>
    </div>
  );
};

const InputTextItem = ({ title, type, id, value, placeholder }) => {
  return (
    <div className="flex flex-col items-start justify-between mt-[2.625rem]">
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex flex-col w-full h-[3.125rem] justify-center relative">
        <input
          type={`${type === "password" ? "password" : "text"}`}
          id={id}
          className="flex w-full h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.125rem] focus:outline-none"
          placeholder={placeholder}
          value={value}
        />
        {id === "userId" ? (
          <span className="text-[#FF0000] text-xs absolute -bottom-[1.25rem] hidden">
            영문자+숫자, 20자 제한, 특수기호 금지
          </span>
        ) : id === "password" ? (
          <span className="text-[#FF0000] text-xs absolute -bottom-[1.25rem] hidden">
            영문자+숫자, 20자 제한
          </span>
        ) : id === "passwordCheck" ? (
          <span className="text-[#FF0000] text-xs absolute -bottom-[1.25rem] hidden">
            비밀번호가 일치하지 않습니다.
          </span>
        ) : null}
      </div>
    </div>
  );
};
const InputAddressItem = ({ title, id, zipCode, address, detailAddress }) => {
  const onClickAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddr = data.address; // 최종 주소 변수
        let extraAddr = ""; // 조합형 주소 변수

        // 기본 주소가 도로명 타입일때 조합한다.
        if (data.addressType === "R") {
          //법정동명이 있을 경우 추가한다.
          if (data.bname !== "") {
            extraAddr += data.bname;
          }
          // 건물명이 있을 경우 추가한다.
          if (data.buildingName !== "") {
            extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          // 기본 주소와 조합형 주소를 동일시한다.
          fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode").value = data.zonecode; //5자리 새우편번호 사용
        document.getElementById("address").value = fullAddr;

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("address2").focus();
      },
    }).open();
  };
  return (
    <div className="flex flex-col mt-[2.625rem]" id={id}>
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex w-full h-[3.125rem] items-center justify-between">
        <input
          type="text"
          id="postcode"
          className="flex w-[8.75rem] h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.25rem] focus:outline-none placeholder:text[#7D7D7D]"
          placeholder={`우편번호 검색`}
          value={zipCode}
          onClick={onClickAddress}
        />
        <button
          className="flex justify-center items-center w-[7.5rem] h-[2.5rem] bg-[#182A5B]"
          onClick={onClickAddress}
        >
          <span className=" text-white text-[1rem]">검색</span>
        </button>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          id="address"
          className="flex w-full h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.25rem] mt-[0.625rem] focus:outline-none placeholder:text[#7D7D7D]"
          placeholder={`주소를 검색해 주세요.`}
          value={address}
          onClick={onClickAddress}
        />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          id="address2"
          className="flex w-full h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.25rem] mt-[0.625rem] focus:outline-none placeholder:text[#7D7D7D]"
          placeholder={`상세주소를 입력해 주세요.`}
          value={detailAddress}
        />
      </div>
    </div>
  );
};
// 0.0625rem convert to rem = 0.0625rem
// 68
