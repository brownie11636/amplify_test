import Image from "next/image";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CompanyItemAtom } from "../../recoil/AtomStore";
import { useSetRecoilState } from "recoil";

const SideNavigator = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [allGroupIsChecked, setAllGroupIsChecked] = useState([]);
  const router = useRouter();
  const pathName = router.pathname;
  const { data: session } = useSession();

  // fetch data from server
  const navList = [
    { text: "CB1-반도체A", checked: false },
    { text: "CB1-반도체B", checked: false },
    { text: "CB1-반도체C", checked: false },
  ];

  // set initial state
  useEffect(() => {
    const newArr = [];
    for (const item of navList) {
      const newObj = {};
      newObj["text"] = item.text;
      newObj["checked"] = false;
      newArr.push(newObj);
    }
    setAllGroupIsChecked(newArr);
  }, []);
  useEffect(() => {
    if (session) {
      console.log("(sideNavigator>session?:", session);
    }
  }, [session]);
  return (
    <div className="flex flex-col justify-between items-center w-[300px] py-[48px] h-screen border-r border-[#D9D9D9] relative">
      <div className="w-full h-full">
        <div className="flex flex-col border-b w-full max-h-[140px] px-[40px] pb-[20px] text-[#222222]">
          <span
            className="font-['NotoSans'] font-medium text-2xl text-[#222222] w-fit select-none cursor-pointer"
            onClick={() => router.push("/main")}
          >
            {session?.token?.user.name}님,
            <br /> 안녕하세요.
          </span>
          <div className="mt-[40px] flex items-center">
            <span
              href="/myPage"
              className={`text-lg select-none cursor-pointer ${
                router.asPath.includes("myPage") ? "text-[#182a5b]" : "text-[#222222]"
              }`}
              onClick={() => router.push("/myPage")}
            >
              My page
            </span>
            <div className="mx-[40px] border-l w-[1px] h-[12px]" />
            <button
              onClick={() => {
                signOut({ callbackUrl: "/main/login" });
              }}
            >
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
        {pathName.includes("myPage") ? (
          <MyPageSideNavigator />
        ) : (
          <div className="w-full mt-[56px] text-[#7d7d7d]">
            <ul className="w-full">
              <li className="relative flex w-full cursor-pointer z-10 pl-[30px] pr-[24px] ">
                <input
                  type="checkbox"
                  id="all"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIsAllSelected(true);
                    } else {
                      setIsAllSelected(false);
                    }
                  }}
                />
                <label
                  htmlFor="all"
                  className="flex gap-[25px] items-center w-full h-fit cursor-pointer"
                >
                  <picture className="h-[18px] w-[18px] relative">
                    <Image fill src="/images/main/icon.svg" alt="" />
                  </picture>
                  <span className="text-[#222222]">전체</span>
                  <picture className="absolute right-[24px] h-[8px] w-[16px] justify-self-end">
                    {isAllSelected ? (
                      <Image fill src="/images/main/arrow-up.svg" alt="" />
                    ) : (
                      <Image fill src="/images/main/arrow-down.svg" alt="" />
                    )}
                  </picture>
                </label>
              </li>
              <ul
                className={`flex flex-col pt-[30px] overflow-hidden ${
                  isAllSelected ? "h-fit" : "h-0"
                } w-full`}
              >
                <label htmlFor="selectAll" className="select-none cursor-pointer">
                  <li
                    className={`flex h-[50px] w-full items-center gap-[20px] group cursor-pointer ${
                      allGroupIsChecked ? "bg-[#F2F2F2]" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`selectAll`}
                      className="hidden peer"
                      // onChange={(e) => {}}
                    />
                    <div
                      className={`h-full w-[8px] border-0 bg-[#182a5b] invisible group-hover:visible`}
                    />
                    <figure className="h-[18px] w-[18px] border border-[#7d7d7d] flex justify-center items-center relative">
                      <Image src={"/images/main/check.svg"} fill alt="" />
                    </figure>
                    <span>전체 보기</span>
                  </li>
                </label>
                {navList.map((item, index) => {
                  // console.log(allGroupIsChecked[index]);
                  return (
                    <label
                      key={index}
                      htmlFor={`${item.text}${index}`}
                      className="select-none cursor-pointer"
                    >
                      <li
                        className={`flex h-[50px] w-full items-center gap-[20px] group ${
                          allGroupIsChecked[index]?.checked
                            ? "bg-[#ffffff] bg-opacity-70"
                            : "bg-transparent"
                        }`}
                      >
                        <div
                          className={`h-full w-[8px] border-0 bg-[#182a5b] ${
                            allGroupIsChecked[index]?.checked ? "visible" : "invisible"
                          }`}
                        />
                        <input
                          type="checkbox"
                          id={`${item.text}${index}`}
                          className="peer"
                          onChange={(e) => {
                            setAllGroupIsChecked((prev) => {
                              const newArr = [...prev];
                              newArr[index].checked = e.target.checked;
                              return newArr;
                            });
                          }}
                        />
                        <span
                          className={`${
                            allGroupIsChecked[index]?.checked ? "text-[#222222]" : null
                          }`}
                        >
                          {item.text}
                        </span>
                      </li>
                    </label>
                  );
                })}
              </ul>
            </ul>
          </div>
        )}
      </div>
      <picture
        className="flex w-[10rem] h-[2.5rem] relative cursor-pointer"
        onClick={() => {
          router.push("/main");
        }}
      >
        <Image src={"/images/main/portal-logo.svg"} fill draggable={false} alt="" />
      </picture>
    </div>
  );
};
export default SideNavigator;

