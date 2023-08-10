export const InputAddressItem = ({ title, id, zipCode, address, detailAddress }) => {
  const onClickAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddr = data.address; // 최종 주소 변수
        let extraAddr = ""; // 조합형 주소 변수

        // 기본 주소가 도로명 타입일때 조합한다.
        if (data.addressType === "R") {
          //법정동명이 있을 경우 추가한다.
          if (data.bname !== "") {
            extraAddr += data.bname;
          }
          // 건물명이 있을 경우 추가한다.
          if (data.buildingName !== "") {
            extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          // 기본 주소와 조합형 주소를 동일시한다.
          fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode").value = data.zonecode; //5자리 새우편번호 사용
        document.getElementById("address").value = fullAddr;

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("address2").focus();
      },
    }).open();
  };
  return (
    <div className="flex flex-col mt-[2.625rem]" id={id}>
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex w-full h-[3.125rem] items-center justify-between">
        <input
          type="text"
          id="postcode"
          className="flex w-[8.75rem] h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.25rem] focus:outline-none placeholder:text[#7D7D7D]"
          placeholder={`우편번호 검색`}
          readOnly
          defaultValue={zipCode || ""}
          onClick={onClickAddress}
        />
        <button
          className="flex justify-center items-center w-[7.5rem] h-[2.5rem] bg-[#182A5B]"
          onClick={onClickAddress}
        >
          <span className=" text-white text-[1rem]">검색</span>
        </button>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          id="address"
          className="flex w-full h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.25rem] mt-[0.625rem] focus:outline-none placeholder:text[#7D7D7D]"
          placeholder={`주소를 검색해 주세요.`}
          defaultValue={address || ""}
          readOnly
          onClick={onClickAddress}
        />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          id="address2"
          className="flex w-full h-[3.125rem] border-b border-b-[#182A5B] text-sm text-[#222222] pl-[1.25rem] mt-[0.625rem] focus:outline-none placeholder:text[#7D7D7D]"
          placeholder={`상세주소를 입력해 주세요.`}
          defaultValue={detailAddress || ""}
        />
      </div>
    </div>
  );
};
