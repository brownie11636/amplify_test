"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedAccountItemAtom,
  CheckedCompanyItemAtom,
  CheckedEngineerAndOperatorItemAtom,
  CheckedFieldItemAtom,
  CreateAccountItemAtom,
  CreateFieldItemAtom,
  DeleteModalAtom,
  FieldSelectedRadioAtom,
  SelectedCompanyAtom,
  SelectedFieldAtom,
  SelectedRobotAtom,
  SelectedTaskAtom,
} from "../../../recoil/AtomStore";
import Head from "next/head";
import axios from "axios";
import { FieldList } from "./card/FieldList";
import { EngineerAndOperator } from "./card/EngineerAndOperator";
import { InputAddressItem } from "./card/InputAddressItem";
import { FieldCard } from "./card/FieldCard";
import { InputTextItem } from "./card/InputTextItem";
import { EngineerAndOperatorCard } from "./card/EngineerAndOperatorCard";
import { RobotList } from "./card/RobotList";
import { RobotCard } from "./card/RobotCard";
import { RobotCard2 } from "./card/RobotCard2";
import { Camera } from "./card/Camera";
import { useSession } from "next-auth/react";
import { SelectRobot } from "./managementList/SelectRobot";
import { SelectCompany } from "./managementList/SelectCompany";
import { PopRobot } from "./managementList/PopRobot";
import { SelectField } from "./managementList/SelectField";

const CardForm = ({ data, type }) => {
  const { data: session } = useSession();
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const CheckedAccountItem = useRecoilValue(CheckedAccountItemAtom);

  const CreateFieldItem = useRecoilValue(CreateFieldItemAtom);
  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  const FieldSelectedRadio = useRecoilValue(FieldSelectedRadioAtom);

  const selectedRobot = useRecoilValue(SelectedRobotAtom);
  const selectedCompany = useRecoilValue(SelectedCompanyAtom);
  const selectedField = useRecoilValue(SelectedFieldAtom);
  const selectedTask = useRecoilValue(SelectedTaskAtom);

  const checkedEngineerAndOperator = useSetRecoilState(CheckedEngineerAndOperatorItemAtom);

  useEffect(() => {}, [
    CheckedCompanyItem,
    CreateFieldItem,
    CheckedFieldItem,
    CheckedAccountItem,
    session,
  ]);
  return (
    <>
      <Head>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
      </Head>
      {type === 1 ? (
        <div className="flex gap-[3.75rem] min-w-[calc(100%_-_3.75rem)] w-fit">
          <CompanyList data={data}></CompanyList>
          {CreateAccountItem ? <Company isCreate={CreateAccountItem} /> : null}
          {CreateAccountItem ? null : CheckedCompanyItem ? (
            <Company data={CheckedCompanyItem} isCreate={CreateAccountItem} />
          ) : null}
          {CreateAccountItem ? null : CheckedCompanyItem && !CheckedAccountItem ? (
            <Part isCreate={CreateAccountItem} />
          ) : CheckedAccountItem ? (
            <Part data={CheckedAccountItem} isCreate={CreateAccountItem} />
          ) : null}
        </div>
      ) : type === 2 ? (
        <div className="flex gap-[3.75rem] min-w-[calc(100%_-_3.75rem)] w-fit">
          <FieldList data={data} />
          {FieldSelectedRadio === "fieldList" ? <FieldCard /> : <RobotCard />}

          <EngineerAndOperator />
          <EngineerAndOperatorCard data={checkedEngineerAndOperator} />
        </div>
      ) : type === 3 ? (
        <div className="flex gap-[3.75rem] min-w-[calc(100%_-_3.75rem)] w-fit">
          <RobotList data={data} type={type}></RobotList>
          <RobotCard2 type={type} />
        </div>
      ) : type === 4 ? (
        <div className="flex gap-[3.75rem] min-w-[calc(100%_-_3.75rem)] w-fit">
          <RobotCard2 data={data} />
          <Camera />
        </div>
      ) : type === 5 ? (
        <div className="flex gap-[3.75rem] min-w-[calc(100%_-_3.75rem)] w-fit">
          <SelectRobot />
          {selectedRobot ? <SelectCompany /> : null}
          {selectedCompany ? <SelectField /> : null}
          <PopRobot />
        </div>
      ) : null}
    </>
  );
};
export default CardForm;

