import Image from "next/image";

const MainView = () => {
  return (
    <section className="bg-white w-[984px] h-[600px] mt-[38px] flex flex-col">
      <div className="flex w-full relative">
        <div className="w-[100px] h-[50px] flex justify-center items-center">
          <span>View1</span>
        </div>
        <div className="w-[100px] h-[50px] flex justify-center items-center">
          <span>View2</span>
        </div>
        <div className="w-[100px] h-[50px] flex justify-center items-center">
          <span>View3</span>
        </div>
        <button className="absolute right-[20px] top-[10px] w-[130px] h-[40px] bg-[#182a5b] hover:bg-[#569EF5]">
          <span className="text-white">XR view</span>
        </button>
      </div>
      <div className="w-full h-full px-[20px] py-[10px]">
        <div className="w-full h-full relative">
          <picture>
            <Image src={`/images/main/Rectangle 124.png`} fill draggable={false} alt="" />
          </picture>
        </div>
      </div>
    </section>
  );
};
export default MainView;
