import MainLayout from "../../../components/Main/MainLayout";
import { useRouter } from "next/router";
import CardForm from "../../../components/Main/MyPage/CardForm";

const Account = () => {
  const router = useRouter();
  const sub = router.pathname.includes("account")
    ? "계정관리"
    : router.pathname.includes("field")
    ? "현장관리"
    : "로봇관리";

  const Array = {
    type: 1,
    title: "거래처 목록",
    list: [
      {
        sub: "조각모음",
        children: [
          { name: "test1", children: [{ name: "defrag1" }] },
          { name: "test2", children: [{ name: "defrag2" }] },
          { name: "test3", children: [{ name: "defrag3" }] },
        ],
      },
      {
        sub: "엔지니어",
        children: [
          { name: "test4", children: [{ name: "defrag4" }] },
          { name: "test5", children: [{ name: "defrag5" }] },
          { name: "test6", children: [{ name: "defrag6" }] },
        ],
      },
      {
        sub: "오퍼레이터",
        children: [
          { name: "test7", children: [{ name: "defrag7" }] },
          { name: "test8", children: [{ name: "defrag8" }] },
          { name: "test9", children: [{ name: "defrag9" }] },
        ],
      },
    ],
  };
  return (
    <MainLayout>
      <div className="w-full h-full overflow-scroll">
        <div className="flex relative h-[168px] w-screen bg-[#182A5B]">
          <span className="pl-[60px] pt-[60px] text-white text-xl">{sub}</span>
        </div>
        <span className="relative -top-[48px] left-[60px]">
          <CardForm data={Array} type={1} />
        </span>
      </div>
    </MainLayout>
  );
};
export default Account;
