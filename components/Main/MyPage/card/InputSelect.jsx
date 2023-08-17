import { useEffect } from "react";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { CreateRobotSelectedFieldAtom } from "../../../../recoil/AtomStore";

export const InputSelect = ({ title, type, id, value, currentValue, CheckedFieldItem }) => {
  const selectRef = useRef();
  const setCreateRobotSelectedField = useSetRecoilState(CreateRobotSelectedFieldAtom);
  useEffect(() => {
    console.log("value");
    console.log(value);
    console.log("currentValue");
    console.log(currentValue);
    console.log(CheckedFieldItem);
    if (currentValue) {
      document.querySelector("select").value =
        type === "fields" ? currentValue.field : currentValue.tasks;
    }
  }, [value, currentValue]);
  useEffect(() => {
    console.log("selectRef?.current?.value");
    console.log(selectRef?.current?.value);
  }, [selectRef?.current?.value]);
  return (
    <div className="flex flex-col items-start justify-between mt-[2.625rem]">
      <div className="flex items-center">
        <div className="w-[0.125rem] h-[1rem] bg-[#182A5B]" />
        <span className="text-[#222222] text-lg ml-[0.625rem]">{title}</span>
      </div>
      <div className="flex flex-col w-full h-fit justify-center border-b p-[1.25rem] focus:ring-0 focus:outline-none border-b-[#182A5B] relative">
        <select
          id={id}
          ref={selectRef}
          defaultValue={currentValue ? currentValue?.field : value}
          onChange={() => {
            if (type === "fields") {
              const selectedField = value.find((item) => {
                return item.index.toString() === selectRef?.current?.value;
              });
              setCreateRobotSelectedField(selectedField);
            }
          }}
        >
          <option value={0}>선택해 주세요.</option>
          {type === "fields" ? (
            value?.map((item, index) => {
              return (
                <option key={index} value={item?.index}>
                  {item?.fieldName}
                </option>
              );
            })
          ) : type === "tasks" ? (
            [...Array(CheckedFieldItem ? CheckedFieldItem?.processCount : value).keys()]?.map(
              (item, index) => (
                <option key={index} value={currentValue ? currentValue?.tasks : item + 1}>
                  {`제 ${index + 1} 공정`}
                </option>
              )
            )
          ) : (
            <option value={null}>선택된 현장이 존재하지 않습니다.</option>
          )}
        </select>

        {/* <select
              name="selectField"
              id="selectField"
              onChange={(e) => {
                setSelectedFieldInAccount(e.target.value);
                console.log(
                  CheckedCompanyItem?.fields?.filter((item) => {
                    return item?.index === parseInt(e.target.value) ? item?.processCount : null;
                  })
                );
                setSelectedTaskInAccount(
                  CheckedCompanyItem?.fields?.filter((item) => {
                    return item?.index === parseInt(e.target.value) ? item?.processCount : null;
                  })
                );
              }}
            >
              <option value="0">공정 선택</option>
              {CheckedCompanyItem?.fields?.map((item, index) => {
                return (
                  <option value={item?.index} key={`selectField${index}`}>
                    {item?.fieldName}
                  </option>
                );
              })}
            </select> */}
      </div>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 20px
