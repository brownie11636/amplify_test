import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const router = useRouter();
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
  return (
    <main className="flex w-full h-full justify-center items-center py-[200px] bg-[#F2F2F2]">
      <div className="flex flex-col items-center relative">
        <span
          className="absolute -top-[100px] cursor-pointer text-lg text-[#182a5b]"
          onClick={async () => {
            await signIn("testLogin", {
              id: "test",
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
        <div className="flex flex-col gap-[30px] mt-[100px]">
          <span className="w-[400px] h-[50px] flex">
            <input
              type="text"
              placeholder="ID"
              ref={idRef}
              className="w-full h-full flex text-[#182a5b] bg-white border-b border-solid border-b-[#182A5B] pl-[20px] placeholder-[#7d7d7d]"
              onChange={() => {
                setIdValue(idRef.current.value);
              }}
            />
          </span>
          <span className="w-[400px] h-[50px] flex">
            <input
              type="text"
              placeholder="PW"
              ref={pwRef}
              className="w-full h-full flex text-[#182a5b] bg-white border-b border-solid border-b-[#182A5B] pl-[20px] placeholder-[#7d7d7d]"
              onChange={() => {
                setPwValue(pwRef.current.value);
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