const MyPageSideNavigator = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = router.pathname;
  const setCompanyItem = useSetRecoilState(CompanyItemAtom);
  return (
    <ul className="w-full h-full">
      <div className=" px-[1.5625rem] py-[2.5rem]">
        <button
          className="flex justify-center items-center w-[15.625rem] h-[2.75rem] bg-[#182A5B]"
          onClick={() => {
            router.push("/main");
          }}
        >
          <span className="text-base text-white">로봇조작</span>
        </button>
      </div>
      <li
        className={`flex gap-[1.25rem] items-center w-[18.75rem] h-[3.125rem] pl-[1.5rem] cursor-pointer relative group`}
        onClick={() => {
          setCompanyItem([]);
          router.push("/myPage/account");
        }}
      >
        <picture className="flex relative w-[1.75rem] h-[1.75rem] z-10">
          <Image src={"/images/main/myPage/account.svg"} fill alt="" draggable={false} />
        </picture>
        <div
          className={`w-[calc(100%_-_0.0625rem)] h-full absolute z-0 left-0 top-0 bg-[#ffffff] ${
            pathName.includes("/myPage/account") ? "block" : "hidden"
          }`}
        >
          <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
        </div>
        <span className="text-base text-[#222222] z-10">계정관리</span>
      </li>
      <li
        className={`flex gap-[1.25rem] items-center w-[18.75rem] h-[3.125rem] pl-[1.5rem] cursor-pointer relative group`}
        onClick={() => {
          router.push("/myPage/field");
        }}
      >
        <picture className="flex relative w-[1.75rem] h-[1.75rem] z-10">
          <Image src={"/images/main/myPage/field.svg"} fill alt="" draggable={false} />
        </picture>
        <div
          className={`w-[calc(100%_-_0.0625rem)] h-full absolute z-0 left-0 top-0 bg-[#ffffff] ${
            pathName.includes("/myPage/field") ? "block" : "hidden"
          }`}
        >
          <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
        </div>
        <span className="text-base text-[#222222] z-10">현장관리</span>
      </li>

      <label
        className="flex items-center justify-between pl-[1.5rem] pr-[1.125rem] w-full cursor-pointer"
        htmlFor={`robotListNav`}
      >
        <li className="flex gap-[1.25rem] items-center w-[18.75rem] h-[3.125rem] relative group">
          <div className="hidden absolute left-0 h-full w-[0.5rem] bg-[#182A5B]" />
          <picture className="flex relative w-[1.75rem] h-[1.75rem]">
            <Image src={"/images/main/myPage/robot.svg"} fill alt="" draggable={false} />
          </picture>
          <span className="text-base text-[#222222]">로봇관리</span>
        </li>

        <input
          type="checkbox"
          id={`robotListNav`}
          className="peer hidden"
          onChange={(e) => {
            const target = document.querySelector(`.robotListNav`);
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
      <div
        className={`${
          pathName.includes("/myPage/robot") ? "block" : "hidden"
        } robotListNav pl-[4rem]`}
      >
        <div
          className={`text-base text-[#222222] flex items-center w-[18.75rem] h-[3.125rem] cursor-pointer relative`}
          onClick={() => {
            router.push("/myPage/robot");
          }}
        >
          <div
            className={`w-[calc(100%_-_0.0625rem)] h-full absolute z-0 -left-[4rem] top-0 bg-[#ffffff] ${
              pathName.includes("/robot") &&
              !pathName.includes("new") &&
              !pathName.includes("management")
                ? "block"
                : "hidden"
            }`}
          >
            <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
          </div>
          <span className="z-10">보유 로봇 리스트</span>
        </div>
        {session?.token?.user?.part === "admin" || session?.token?.user?.affiliation === "admin" ? (
          <div
            className={`text-base text-[#222222] flex items-center w-[18.75rem] h-[3.125rem] cursor-pointer relative`}
            onClick={() => {
              router.push("/myPage/robot/new");
            }}
          >
            <div
              className={`w-[calc(100%_-_0.0625rem)] h-full absolute z-0 -left-[4rem] top-0 bg-[#ffffff] ${
                pathName.includes("/robot/new") ? "block" : "hidden"
              }`}
            >
              <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
            </div>
            <span className="z-10">로봇 신규등록</span>
          </div>
        ) : null}
        {/* <div
          className={`text-base text-[#222222] flex items-center w-[18.75rem] h-[3.125rem] cursor-pointer relative`}
          onClick={() => {
            router.push("/myPage/robot/management");
          }}
        >
          <div
            className={`w-[calc(100%_-_0.0625rem)] h-full absolute z-0 -left-[4rem] top-0 bg-[#ffffff] ${
              pathName.includes("/robot/management") ? "block" : "hidden"
            }`}
          >
            <div className="flex h-full w-[0.5rem] bg-[#182A5B]" />
          </div>
          <span className="z-10">로봇 배치관리</span>
        </div> */}
      </div>
    </ul>
  );
};
// 1px convert to rem = 0.0625rem
