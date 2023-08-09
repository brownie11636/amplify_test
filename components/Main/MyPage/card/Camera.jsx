import { InputTextItem } from "./InputTextItem";

export const Camera = () => {
  return (
    <div className="p-[1.875rem] w-fit h-fit bg-white relative ">
      <div className="flex flex-col">
        <div>
          <label htmlFor="view1">
            <input type="radio" name="view" id="view1" className="peer hidden" defaultChecked />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">VIEW 1</span>
            </div>
          </label>
          <label htmlFor="view2">
            <input type="radio" name="view" id="view2" className="peer hidden" />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">VIEW 2</span>
            </div>
          </label>
          <label htmlFor="view3">
            <input type="radio" name="view" id="view3" className="peer hidden" />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">VIEW 3</span>
            </div>
          </label>
          <label htmlFor="xr-view">
            <input type="radio" name="view" id="xr-view" className="peer hidden" />
            <div className="flex justify-center items-center cursor-pointer text-[#7D7D7D] border-t border-t-[#DCDCDC] w-[8.75rem] h-[2.5rem] peer-checked:border-t-[#182A5B] peer-checked:text-[#182A5B]">
              <span className="text-base">XR VIEW</span>
            </div>
          </label>
        </div>
        <div className="w-[40rem] h-[23.75rem] mt-[1.875rem] bg-[#D9D9D9]"></div>
        <div className="mt-[1.875rem] flex flex-col gap-[1.875rem]">
          <div className="flex gap-[3.125rem] justify-between">
            <InputTextItem
              title="카메라 1"
              type="camera"
              id="camera1"
              placeholder="'-'를 포함하여 입력"
            />
            <div className="flex h-fit w-[15rem] self-end">
              <button className="w-[7.5rem] h-[2.5rem] border border-[#182A5B] text-[#182A5B]">
                <span>삭제</span>
              </button>
              <button className="w-[7.5rem] h-[2.5rem] bg-[#182A5B] text-white">
                <span>연동</span>
              </button>
            </div>
          </div>
          <div className="flex gap-[3.125rem] justify-between">
            <InputTextItem
              title="카메라 2"
              type="camera"
              id="camera2"
              placeholder="'-'를 포함하여 입력"
            />
            <div className="flex h-fit w-[15rem] self-end">
              <button className="w-[7.5rem] h-[2.5rem] border border-[#182A5B] text-[#182A5B]">
                <span>삭제</span>
              </button>
              <button className="w-[7.5rem] h-[2.5rem] bg-[#182A5B] text-white">
                <span>연동</span>
              </button>
            </div>
          </div>
          <div className="flex gap-[3.125rem] justify-between">
            <InputTextItem
              title="카메라 3"
              type="camera"
              id="camera3"
              placeholder="'-'를 포함하여 입력"
            />
            <div className="flex h-fit w-[15rem] self-end">
              <button className="w-[7.5rem] h-[2.5rem] border border-[#182A5B] text-[#182A5B]">
                <span>삭제</span>
              </button>
              <button className="w-[7.5rem] h-[2.5rem] bg-[#182A5B] text-white">
                <span>연동</span>
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-between relative">
            <div className="w-[0.125rem] h-[1rem] bg-[#182A5B] absolute left-0" />
            <span className="text-[#222222] text-lg ml-[0.625rem]">XR VIEW 사용 여부</span>
            <div className="flex h-fit w-[11.25rem] self-end justify-self-end">
              <button className="w-[5.625rem] h-[1.875rem] border border-[#182A5B] text-[#182A5B]">
                <span>OFF</span>
              </button>
              <button className="w-[5.625rem] h-[1.875rem] bg-[#182A5B] text-white">
                <span>ON</span>
              </button>
            </div>
          </div>
        </div>
        <button className="w-[17.5rem] h-[2.5rem] mt-[1.875rem] bg-[#182A5B] flex justify-center items-center self-end">
          <span className="text-white text-base">등록</span>
        </button>
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 180px convert to rem = 11.25rem
