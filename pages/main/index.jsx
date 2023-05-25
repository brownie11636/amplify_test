import { useRouter } from "next/router";
import MainLayout from "../../components/Main/MainLayout";
import { useEffect } from "react";

const Main = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/main/${1}`);
  }, []);

  return (
    <MainLayout>
      <main>
        <div></div>
      </main>
    </MainLayout>
  );
};

export default Main;
