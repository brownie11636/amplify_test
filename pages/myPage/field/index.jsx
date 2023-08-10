import { useEffect } from "react";
import MainLayout from "../../../components/Main/MainLayout";
import CardForm from "../../../components/Main/MyPage/CardForm";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckedFieldItemAtom,
  CreateFieldItemAtom,
  DeleteFieldDataAtom,
  DeleteFieldModalAtom,
  FieldItemAtom,
  FieldSelectedRadioAtom,
} from "../../../recoil/AtomStore";
import axios from "axios";

const MyPage = () => {
  const [fieldItem, SetFieldItem] = useRecoilState(FieldItemAtom);
  const deleteFieldData = useRecoilValue(DeleteFieldDataAtom);
  const FieldSelectedRadio = useRecoilValue(FieldSelectedRadioAtom);
  const [visibleDeleteModal, setVisibleDeleteModal] = useRecoilState(DeleteFieldModalAtom);
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
  const DeleteText = () => {
    return (
      <span className="text-[#222222] text-lg text-center whitespace-pre-wrap">
        정말 계정을 삭제하시겠습니까? <br />
        계정을 삭제하시면
        <span className="text-[#FF0000]">복구 불가능</span>합니다.
      </span>
    );
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
      <DeleteModal
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
        Text={DeleteText}
        url={"https://localhost:3333/api/mongo/field"}
        data={deleteFieldData}
      />
    </MainLayout>
  );
};
const DeleteModal = ({ visible, setVisible, Text, url, data }) => {
  const setCreateFieldItem = useSetRecoilState(CreateFieldItemAtom);
  const setCheckedFieldItem = useSetRecoilState(CheckedFieldItemAtom);
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
          <Text />
          <div className="flex mt-[4.375rem] justify-between">
            <button
              className="w-[12.5rem] h-[2.5rem] bg-white"
              onClick={async () => {
                const res = await axios.delete(`${url}`, {
                  data,
                });
                if (res.data.result === 1) {
                  setCreateFieldItem(true);
                  setCheckedFieldItem(null);
                  alert("삭제되었습니다.");
                  window.location.reload();
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
export default MyPage;
