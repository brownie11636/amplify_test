import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../components/Main/MainLayout";
import { CompanyItemAtom, RobotItemListAtom } from "../../../recoil/AtomStore";
import { useRecoilState } from "recoil";
import CardForm from "../../../components/Main/MyPage/CardForm";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

const RobotList = ({ sessions }) => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(
    session?.token?.user?.affiliation === "admin" ? "admin" : session?.token?.user?.affiliation
  );
  const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);
  const [companyItem, setCompanyItem] = useRecoilState(CompanyItemAtom);
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
      getRobot();
    }
  }, [session, baseURL]);
  const getRobot = async () => {
    await axios
      .post(
        `${baseURL}/api/mongo/robotList`,
        {
          companyNumber:
            session?.token?.user?.affiliation === "admin"
              ? "admin"
              : session?.token?.user?.affiliation,
        },
        {
          headers: { Authorization: `${sessions?.token?.accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
        SetRobotItemList(response.data?.data);
        setCompanyItem(response.data?.company);
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
          <CardForm data={robotItemList?.robots} company={companyItem} type={3} />
        </div>
      </section>
    </MainLayout>
  );
};
export default RobotList;

export const getServerSideProps = async (context) => {
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
