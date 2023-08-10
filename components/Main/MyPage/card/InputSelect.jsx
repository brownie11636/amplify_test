import { useRef } from "react";

export const InputSelect = ({ title, type, id, value }) => {
  const selectRef = useRef();
  return (
    <div className="flex flex-col items-start justify-between mt-[2.625rem]">
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex flex-col w-full h-fit justify-center border-b p-[1.25rem] focus:ring-0 focus:outline-none border-b-[#182A5B] relative">
        <select
          name=""
          id={id}
          defaultValue={value}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 20px
