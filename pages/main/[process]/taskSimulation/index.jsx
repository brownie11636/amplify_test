import { useRouter } from "next/router";
import MainLayout from "../../../../components/Main/MainLayout";

const Test = () => {
  const router = useRouter();
  console.log(router);
  console.log(router.query);
  return (
    <MainLayout>
      <div className="py-[48px]">
        Test3
        <span></span>
      </div>
    </MainLayout>
  );
};
export default Test;
