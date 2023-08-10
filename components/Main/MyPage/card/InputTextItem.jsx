export const InputTextItem = ({ title, type, id, value, placeholder }) => {
  return (
    <div
      className={`flex flex-col w-full items-start justify-between ${
        type === "camera" ? "" : "mt-[2.625rem]"
      }`}
    >
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex flex-col w-full h-[3.125rem] justify-center relative">
        <input
          type={`${type === "password" ? "password" : "text"}`}
          id={id}
          className="flex w-full h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.125rem] focus:outline-none"
          placeholder={placeholder}
          value={value ? value : ""}
        />
        {id === "userId" ? (
          <span className="text-[#FF0000] text-xs absolute -bottom-[1.25rem] hidden">
            영문자+숫자, 20자 제한, 특수기호 금지
          </span>
        ) : id === "password" ? (
          <span className="text-[#FF0000] text-xs absolute -bottom-[1.25rem] hidden">
            영문자+숫자, 20자 제한
          </span>
        ) : id === "passwordCheck" ? (
          <span className="text-[#FF0000] text-xs absolute -bottom-[1.25rem] hidden">
            비밀번호가 일치하지 않습니다.
          </span>
        ) : null}
      </div>
    </div>
  );
};
