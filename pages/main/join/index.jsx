import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Image from "next/image";

import {
  ChangePasswordModalAtom,
  CheckedAccountItemAtom,
  CheckedCompanyItemAtom,
  CheckedFieldItemAtom,
  CompanyItemAtom,
  CreateAccountItemAtom,
  CreateFieldItemAtom,
  DeleteApiUriAtom,
  DeleteModalAtom,
  SelectedFieldInAccountAtom,
  SelectedPartItemAtom,
  SelectedTaskInAccountAtom,
} from "../../../recoil/AtomStore";
import Head from "next/head";
import axios from "axios";
import { InputTextItem } from "../../../components/Main/MyPage/card/InputTextItem";
import { InputAddressItem } from "../../../components/Main/MyPage/card/InputAddressItem";

const Join = () => {
  const { data: session } = useSession();
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const CheckedAccountItem = useRecoilValue(CheckedAccountItemAtom);

  const CreateFieldItem = useRecoilValue(CreateFieldItemAtom);
  const CheckedFieldItem = useRecoilValue(CheckedFieldItemAtom);
  const [companyItem, setCompanyItem] = useRecoilState(CompanyItemAtom);
  const [baseURL, setBaseURL] = useState();
  const [partItem, setPartItem] = useState({});
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
    if (baseURL) {
      getCompany();
    }
  }, [session, baseURL]);
  const getCompany = async () => {
    await axios
      .get(`https://localhost:3333/api/mongo/company?affiliation=admin`, {
        headers: { Authorization: `${session?.token?.accessToken}` },
      })
      .then((response) => {
        console.log("response");
        console.log(response);
        setCompanyItem(response.data?.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 403) {
          alert(err?.response?.data?.msg);
          return router.push("/main/login");
        }
      });
  };
  useEffect(() => {
    console.log("CheckedCompanyItem");
    console.log(CheckedCompanyItem);
  }, [CheckedCompanyItem, CreateFieldItem, CheckedFieldItem, CheckedAccountItem, session]);
  return (
    <main className="flex w-full h-fit justify-center py-[200px] bg-[#F2F2F2]">
      <Head>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
      </Head>
      <div className="flex gap-[3.75rem] w-fit">
        <CompanyList data={companyItem} />
        <Company data={CheckedCompanyItem} isCreate={CreateAccountItem} />
        <Part
          data={CheckedAccountItem}
          isCreate={CreateAccountItem}
          defaultName={session?.token?.user?.name}
          defaultEmail={session?.token?.user?.email}
        />
      </div>
    </main>
  );
};
export default Join;

