import { useEffect } from "react";
import MainLayout from "../../../components/Main/MainLayout";
import CardForm from "../../../components/Main/MyPage/CardForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { FieldItemAtom, FieldSelectedRadioAtom } from "../../../recoil/AtomStore";
import axios from "axios";

const MyPage = () => {
  const [fieldItem, SetFieldItem] = useRecoilState(FieldItemAtom);
  const FieldSelectedRadio = useRecoilValue(FieldSelectedRadioAtom);
  useEffect(() => {
    getField();
  }, [FieldSelectedRadio]);
  const getField = async () => {
    const response = await axios.get(
      FieldSelectedRadio === "fieldList"
        ? "https://localhost:3333/api/mongo/field"
        : "https://localhost:3333/api/mongo/robot"
    );
    SetFieldItem(response.data?.data);
  };

  return (
    <MainLayout>
      <section className="flex flex-col min-w-fit w-full h-full overflow-scroll scrollbar-hide">
        <div className="flex min-h-[10.5rem] w-[calc(100%_+_7.5rem)] bg-[#182A5B]">
          <span className="flex pl-[60px] pt-[60px] text-white text-xl"></span>
        </div>
        <div className="relative w-fit -top-[48px] left-[60px]">
          <CardForm data={fieldItem} type={2} />
        </div>
      </section>
    </MainLayout>
  );
};
export default MyPage;
