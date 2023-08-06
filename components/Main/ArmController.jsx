import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ArmController = ({ visible, setVisible }) => {
  const [controlState, setControlState] = useState("operate");
  const [baseValue, setBaseValue] = useState(0);
  const [shoulderValue, setShoulderValue] = useState(0);
  const [elbowValue, setElbowValue] = useState(0);
  const [wrist1Value, setWrist1Value] = useState(0);
  const [wrist2Value, setWrist2Value] = useState(0);
  const [wrist3Value, setWrist3Value] = useState(0);
  useEffect(() => {
    const base = document.getElementById("progress-base");
    if (base) {
      base.style.transform = `translateX(${baseValue / 3.6}%)`;
    }
  }, [baseValue]);
  useEffect(() => {
    const shoulder = document.getElementById("progress-shoulder");
    if (shoulder) {
      shoulder.style.transform = `translateX(${shoulderValue / 3.6}%)`;
    }
  }, [shoulderValue]);
  useEffect(() => {
    const elbow = document.getElementById("progress-elbow");
    if (elbow) {
      elbow.style.transform = `translateX(${elbowValue / 3.6}%)`;
    }
  }, [elbowValue]);
  useEffect(() => {
    const wrist1 = document.getElementById("progress-wrist1");
    if (wrist1) {
      wrist1.style.transform = `translateX(${wrist1Value / 3.6}%)`;
    }
  }, [wrist1Value]);
  useEffect(() => {
    const wrist2 = document.getElementById("progress-wrist2");
    if (wrist2) {
      wrist2.style.transform = `translateX(${wrist2Value / 3.6}%)`;
    }
  }, [wrist2Value]);
  useEffect(() => {
    const wrist3 = document.getElementById("progress-wrist3");
    if (wrist3) {
      wrist3.style.transform = `translateX(${wrist3Value / 3.6}%)`;
    }
  }, [wrist3Value]);
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-40 bg-black bg-opacity-50 w-full h-full ${
          visible ? "block" : "hidden"
        }`}
        onClick={() => {
          setVisible(false);
        }}
      />
      <section
        id="floatDiv"
        className={`flex flex-col bg-white w-fit h-screen overflow-scroll fixed top-0 -right-[1000px] px-[40px] py-[38px] z-50 ${
          !visible ? "translate-x-[1000px]" : "-translate-x-[1000px]"
        } transition-transform duration-500`}
      >
        <span
          className="absolute top-2 left-2 w-[20px] h-[20px] cursor-pointer select-none"
          onClick={() => {
            setVisible(false);
          }}
        >
          <Image fill src={`/images/main/x-mark.svg`} alt="" />
        </span>
        <div className="flex gap-[31px] w-full h-[36px] items-center">
          <span className="text-xl text-[#222222]">CONTROLLER</span>
          <div className="w-full h-full flex">
            <input
              type="radio"
              name="controller"
              id="reset"
              className="peer/reset hidden"
              onChange={(e) => {
                setControlState("reset");
              }}
            />
            <label
              htmlFor="reset"
              className={`controller-reset w-[100px] h-full cursor-pointer border-1 border-solid border-[#182A5B] flex items-center justify-center gap-[10px] ${
                controlState === "reset" ? "bg-[#182A5B] text-white" : "bg-white text-[#182a5b]"
              }`}
            >
              <div className="w-[16px] h-[16px] relative">
                {controlState === "reset" ? (
                  <Image
                    src="/images/main/controller/reset-icon-white.svg"
                    fill
                    draggable={false}
                    alt=""
                  />
                ) : (
                  <Image
                    src="/images/main/controller/reset-icon.svg"
                    fill
                    draggable={false}
                    alt=""
                  />
                )}
              </div>
              <span className="text-sm">RESET</span>
            </label>
            <input
              type="radio"
              name="controller"
              id="operate"
              defaultChecked
              className="peer/operate hidden"
              onChange={(e) => {
                setControlState("operate");
              }}
            />
            <label
              htmlFor="operate"
              className={`controller-operate w-[100px] h-full cursor-pointer border-1 border-solid border-[#182A5B] flex items-center justify-center ${
                controlState === "operate" ? "bg-[#182A5B] text-white" : "bg-white text-[#182a5b]"
              }`}
            >
              <span className="text-sm ">OPERATE</span>
            </label>
            <input
              type="radio"
              name="controller"
              id="stop"
              className="peer/stop hidden"
              onChange={(e) => {
                setControlState("stop");
              }}
            />
            <label
              htmlFor="stop"
              className={`controller-stop w-[100px] h-full cursor-pointer border-1 border-solid border-[#182A5B] flex items-center justify-center ${
                controlState === "stop" ? "bg-[#182A5B] text-white" : "bg-white text-[#182a5b]"
              }`}
            >
              <span className="text-sm">STOP</span>
            </label>
          </div>
        </div>
        <div className="flex gap-[40px] justify-center items-center mt-[32px]">
          <div className="flex flex-col gap-[12px]">
            <button className="w-[220px] h-[34px] flex gap-[18px] justify-center items-center bg-[#182a5b] ">
              <div className="relative w-[14px] h-[16px]">
                <Image src={"/images/main/controller/upBtn.svg"} fill alt="" />
              </div>
              <span className="text-white">UP</span>
            </button>
            <button className="w-[220px] h-[34px] flex gap-[18px] justify-center items-center bg-[#182a5b] ">
              <div className="relative w-[14px] h-[16px]">
                <Image src={"/images/main/controller/downBtn.svg"} fill alt="" />
              </div>
              <span className="text-white">DOWN</span>
            </button>
          </div>
          <div className="flex justify-center items-center w-[180px] h-[90px] relative overflow-hidden">
            <button className="absolute left-[1px] top-0 w-1/2 bg-[#182a5b] h-full rounded-tl-full border-r-[1px] border-r-[#fff]">
              <div className="w-[20px] h-[16px] absolute left-[10px] bottom-[14px]">
                <Image src={"/images/main/controller/rotate-l.svg"} fill alt="" />
              </div>
            </button>
            <button className="absolute right-0 top-0 w-1/2 bg-[#182a5b] h-full rounded-tr-full border-l-[1px] border-l-[#fff]">
              <div className="w-[20px] h-[16px] absolute right-[10px] bottom-[14px]">
                <Image src={"/images/main/controller/rotate-r.svg"} fill alt="" />
              </div>
            </button>
            <div className="relative top-1/2 rounded-full w-1/2 scale-[1.2] h-full bg-white z-10" />
          </div>
        </div>
        <div className="flex gap-[58px] justify-center">
          {/* 이동 */}
          <div className="flex justify-center items-center mt-[32px] relative w-[182px] h-[182px]">
            <div className="absolute -top-5 bg-[#182a5b] rounded-tl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 top-1 left-1">
                <Image src={"/images/main/controller/move-up.svg"} fill alt="" />
              </div>
            </div>
            <div className="absolute -right-5 bg-[#182a5b] rounded-tr-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 right-1 top-1">
                <Image src={"/images/main/controller/move-right.svg"} fill alt="" />
              </div>
            </div>
            <div className="absolute -bottom-5 bg-[#182a5b] rounded-br-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 bottom-1 right-1">
                <Image src={"/images/main/controller/move-down.svg"} fill alt="" />
              </div>
            </div>
            <div className="absolute -left-5 bg-[#182a5b] rounded-bl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 bottom-1 left-1">
                <Image src={"/images/main/controller/move-left.svg"} fill alt="" />
              </div>
            </div>
            <div className="flex justify-center items-center rounded-full w-[50px] h-[50px] bg-white z-10">
              <span className="text-black text-sm">이동</span>
            </div>
          </div>
          {/* 회전 */}
          <div className="flex justify-center items-center mt-[32px] relative w-[182px] h-[182px]">
            <div className="absolute -top-5 bg-[#182a5b] rounded-tl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 top-1 left-1">
                <Image src={"/images/main/controller/rotate-up.svg"} fill alt="" />
              </div>
            </div>
            <div className="absolute -right-5 bg-[#182a5b] rounded-tr-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 right-1 top-1">
                <Image src={"/images/main/controller/rotate-right.svg"} fill alt="" />
              </div>
            </div>
            <div className="absolute -bottom-5 bg-[#182a5b] rounded-br-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 bottom-1 right-1">
                <Image src={"/images/main/controller/rotate-down.svg"} fill alt="" />
              </div>
            </div>
            <div className="absolute -left-5 bg-[#182a5b] rounded-bl-full rotate-45 w-[90px] h-[90px] flex justify-center items-center cursor-pointer">
              <div className="w-5 h-5 relative -rotate-45 bottom-1 left-1">
                <Image src={"/images/main/controller/rotate-left.svg"} fill alt="" />
              </div>
            </div>
            <div className="flex justify-center items-center rounded-full w-[50px] h-[50px] bg-white z-10">
              <span className="text-black text-sm">회전</span>
            </div>
          </div>
        </div>
        <div className="w-full border-t-[1px] border-[#D9D9D9] mt-[30px]" />
        <RotateArm
          name={"BASE"}
          id={"progress-base"}
          value={baseValue}
          setValue={setBaseValue}
          step={10}
        />
        <RotateArm
          name={"SHOULDER"}
          id={"progress-shoulder"}
          value={shoulderValue}
          setValue={setShoulderValue}
          step={10}
        />
        <RotateArm
          name={"ELBOW"}
          id={"progress-elbow"}
          value={elbowValue}
          setValue={setElbowValue}
          step={10}
        />
        <RotateArm
          name={"WRIST 1"}
          id={"progress-wrist1"}
          value={wrist1Value}
          setValue={setWrist1Value}
          step={10}
        />
        <RotateArm
          name={"WRIST 2"}
          id={"progress-wrist2"}
          value={wrist2Value}
          setValue={setWrist2Value}
          step={1}
        />
        <RotateArm
          name={"WRIST 3"}
          id={"progress-wrist3"}
          value={wrist3Value}
          setValue={setWrist3Value}
          step={0.1}
        />
        <div className="w-full border-t-[1px] border-[#D9D9D9] mt-[20px]" />
        <div className="grid grid-cols-2 gap-[18px] w-full mt-[20px]">
          {["FLIP WRIST", "FLIP ELBOW", "FLIP SHOULDER", "HOME"].map((item, index) => (
            <button
              key={index}
              className="w-[220px] h-[40px] bg-[#182A5B] text-white flex justify-center items-center"
            >
              <span>{item}</span>
            </button>
          ))}
        </div>
        <div className="w-full border-t-[1px] border-[#D9D9D9] mt-[20px]" />
        <div className="flex flex-col gap-[20px] mt-[20px]">
          <span className="text-[#222222] text-base">TOOL POSITION</span>
          <div className="flex gap-[18px]">
            {["X", "Y", "Z"].map((item, index) => (
              <div key={index} className="flex">
                <div className="flex justify-center items-center w-[22px] h-[30px] bg-[#182A5B]">
                  <span className="text-white text-base">{item}</span>
                </div>
                <div className="w-[84px] h-full flex justify-center items-center border-b border-b-[#182A5B]">
                  <span className="text-[#222222] text-sm">value</span>
                </div>
                <span className="pl-[8px] h-full flex items-end text-base text-[#222222] font-[Roboto] relative top-[4.5px]">
                  mm
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default ArmController;

const RotateArm = ({ name, id, value, setValue, step }) => {
  const [speed, SetSpeed] = useState(120);
  const intervalRef = useRef(null);
  useEffect(() => {
    return () => stopCounter();
  }, []);

  const startCounter = (type) => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        SetSpeed(speed + 10);

        setValue((prev) => {
          if (type === "-") {
            return prev - step < -180 ? prev : prev - step;
          } else {
            return prev + step > 180 ? prev : prev + step;
          }
        });
      }, speed);
    }
  };
  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    SetSpeed(120);
  };

  return (
    <div className="flex flex-col mt-[20px] ">
      <div className="flex gap-[18px]">
        <div
          className="w-[60px] h-[40px] relative cursor-pointer"
          onMouseUp={() => {
            stopCounter();
          }}
          onMouseDown={(e) => {
            startCounter("-");
          }}
        >
          <Image src={"/images/main/controller/minus.svg"} fill alt="" />
        </div>
        <div
          className="w-[60px] h-[40px] relative cursor-pointer"
          onMouseUp={() => {
            stopCounter();
          }}
          onMouseDown={() => {
            startCounter("+");
          }}
        >
          <Image src={"/images/main/controller/plus.svg"} fill alt="" />
        </div>
        <div className="flex flex-col gap-[0px]">
          <div className="w-[300px] h-[12px] bg-[#F2F2F2] overflow-hidden relative">
            <div
              id={id}
              className={`absolute z-20 w-full h-full bg-[#182A5B66] transition-all duration-300 right-1/2`}
            />
          </div>
          <div className="w-full flex justify-between">
            <span className="text-[#222222] text-xl">{name}</span>
            <div className="w-[80px] flex justify-end">
              <span
                className="text-[#222222] text-lg cursor-pointer"
                onClick={(e) => {
                  e.target.classList.add("hidden");
                  e.target.nextSibling?.classList.remove("hidden");
                  e.target.nextSibling?.value === "";
                  e.target.nextSibling?.focus();
                }}
              >
                {value} °
              </span>
              <input
                type="text"
                id={`${id}-input`}
                defaultValue={value}
                className="text-right text-[#222222] text-lg placeholder:text-lg hidden"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.previousSibling.classList.remove("hidden");
                    e.target.classList.add("hidden");
                    setValue(
                      parseInt(e.target.value) < -180
                        ? -180 && (e.target.value = -180)
                        : parseInt(e.target.value) > 180
                        ? 180 && (e.target.value = 180)
                        : parseInt(e.target.value)
                    );
                  }
                }}
                onFocus={(e) => {
                  e.target.value = "";
                }}
                onBlur={(e) => {
                  e.target.previousSibling.classList.remove("hidden");
                  e.target.classList.add("hidden");
                  if (!e.target.value) {
                    setValue(value);
                  } else {
                    setValue(
                      parseInt(e.target.value) < -180
                        ? -180 && (e.target.value = -180)
                        : parseInt(e.target.value) > 180
                        ? 180 && (e.target.value = 180)
                        : parseInt(e.target.value)
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