const CompanyList = ({ data }) => {
  const searchRef = useRef(null);
  const { data: session } = useSession();
  const [sessionUser, setSessionUser] = useState(null);
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const createAccountItem = useRecoilValue(CreateAccountItemAtom);
  const checkedAccountItem = useRecoilValue(CheckedAccountItemAtom);

  const setCheckedCompanyItem = useSetRecoilState(CheckedCompanyItemAtom);
  const setCheckedAccountItem = useSetRecoilState(CheckedAccountItemAtom);
  const setCreateAccountItem = useSetRecoilState(CreateAccountItemAtom);
  const setSelectedPartItem = useSetRecoilState(SelectedPartItemAtom);
  useEffect(() => {
    if (session) {
      setSessionUser(session?.token?.user);
    }
  }, [session]);
  useEffect(() => {
    if (checkedAccountItem) {
      const target = document?.querySelector(".userCard")?.querySelectorAll("input");
      const selectField = document.getElementById("selectField");
      const selectTask = document.getElementById("selectTask");
      selectField === null ? null : (selectField.value = checkedAccountItem.field);
      selectTask === null ? null : (selectTask.value = checkedAccountItem.task);

      for (const key in checkedAccountItem) {
        if (Object.hasOwnProperty.call(checkedAccountItem, key)) {
          target?.forEach((element) => {
            if (element.id === "userId") {
              element.value = checkedAccountItem.id;
            } else if (element.id === key) {
              element.value = checkedAccountItem[key];
            }
          });
        }
      }
    }
  }, [checkedAccountItem, CheckedCompanyItem]);
  useEffect(() => {
    if (data) {
      let filtered = data;
      if (value) {
        filtered = filtered.filter((item) => {
          return item.companyName.includes(value);
        });
        console.log(filtered);
        setFilteredArray(filtered);
      } else {
        console.log(data);
        setFilteredArray(data);
      }
    }
  }, [value, data]);
  return (
    <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative">
      <div className="px-[2.625rem]">
        <div className="mb-[2.625rem]">
          <span className="text-[#222222] text-lg">{"그룹"}</span>
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
            setCreateAccountItem(true);
            setCheckedCompanyItem(null);
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
          {filteredArray?.map((item, index) => {
            return (
              <li
                key={`${item.companyName}${index}`}
                className={`flex flex-col min-h-[3.125rem] border-[#E0E0E0] border-b ${
                  index === 0 ? "border-t" : ""
                }`}
                onClick={() => {}}
              >
                <label
                  className="flex items-center justify-between pl-[2.625rem] pr-[1.125rem] w-full cursor-pointer"
                  htmlFor={`list${index}`}
                >
                  <div className="py-[1rem] flex gap-[1.125rem]">
                    <picture className="select-none w-[1.125rem] h-[1.125rem] top-[0.0625rem] relative">
                      <Image src={`/images/main/myPage/company.svg`} fill alt="" />
                    </picture>
                    <span className="text-[#222222] text-base">{item.companyName}</span>
                  </div>
                  <input
                    type="checkbox"
                    name="company"
                    id={`list${index}`}
                    className="peer hidden"
                    onChange={(e) => {
                      document.getElementsByName("company").forEach((element) => {
                        if (!e.target === element) {
                          element.checked = false;
                        }
                      });
                      const target = document?.querySelector(`.part${index}`);
                      if (e.target.checked) {
                        setCreateAccountItem(false);
                        setCheckedCompanyItem(item);
                        setCheckedAccountItem(null);
                        target.classList.remove("hidden");
                      } else {
                        setCheckedAccountItem(null);
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
                <div className={`part${index} hidden`}>
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
                            name={`part`}
                            id={`${element.id}${index}${idx}`}
                            className="peer hidden"
                            onChange={(e) => {
                              if (e.target.checked) {
                              }
                              const target = document?.querySelector(
                                `.${
                                  element.id === "admin"
                                    ? "admin"
                                    : element.id === "engineer"
                                    ? "engineer"
                                    : "operator"
                                }${index}`
                              );
                              document.getElementsByName(`users`).forEach((element) => {
                                if (e.target.checked) {
                                  if (element !== e.target) {
                                    element.checked = false;
                                  }
                                }
                                if (!element.checked) {
                                  element.nextSibling.classList.add("hidden");
                                } else {
                                  element.nextSibling.classList.remove("hidden");
                                }
                              });
                              setSelectedPartItem(element.id);
                              if (e.target.checked) {
                                setCheckedAccountItem(null);
                                target.classList.remove("hidden");
                              } else {
                                setCheckedAccountItem(null);
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
                        <div className={`${element.id}${index} hidden w-full`}>
                          <ul className="flex flex-col w-full bg-white">
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
                                          <span className="text-[#222222] text-base">
                                            {el?.name}
                                          </span>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      type="checkbox"
                                      name={`users`}
                                      id={`adminPart${index}${idx}${i}`}
                                      className="peer hidden"
                                      onChange={(e) => {
                                        document.getElementsByName(`users`).forEach((element) => {
                                          if (e.target.checked) {
                                            setCheckedAccountItem(el);
                                            if (element !== e.target) {
                                              element.checked = false;
                                            }
                                          } else {
                                            setCheckedAccountItem(null);
                                          }
                                          if (!element.checked) {
                                            element.nextSibling.classList.add("hidden");
                                          } else {
                                            element.nextSibling.classList.remove("hidden");
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
                                          <span className="text-[#222222] text-base">
                                            {el?.name}
                                          </span>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      type="checkbox"
                                      name={`users`}
                                      id={`adminPart${index}${idx}${i}`}
                                      className="peer hidden"
                                      onChange={(e) => {
                                        document.getElementsByName(`users`).forEach((element) => {
                                          if (e.target.checked) {
                                            if (element !== e.target) {
                                              element.checked = false;
                                            }
                                          }
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
                                          <span className="text-[#222222] text-base">
                                            {el?.name}
                                          </span>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      type="checkbox"
                                      name={`users`}
                                      id={`adminPart${index}${idx}${i}`}
                                      className="peer hidden"
                                      onChange={(e) => {
                                        document.getElementsByName(`users`).forEach((element) => {
                                          if (e.target.checked) {
                                            if (element !== e.target) {
                                              element.checked = false;
                                            }
                                          }
                                          if (!element.checked) {
                                            element.nextSibling.classList.add("hidden");
                                            setCheckedAccountItem(null);
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
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const Company = ({ data }) => {
  const { data: session } = useSession();
  const [sessionUser, setSessionUser] = useState(null);
  const setVisibleDeleteModal = useSetRecoilState(DeleteModalAtom);
  const setDeleteApiUrl = useSetRecoilState(DeleteApiUriAtom);
  const CreateAccountItem = useRecoilValue(CreateAccountItemAtom);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const CheckedAccountItem = useRecoilValue(CheckedAccountItemAtom);
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (session) {
      setSessionUser(session?.token?.user);
    }
  }, [session]);
  useEffect(() => {
    if (CheckedCompanyItem) {
      for (const key in CheckedCompanyItem) {
        if (Object.hasOwnProperty.call(CheckedCompanyItem, key)) {
          document.getElementById(`${key}`)
            ? (document.getElementById(`${key}`).value = CheckedCompanyItem[key])
            : null;
        }
      }
    } else {
      document
        .querySelector(".companyList")
        ?.querySelectorAll("input")
        .forEach((element) => {
          element.value = "";
        });
    }
  }, [session, CheckedCompanyItem]);

  return (
    <>
      <div className="py-[2.625rem] w-[22.5rem] h-fit bg-white relative ">
        <div className="companyList px-[2.625rem]">
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
              <span id="companyName" className="text-[#222222] text-lg">
                {data?.companyName}
              </span>
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
          <button
            className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
            onClick={async () => {
              const companyName = document.getElementById("companyName").value;
              const userNumber = document.getElementById("userNumber").value;
              const companyNumber = document.getElementById("companyNumber").value;
              const phoneNumber = document.getElementById("phoneNumber").value;
              const companyAddress = document
                .getElementById("companyAddress")
                ?.querySelectorAll("input");
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
              const res = await axios.post(baseURL + "/api/mongo/company", data, {
                headers: { Authorization: `${session?.token?.accessToken}` },
              });
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
        </div>
      </div>
    </>
  );
};

const Part = ({ data, defaultName, defaultEmail }) => {
  const { data: session } = useSession();
  const [sessionUser, setSessionUser] = useState(null);
  const CheckedCompanyItem = useRecoilValue(CheckedCompanyItemAtom);
  const CheckedAccountItem = useRecoilValue(CheckedAccountItemAtom);
  const SelectedPartItem = useRecoilValue(SelectedPartItemAtom);
  const setSelectedPartItem = useSetRecoilState(SelectedPartItemAtom);

  const [selectedFieldInAccount, setSelectedFieldInAccount] = useRecoilState(
    SelectedFieldInAccountAtom
  );
  const [selectedTaskInAccount, setSelectedTaskInAccount] =
    useRecoilState(SelectedTaskInAccountAtom);
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (session) {
      setSessionUser(session?.token?.user);
    }
  }, [session]);
  useEffect(() => {
    console.log("selectedFieldInAccount");
    console.log(selectedFieldInAccount);
    if (!CheckedAccountItem) {
      document
        ?.querySelector(".userCard")
        ?.querySelectorAll("input")
        .forEach((element) => {
          element.value = "";
        });
      document.querySelector(".userCard").value = "";
    }
  }, [CheckedAccountItem, CheckedCompanyItem, selectedFieldInAccount, selectedTaskInAccount]);
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
        <div className="userCard px-[2.625rem]">
          <div className="flex items-center gap-[1.125rem]">
            <picture className="w-[1.375rem] h-[1.375rem] relative">
              <Image src={`/images/main/myPage/folder.svg`} fill alt="" draggable={false} />
            </picture>
            <span id="part" className="text-[#222222] text-lg">
              <select
                name="selectedPart"
                value={SelectedPartItem}
                defaultValue={"admin"}
                id="selectedPart"
                onChange={(e) => {
                  setSelectedPartItem(e.target.value);
                }}
              >
                <option value="admin">관리자</option>
                <option value="engineer">엔지니어</option>
                <option value="operator">오퍼레이터</option>
              </select>
            </span>
          </div>
          <InputTextItem
            title="아이디"
            id={"userId"}
            value={CheckedAccountItem ? data?.id : ""}
            placeholder={"영문자+숫자, 20자제한, 특수기호 금지"}
          />
          <InputTextItem
            title="비밀번호"
            id={"password"}
            type="password"
            value={CheckedAccountItem ? data?.password : ""}
            placeholder={"영문자+숫자, 20자 제한"}
          />
          <InputTextItem
            title="비밀번호 확인"
            id={"passwordCheck"}
            type="password"
            value={""}
            placeholder={"비밀번호를 한번 더 입력"}
          />
          <InputTextItem
            id="name"
            title="이름"
            defaultValue={defaultName}
            value={CheckedAccountItem ? data?.name : defaultName}
            placeholder={"이름 입력"}
          />
          <InputTextItem
            id="phone"
            title="연락처"
            value={CheckedAccountItem ? data?.phone : ""}
            placeholder={"'-'를 포함하여 입력"}
          />
          <InputTextItem
            id="email"
            title="이메일"
            defaultValue={defaultEmail}
            value={CheckedAccountItem ? data?.email : defaultEmail}
            placeholder={"이메일 주소를 끝까지 입력"}
          />
          {/* <div className="flex flex-col gap-[1rem] mt-[2.625rem]">
            <select
              name="selectField"
              id="selectField"
              key={selectedFieldInAccount}
              defaultValue={selectedFieldInAccount ? selectedFieldInAccount[0]?.index : 0}
              value={selectedFieldInAccount}
              onChange={(e) => {
                setSelectedFieldInAccount(e.target.value);
                setSelectedTaskInAccount(
                  CheckedCompanyItem?.fields?.filter((item) => {
                    return item?.index === parseInt(e.target.value) ? item?.processCount : null;
                  })
                );
              }}
            >
              <option value="0">현장 선택</option>
              {CheckedCompanyItem?.fields?.map((item, index) => {
                return (
                  <option value={item?.index} key={`selectField${index}`}>
                    {item?.fieldName}
                  </option>
                );
              })}
            </select>
            {!selectedTaskInAccount ? null : (
              <select name="selectTask" id="selectTask">
                {[
                  ...Array(
                    parseInt(selectedTaskInAccount && selectedTaskInAccount[0]?.processCount) || 10
                  ).keys(),
                ]?.map((item, index) => {
                  return (
                    <option value={item + 1} key={`selectTask${index}`}>
                      {`제 ${item + 1} 공정`}
                    </option>
                  );
                })}
              </select>
            )}
          </div> */}
          <button
            className="flex w-full h-[2.5rem] mt-[4.375rem] gap-[0.875rem] justify-center items-center bg-[#182A5B]"
            onClick={async (e) => {
              const targetArr = e.target.parentNode.parentNode?.querySelectorAll("input");
              for (const item of targetArr) {
                if (item.value === "") {
                  return alert("빈칸을 모두 채워주세요.");
                } else {
                  continue;
                }
              }
              const part = document.getElementById("selectedPart")?.value;
              const id = targetArr[0]?.value;
              const password = targetArr[1]?.value;
              const password2 = targetArr[2]?.value;
              const name = targetArr[3]?.value;
              const phone = targetArr[4]?.value;
              const email = targetArr[5]?.value;
              const field = document.getElementById("selectField")?.value;
              const task = document.getElementById("selectTask")?.value;
              if (password !== password2) {
                targetArr[2].focus();
                return alert("비밀번호가 일치하지 않습니다.");
              }
              const data = {
                companyNumber: CheckedCompanyItem?.companyNumber,
                part,
                id,
                password,
                name,
                phone,
                email,
                field,
                task,
              };
              console.log(data);
              const res = await axios.post(baseURL + "/api/mongo/createPart", data, {
                headers: { Authorization: `${session?.token?.accessToken}` },
              });
              console.log(res);
              if (res.data.result === 1) {
                alert("등록되었습니다.");
                return window.location.reload();
              } else if (res.data.result === 0) {
                return alert(res.data.msg);
              }
            }}
          >
            <picture className="relative w-[0.875rem] h-[0.75rem]">
              <Image src={`/images/main/myPage/check.svg`} fill alt="" />
            </picture>
            <span className="text-base text-white">등록</span>
          </button>
        </div>
      </div>
    </>
  );
};