const Company = ({ data }) => {
  const { data: session } = useSession();
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  useEffect(() => {
    console.log(session);
  }, [session]);
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
                const res = await axios.post("https://localhost:3333/api/mongo/company", data);
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
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const CheckedAccountItem = useRecoilValue(CheckedAccountItemAtom);
  useEffect(() => {
    const password = document.getElementById("password");
    const passwordCheck = document.getElementById("passwordCheck");
    passwordCheck?.addEventListener("blur", () => {
      if (password.value !== passwordCheck.value) {
        passwordCheck.nextSibling.classList.remove("hidden");
      }
    });
    passwordCheck?.addEventListener("keyup", () => {
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
              <select name="selectedPart" id="selectedPart">
                <option value="admin">관리자</option>
                <option value="engineer">엔지니어</option>
                <option value="operator">오퍼레이터</option>
              </select>
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
          {CheckedAccountItem ? null : (
            <InputTextItem
              title="비밀번호 확인"
              id={"passwordCheck"}
              type="password"
              value={""}
              placeholder={"비밀번호를 한번 더 입력"}
            />
          )}
          <InputTextItem title="이름" value={data?.name} placeholder={"이름 입력"} />
          <InputTextItem title="연락처" value={data?.phone} placeholder={"'-'를 포함하여 입력"} />
          <InputTextItem
            title="이메일"
            value={data?.email}
            placeholder={"이메일 주소를 끝까지 입력"}
          />
          {!CheckedAccountItem ? (
            <button
              className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
              onClick={async (e) => {
                const targetArr = e.target.parentNode.parentNode.querySelectorAll("input");
                for (const item of targetArr) {
                  if (item.value === "") {
                    return alert("빈칸을 모두 채워주세요.");
                  } else {
                    continue;
                  }
                }
                const part = document.getElementById("selectedPart").value;
                const id = targetArr[0].value;
                const password = targetArr[1].value;
                const name = targetArr[3].value;
                const phone = targetArr[4].value;
                const email = targetArr[5].value;
                const data = {
                  companyNumber: CheckedCompanyItem?.companyNumber,
                  part,
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
                  return alert(res.data.msg);
                }
              }}
            >
              <picture className="relative w-[0.875rem] h-[0.75rem]">
                <Image src={`/images/main/myPage/check.svg`} fill alt="" />
              </picture>
              <span className="text-base text-white">등록</span>
            </button>
          ) : (
            <div className="flex w-[17.5rem] h-[2.5rem] mt-[4.375rem] ">
              <button className="select-none w-[8.75rem] h-[2.5rem]  border border-[#182A5B] border-solid flex justify-center items-center">
                <span>비밀번호 초기화</span>
              </button>
              <button className="w-[8.75rem] h-[2.5rem]  border bg-[#182A5B] border-[#182A5B] border-solid flex justify-center items-center">
                <picture className="relative w-[0.875rem] h-[0.75rem]">
                  <Image src={`/images/main/myPage/edit.svg`} fill alt="" />
                </picture>
                <span className="text-white">수정</span>
              </button>
            </div>
          )}
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

const CompanyList = ({ data }) => {
  const searchRef = useRef(null);

  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([...data]);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);

  const setCheckedCompanyItem = useSetRecoilState(CheckedCompanyItemAtom);
  const setCheckedAccountItem = useSetRecoilState(CheckedAccountItemAtom);
  const setCreateAccountItem = useSetRecoilState(CreateAccountItemAtom);

  useEffect(() => {
    if (value) {
      const filtered = data.filter((item) => {
        return item.companyName.includes(value);
      });
      setFilteredArray(filtered);
    } else {
      setFilteredArray(data);
    }
  }, [value, data]);
  return (
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
            setCheckedAccountItem(null);
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
          {filteredArray?.map((item, index) => (
            <li
              key={`${item.companyName}${index}`}
              className={`flex flex-col min-h-[3.125rem] border-[#E0E0E0] border-b ${
                index === 0 ? "border-t" : ""
              }`}
              onClick={() => {
                setCheckedCompanyItem(item);
                setCreateAccountItem(false);
                setCheckedAccountItem(null);
              }}
            >
              <label
                className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                htmlFor={`list${index}`}
              >
                <div className="py-[1rem] flex gap-[1.125rem]">
                  <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                    <Image src={`/images/main/mypage/company.svg`} fill alt="" />
                  </picture>
                  <span className="text-[#222222] text-base">{item.companyName}</span>
                </div>
                <input
                  type="checkbox"
                  id={`list${index}`}
                  className="peer hidden"
                  onChange={(e) => {
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
                  {[
                    { id: "admin", sub: "관리자" },
                    { id: "engineer", sub: "엔지니어" },
                    { id: "operator", sub: "오퍼레이터" },
                  ].map((element, idx) => (
                    <li
                      key={`${element.id}${index}${idx}`}
                      className="flex flex-col min-h-[3.125rem] items-center pl-[0.875rem] cursor-pointer"
                    >
                      <label
                        htmlFor={`${element.id}${index}${idx}`}
                        className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                      >
                        <div className="py-[1rem] flex gap-[1.125rem]">
                          <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                            <Image src={`/images/main/myPage/folder.svg`} fill alt="" />
                          </picture>
                          <span className="text-[#222222] text-base">{element.sub}</span>
                        </div>
                        <input
                          type="checkbox"
                          id={`${element.id}${index}${idx}`}
                          className="peer hidden"
                          onChange={(e) => {
                            const target = document.querySelector(
                              `.${
                                element.id === "admin"
                                  ? "admin"
                                  : element.id === "engineer"
                                  ? "engineer"
                                  : "operator"
                              }${index}${idx}`
                            );
                            if (item?.admins?.length === 0) {
                              return;
                            } else {
                              if (e.target.checked) {
                                target.classList.remove("hidden");
                              } else {
                                target.classList.add("hidden");
                              }
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
                      <div className={`${element.id}${index}${idx} hidden w-full`}>
                        <ul className="flex flex-col w-full min-h-[3.125rem] bg-white">
                          {element.id === "admin" &&
                            item?.admins?.map((el, i) => {
                              return (
                                <li
                                  key={`adminPart${index}${idx}${i}`}
                                  className="flex flex-col w-full min-h-[3.125rem] items-center pl-[0.875rem] cursor-pointer relative"
                                >
                                  <label
                                    htmlFor={`adminPart${index}${idx}${i}`}
                                    className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer z-10"
                                  >
                                    <div className="flex flex-col h-[3.125rem] w-full cursor-pointer">
                                      <div className="py-[1rem] flex gap-[1.125rem]">
                                        <picture className="w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                                          <Image
                                            src={`/images/main/myPage/person.svg`}
                                            fill
                                            alt=""
                                          />
                                        </picture>
                                        <span className="text-[#222222] text-base">{el?.name}</span>
                                      </div>
                                    </div>
                                  </label>
                                  <input
                                    type="radio"
                                    name={`adminPart${index}`}
                                    id={`adminPart${index}${idx}${i}`}
                                    className="peer hidden"
                                    onChange={() => {
                                      document
                                        .getElementsByName(`adminPart${index}`)
                                        .forEach((element) => {
                                          if (!element.checked) {
                                            element.nextSibling.classList.add("hidden");
                                          } else {
                                            element.nextSibling.classList.remove("hidden");
                                            setCheckedAccountItem(el);
                                          }
                                        });
                                    }}
                                  />
                                  <div className="w-[calc(100%_+_0.875rem)] h-full absolute z-0 -left-[0.875rem] top-0 bg-[#182A5B1A] hidden peer-checked:block">
                                    <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
                                  </div>
                                </li>
                              );
                            })}
                          {element.id === "engineer" &&
                            item?.engineers?.map((el, i) => {
                              return (
                                <li
                                  key={`adminPart${index}${idx}${i}`}
                                  className="flex flex-col w-full min-h-[3.125rem] items-center pl-[0.875rem] cursor-pointer relative"
                                  onClick={() => {}}
                                >
                                  <label
                                    htmlFor={`adminPart${index}${idx}${i}`}
                                    className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer z-10"
                                  >
                                    <div className="flex flex-col h-[3.125rem] w-full cursor-pointer">
                                      <div className="py-[1rem] flex gap-[1.125rem]">
                                        <picture className="w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                                          <Image
                                            src={`/images/main/myPage/person.svg`}
                                            fill
                                            alt=""
                                          />
                                        </picture>
                                        <span className="text-[#222222] text-base">{el?.name}</span>
                                      </div>
                                    </div>
                                  </label>
                                  <input
                                    type="radio"
                                    name={`adminPart${index}`}
                                    id={`adminPart${index}${idx}${i}`}
                                    className="peer hidden"
                                    onChange={() => {
                                      document
                                        .getElementsByName(`adminPart${index}`)
                                        .forEach((element) => {
                                          if (!element.checked) {
                                            element.nextSibling.classList.add("hidden");
                                          } else {
                                            element.nextSibling.classList.remove("hidden");
                                            setCheckedAccountItem(el);
                                          }
                                        });
                                    }}
                                  />
                                  <div className="w-[calc(100%_+_0.875rem)] h-full absolute z-0 -left-[0.875rem] top-0 bg-[#182A5B1A] hidden">
                                    <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
                                  </div>
                                </li>
                              );
                            })}
                          {element.id === "operator" &&
                            item?.operators?.map((el, i) => {
                              return (
                                <li
                                  key={`adminPart${index}${idx}${i}`}
                                  className="flex flex-col w-full min-h-[3.125rem] items-center pl-[0.875rem] cursor-pointer relative"
                                  onClick={() => {}}
                                >
                                  <label
                                    htmlFor={`adminPart${index}${idx}${i}`}
                                    className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer z-10"
                                  >
                                    <div className="flex flex-col h-[3.125rem] w-full cursor-pointer">
                                      <div className="py-[1rem] flex gap-[1.125rem]">
                                        <picture className="w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                                          <Image
                                            src={`/images/main/myPage/person.svg`}
                                            fill
                                            alt=""
                                          />
                                        </picture>
                                        <span className="text-[#222222] text-base">{el?.name}</span>
                                      </div>
                                    </div>
                                  </label>
                                  <input
                                    type="radio"
                                    name={`adminPart${index}`}
                                    id={`adminPart${index}${idx}${i}`}
                                    className="peer hidden"
                                    onChange={() => {
                                      document
                                        .getElementsByName(`adminPart${index}`)
                                        .forEach((element) => {
                                          if (!element.checked) {
                                            element.nextSibling.classList.add("hidden");
                                          } else {
                                            element.nextSibling.classList.remove("hidden");
                                            setCheckedAccountItem(el);
                                          }
                                        });
                                    }}
                                  />
                                  <div className="w-[calc(100%_+_0.875rem)] h-full absolute z-0 -left-[0.875rem] top-0 bg-[#182A5B1A] hidden peer-checked:block">
                                    <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 0.0625rem convert to rem = 0.0625rem
// 68
