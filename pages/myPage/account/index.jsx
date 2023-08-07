import MainLayout from "../../../components/Main/MainLayout";
import { useRouter } from "next/router";
import CardForm from "../../../components/Main/MyPage/CardForm";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { CustomerAtom, DeleteModalAtom } from "../../../recoil/AtomStore";

const Account = () => {
  const router = useRouter();
  const [customerItem, setCustomerItem] = useRecoilState(CustomerAtom);
  const [visibleDeleteModal, setVisibleDeleteModal] = useRecoilState(DeleteModalAtom);
  const sub = router.pathname.includes("account")
    ? "계정관리"
    : router.pathname.includes("field")
    ? "현장관리"
    : "로봇관리";
  useEffect(() => {
    getCustomer();
  }, []);
  const getCustomer = async () => {
    const response = await axios.get("https://localhost:3333/api/mongo/customer");
    setCustomerItem(response.data?.data);
  };
  return (
    <MainLayout>
      <div className="w-full h-full overflow-scroll">
        <div className="flex relative h-[168px] w-screen bg-[#182A5B]">
          <span className="pl-[60px] pt-[60px] text-white text-xl">{sub}</span>
        </div>
        <span className="relative -top-[48px] left-[60px]">
          <CardForm data={customerItem[0]} type={1} />
        </span>
      </div>
      <DeleteModal visible={visibleDeleteModal} setVisible={setVisibleDeleteModal} />
    </MainLayout>
  );
};
export default Account;

const DeleteModal = ({ visible, setVisible, url }) => {
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
            <button className="w-[12.5rem] h-[2.5rem] bg-white">삭제</button>
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
// 40px convert to rem =
