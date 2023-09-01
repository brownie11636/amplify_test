import { getSession, signIn, useSession } from "next-auth/react";
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
import { useRouter } from "next/router";

const Join = ({ sessions }) => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.token?.user?.registered === true) {
      router.push("/myPage/account");
    }
  }, [session]);
  return (
    <>
      {sessions ? null : (
        <main className="flex w-full h-fit justify-center py-[200px] bg-[#F2F2F2]">
          <Head>
            <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
          </Head>
          <div className="flex gap-[3.75rem] w-fit">
            <Part
              defaultName={session?.token?.user?.name}
              defaultEmail={session?.token?.user?.email}
            />
          </div>
        </main>
      )}
    </>
  );
};
export default Join;

const Part = ({ defaultName, defaultEmail }) => {
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
    console.log("session");
    console.log(session);
    if (session?.token?.user) {
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
            <span id="part" className="text-[#222222] text-lg">
              회원 가입
            </span>
          </div>
          {session?.token?.user ? (
            <>
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
                placeholder={"이메일 주소를 끝까지 입력"}
              />
              <input type="hidden" id="from" value={session?.token?.user?.from} />
            </>
          ) : null}
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
              const from = document.getElementById("from")?.value;
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
                from,
              };
              console.log(data);
              const res = await axios.post(baseURL + "/api/mongo/join", data, {
                headers: { Authorization: `${session?.token?.accessToken}` },
              });
              console.log(res);
              if (res.data.result === 1) {
                alert("등록되었습니다.");
                return (window.location.href = "/main/login");
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

export const getInitialProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/main/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { sessions: session },
    };
  }
};
