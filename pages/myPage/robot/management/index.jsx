import { useEffect } from "react";
import MainLayout from "../../../../components/Main/MainLayout";
import CardForm from "../../../../components/Main/MyPage/CardForm";
import {
  CheckedRobotItemAtom,
  CompanyItemAtom,
  SelectedCompanyAtom,
  SelectedFieldAtom,
  SelectedRobotAtom,
  SelectedTaskAtom,
} from "../../../../recoil/AtomStore";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

const New = ({}) => {
  const [companyItem, SetCompanyItem] = useRecoilState(CompanyItemAtom);
  const setCheckedRobotItem = useSetRecoilState(CheckedRobotItemAtom);
  const selectedRobot = useRecoilValue(SelectedRobotAtom);
  const selectedCompany = useRecoilValue(SelectedCompanyAtom);
  const selectedField = useRecoilValue(SelectedFieldAtom);
  const selectedTask = useRecoilValue(SelectedTaskAtom);

  setCheckedRobotItem();
  useEffect(() => {
    getCompany();
  }, []);
  const getCompany = async () => {
    const response = await axios.get("https://localhost:3333/api/mongo/company");
    SetCompanyItem(response.data?.data);
  };
  return (
    <MainLayout>
      <section className="flex flex-col min-w-fit w-full h-full overflow-scroll scrollbar-hide">
        <div className="flex min-h-[10.5rem] w-[calc(100%_+_7.5rem)] bg-[#182A5B]">
          <span className="flex pl-[60px] pt-[60px] text-white text-xl"></span>
        </div>
        <div className="relative w-fit -top-[48px] left-[60px]">
          <CardForm data={companyItem} type={5} />
        </div>
      </section>
    </MainLayout>
  );
};
export default New;
