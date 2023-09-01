import { useState, useEffect } from "react";
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
import { getSession } from "next-auth/react";

const New = ({ sessions }) => {
  const [companyItem, SetCompanyItem] = useRecoilState(CompanyItemAtom);
  const setCheckedRobotItem = useSetRecoilState(CheckedRobotItemAtom);
  const selectedRobot = useRecoilValue(SelectedRobotAtom);
  const selectedCompany = useRecoilValue(SelectedCompanyAtom);
  const selectedField = useRecoilValue(SelectedFieldAtom);
  const selectedTask = useRecoilValue(SelectedTaskAtom);

  setCheckedRobotItem();
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (baseURL) {
      getCompany();
    }
  }, [sessions, baseURL]);
  const getCompany = async () => {
    await axios
      .get(baseURL + "/api/mongo/company", {
        headers: { Authorization: `${sessions?.token?.accessToken}` },
      })
      .then((response) => {
        console.log(response);
        SetCompanyItem(response.data?.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 403) {
          alert(err?.response?.data?.msg);
          return router.push("/main/login");
        }
      });
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

export const getInitialProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/main/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { sessions: session },
    };
  }
};
