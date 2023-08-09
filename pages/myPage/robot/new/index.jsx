import { useRouter } from "next/router";
import { useEffect } from "react";
import MainLayout from "../../../../components/Main/MainLayout";
import CardForm from "../../../../components/Main/MyPage/CardForm";

const New = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <MainLayout>
      <section className="flex flex-col min-w-fit w-full h-full overflow-scroll scrollbar-hide">
        <div className="flex min-h-[10.5rem] w-[calc(100%_+_7.5rem)] bg-[#182A5B]">
          <span className="flex pl-[60px] pt-[60px] text-white text-xl"></span>
        </div>
        <div className="relative w-fit -top-[48px] left-[60px]">
          <CardForm type={4} />
        </div>
      </section>
    </MainLayout>
  );
};
export default New;
