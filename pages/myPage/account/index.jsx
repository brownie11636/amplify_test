import MainLayout from "../../../components/Main/MainLayout";
import { useRouter } from "next/router";
import CardForm from "../../../components/Main/MyPage/CardForm";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChangePasswordModalAtom,
  CheckedAccountItemAtom,
  CompanyItemAtom,
  DeleteApiUriAtom,
  DeleteModalAtom,
} from "../../../recoil/AtomStore";
import { getSession, useSession } from "next-auth/react";

const Account = ({ sessions }) => {
  console.log(sessions);
  const router = useRouter();
  const { data: session } = useSession();
  const [companyItem, setCompanyItem] = useRecoilState(CompanyItemAtom);
  const [visibleDeleteModal, setVisibleDeleteModal] = useRecoilState(DeleteModalAtom);
  const [visibleChangePasswordModal, setVisibleChangePasswordModal] =
    useRecoilState(ChangePasswordModalAtom);
  const deleteApiUrl = useRecoilValue(DeleteApiUriAtom);
  const sub = router.pathname.includes("account")
    ? "계정관리"
    : router.pathname.includes("field")
    ? "현장관리"
    : "로봇관리";
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if ((baseURL, sessions)) {
      getCompany();
    }
  }, [session, baseURL]);
  const getCompany = async () => {
    await axios
      .get(
        `https://localhost:3333/api/mongo/company?affiliation=${session?.token?.user?.affiliation}`,
        { headers: { Authorization: `${sessions?.token?.accessToken}` } }
      )
      .then((response) => {
        console.log("response");
        console.log(response);
        setCompanyItem(response.data?.data);
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
          <span className="flex pl-[60px] pt-[60px] text-white text-xl">{sub}</span>
        </div>
        <div className="relative w-fit -top-[48px] left-[60px]">
          <CardForm data={companyItem} type={1} />
        </div>
      </section>
      <DeleteModal
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
        url={deleteApiUrl}
      />
      <ChangePasswordModal
        visible={visibleChangePasswordModal}
        setVisible={setVisibleChangePasswordModal}
      />
    </MainLayout>
  );
};

export default Account;

const ChangePasswordModal = ({ visible, setVisible }) => {
  const router = useRouter();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const checkedAccountItem = useRecoilValue(CheckedAccountItemAtom);
  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 justify-center`}
    >
      <div
        className="z-20 absolute top-0 left-0 w-full h-full bg-black opacity-70"
        onClick={() => {
          setVisible(false);
        }}
      />
      <div className="flex flex-col z-30 w-[37.5rem] h-[18.75rem] relative top-[8.125rem]">
        <div className="flex w-full h-[0.625rem] bg-[#182A5B]" />
        <div className="flex flex-col item-center w-full h-[18.125rem] bg-[#F2F2F2] px-[5rem] py-[4.375rem]">
          <div className="flex flex-col justify-center items-center gap-[1rem]">
            <div className="flex w-[18rem] justify-between">
              <span>비밀번호</span>
              <input type="password" ref={passwordRef} />
            </div>
            <div className="flex w-[18rem] justify-between">
              <span>비밀번호 확인</span>
              <input type="password" ref={passwordConfirmRef} />
            </div>
          </div>
          <div className="flex mt-[4.375rem] justify-between">
            <button
              className="w-[12.5rem] h-[2.5rem] bg-white"
              onClick={async () => {
                if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                  alert("비밀번호가 일치하지 않습니다.");
                  return;
                }

                const response = await axios.put("https://localhost:3333/api/mongo/password", {
                  id: checkedAccountItem?.id,
                  password: passwordRef.current.value,
                });
                console.log(response);
                setVisible(false);
                if (response.data.result === 1) {
                  alert("수정되었습니다.");
                  router.reload();
                } else {
                  alert("수정에 실패하였습니다.");
                }
              }}
            >
              확인
            </button>
            <button
              className="w-[12.5rem] h-[2.5rem] bg-[#182A5B] text-white"
              onClick={() => {
                setVisible(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const DeleteModal = ({ visible, setVisible, url }) => {
  const router = useRouter();
  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 justify-center`}
    >
      <div
        className="z-20 absolute top-0 left-0 w-full h-full bg-black opacity-70"
        onClick={() => {
          setVisible(false);
        }}
      />
      <div className="flex flex-col z-30 w-[37.5rem] h-[18.75rem] relative top-[8.125rem]">
        <div className="flex w-full h-[0.625rem] bg-[#182A5B]" />
        <div className="flex flex-col item-center w-full h-[18.125rem] bg-[#F2F2F2] px-[5rem] py-[4.375rem]">
          <span className="text-[#222222] text-lg text-center whitespace-pre-wrap">
            정말 계정을 삭제하시겠습니까? <br />
            계정을 삭제하시면
            <span className="text-[#FF0000]">복구 불가능</span>합니다.
          </span>
          <div className="flex mt-[4.375rem] justify-between">
            <button
              className="w-[12.5rem] h-[2.5rem] bg-white"
              onClick={async () => {
                const response = await axios.delete(url);
                console.log(response);
                setVisible(false);
                if (response.data.result === 1) {
                  alert("삭제되었습니다.");
                  router.reload();
                } else {
                  alert("삭제에 실패하였습니다.");
                }
              }}
            >
              삭제
            </button>
            <button
              className="w-[12.5rem] h-[2.5rem] bg-[#182A5B] text-white"
              onClick={() => {
                setVisible(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
