export const InputTextArea = ({ title, type, id, value, placeholder }) => {
  return (
    <div className="flex flex-col items-start justify-between mt-[2.625rem]">
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex flex-col w-fit h-fit justify-center border-b p-[1.25rem] border-b-[#182A5B] relative">
        <textarea
          className="flex w-[15rem] h-[7.5rem] text-sm text-[#222222] resize-none scrollbar-hide focus:outline-none"
          id={id}
          placeholder={placeholder}
          defaultValue={value || ""}
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 20px
