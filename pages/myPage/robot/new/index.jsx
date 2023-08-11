import { useRouter } from "next/router";
import { useEffect } from "react";
import MainLayout from "../../../../components/Main/MainLayout";
import CardForm from "../../../../components/Main/MyPage/CardForm";
import { useSession } from "next-auth/react";
import { CheckedRobotItemAtom, RobotItemListAtom } from "../../../../recoil/AtomStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

const New = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(
    session?.token?.user?.affiliation === "admin" ? "123" : session?.token?.user?.affiliation
  );
  const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);
  const setCheckedRobotItem = useSetRecoilState(CheckedRobotItemAtom);
  setCheckedRobotItem();
  useEffect(() => {
    getRobot();
  }, [session]);
  const getRobot = async () => {
    const response = await axios.post("https://localhost:3333/api/mongo/robotList", {
      companyNumber:
        session?.token?.user?.affiliation === "admin" ? "123" : session?.token?.user?.affiliation,
    });
    SetRobotItemList(response.data?.data);
  };
  return (
    <MainLayout>
      <section className="flex flex-col min-w-fit w-full h-full overflow-scroll scrollbar-hide">
        <div className="flex min-h-[10.5rem] w-[calc(100%_+_7.5rem)] bg-[#182A5B]">
          <span className="flex pl-[60px] pt-[60px] text-white text-xl"></span>
        </div>
        <div className="relative w-fit -top-[48px] left-[60px]">
          <CardForm data={robotItemList} type={4} />
        </div>
      </section>
    </MainLayout>
  );
};
export default New;
