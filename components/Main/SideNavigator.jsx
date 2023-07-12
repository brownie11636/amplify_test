import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SideNavigator = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [allGroupIsChecked, setAllGroupIsChecked] = useState([]);
  const router = useRouter();
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

  return (
    <div className="flex flex-col w-[300px] py-[48px] h-screen border-r border-[#D9D9D9] relative">
      <div className="flex flex-col border-b w-full max-h-[140px] px-[40px] pb-[20px] text-[#222222]">
        <span
          className="font-['NotoSans'] font-medium text-2xl text-[#222222] w-fit select-none cursor-pointer"
          onClick={() => router.push("/main")}
        >
          조각모음
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
          <span className="text-lg">Logout</span>
        </div>
      </div>
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
              console.log(allGroupIsChecked[index]);
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
                      className={`${allGroupIsChecked[index]?.checked ? "text-[#222222]" : null}`}
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
      <picture className="w-[160px] h-[40px] absolute bottom-0 self-center">
        <Image src={"/images/main/portal-logo.svg"} fill draggable={false} alt="" />
      </picture>
    </div>
  );
};
export default SideNavigator;
