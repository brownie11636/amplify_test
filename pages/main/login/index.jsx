import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [findPassValue, setFindPassValue] = useState("fieldList");
  const router = useRouter();
  useEffect(() => {
    document.getElementById("idRef").focus();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (idValue === "" || pwValue === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    await signIn("testLogin", {
      id: idValue,
      password: pwValue,
      redirect: false,
    })
      .then((res) => {
        if (res.error) {
          alert("로그인에 실패하였습니다.");
          return;
        } else {
          router.push("/main");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendMail = async () => {};
  return (
    <main className="flex w-full h-full justify-center items-center py-[200px] bg-[#F2F2F2]">
      <div className="flex flex-col items-center relative">
        <span
          className="absolute -top-[100px] cursor-pointer text-lg text-[#182a5b]"
          onClick={async () => {
            await signIn("testLogin", {
              id: "admin",
              password: "123",
              redirect: false,
            })
              .then((res) => {
                if (res.error) {
                  alert("로그인에 실패하였습니다.");
                  return;
                } else {
                  router.push("/main");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Admin Login
        </span>
        <picture
          className="flex relative w-[300px] h-[75px] cursor-pointer"
          onClick={() => {
            router.push("/main");
          }}
        >
          <Image src={`/images/main/logo.svg`} fill alt="" />
        </picture>
        <div className="flex mt-[6.25rem]">
          <label htmlFor="fieldList">
            <input
              type="radio"
              name="fieldRadioList"
              id="fieldList"
              className="peer hidden"
              defaultChecked
              onChange={(e) => {
                if (e.target.checked) {
                  setFindPassValue(e.target.id);
                }
              }}
            />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
              <span className="text-base">{"아이디 찾기"}</span>
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
                  setFindPassValue(e.target.id);
                }
              }}
            />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-b border-b-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-b-[#182A5B] peer-checked:text-[#222222]">
              <span className="text-base">{"비밀번호 찾기"}</span>
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-[30px] mt-[100px]">
          <span className="w-[400px] h-[50px] flex">
            <input
              type="text"
              placeholder="ID"
              ref={idRef}
              id="idRef"
              className="w-full h-full flex text-[#182a5b] bg-white border-b border-solid border-b-[#182A5B] pl-[20px] placeholder-[#7d7d7d]"
              onChange={() => {
                setIdValue(idRef.current.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (pwRef.current.value === "") {
                    alert("비밀번호를 입력해주세요.");
                    pwRef.current.focus();
                    return;
                  }
                  submit(e);
                }
              }}
            />
          </span>
          <span className="w-[400px] h-[50px] flex">
            <input
              type="password"
              placeholder="PW"
              ref={pwRef}
              className="w-full h-full flex text-[#182a5b] bg-white border-b border-solid border-b-[#182A5B] pl-[20px] placeholder-[#7d7d7d]"
              onChange={() => {
                setPwValue(pwRef.current.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (idRef.current.value === "") {
                    alert("아이디를 입력해주세요.");
                    idRef.current.focus();
                    return;
                  }
                  submit(e);
                }
              }}
            />
          </span>
        </div>
        <button
          className="w-[400px] h-[50px] mt-[80px] flex justify-center items-center bg-[#182A5B]"
          onClick={submit}
        >
          <span className="text-white">로그인</span>
        </button>
        <div className="flex justify-between w-full mt-[30px]">
          <div className="cursor-pointer gap-[16px] flex items-center">
            <input
              type="checkbox"
              id="autoLogin"
              className="w-[16px] h-[16px] rounded-none bg-transparent"
            />
            <label htmlFor="autoLogin">
              <span className="text-[#222222]">자동로그인</span>
            </label>
          </div>
          <span className="text-[#222222] underline">아이디/비밀번호 찾기</span>
        </div>
      </div>
    </main>
  );
};

export default Login;

const aaa = {
  senderAddress: "no_reply@company.com",
  title: "${customer_name}님 반갑습니다. ",
  body: "귀하의 등급이 ${BEFORE_GRADE}에서 ${AFTER_GRADE}로 변경되었습니다.",
  recipients: [
    {
      address: "hongildong@naver_.com",
      name: "홍길동",
      type: "R",
      parameters: { customer_name: "홍길동", BEFORE_GRADE: "SILVER", AFTER_GRADE: "GOLD" },
    },
    {
      address: "chulsoo@daum_.net",
      name: null,
      type: "R",
      parameters: { customer_name: "철수", BEFORE_GRADE: "BRONZE", AFTER_GRADE: "SILVER" },
    },
  ],
  individual: true,
  advertising: false,
  useBasicUnsubscribeMsg: true,
};
