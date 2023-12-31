import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  text60px,
  text50px,
  text40px,
  text34px,
  text30px,
  mb100px,
  px130px,
  pb200px,
  ml60px,
  mt20px,
  mb90px,
  width120px,
  height120px,
  width550px,
  height560px,
  width990px,
  pl76px,
  mt170px,
  gap76px,
  width200px,
  height240px,
  text20px,
  width60px,
  height60px,
  width800px,
  height450px,
  mb70px,
  mb50px,
  mb30px,
  text36px,
  gap90px,
  width300px,
  height74px,
  pl150px,
  pt170px,
  mt50px,
  pl40px,
  py150px,
  lineHeight68px,
  gapX60px,
  gapY80px,
  gridCols480px,
  pt200px,
  pl240px,
  letterSpacing10percent,
  width600px,
  height90px,
  pl100px,
  width50px,
  height50px,
  py80px,
  text24px,
  text16px,
  gapX50px,
  heightFlexible,
  pt150px,
  py100px,
  heightScreen,
  lineHeight49px,
} from "../../components/Main/flexibleStyle";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className={`landing-page flex flex-col w-full h-full whitespace-pre font-['NotoSans']`}>
      <div className={`flex flex-col w-full ${heightScreen}`}>
        <section className="flex w-full justify-center items-center">
          <Block1 />
        </section>
        <section className="flex w-full justify-center items-center">
          <Block2 />
        </section>
        <section className="flex w-full justify-center items-center">
          <Block3 />
        </section>
        <section className="flex w-full justify-center items-center">
          <Block4 />
        </section>
      </div>
      <div
        className={`flex flex-col w-full h-fit bg-[#F3F3F3] justify-center items-center font-['Inter'] ${py80px}`}
      >
        <picture
          className={`relative flex opacity-60 cursor-pointer ${width300px} ${height74px}`}
          onClick={() => {
            router.push("/main");
          }}
        >
          <Image src={`/images/landing/logo.svg`} alt="" fill="fill" />
        </picture>
        <div className={`w-screen flex justify-center ${mt50px}`}>
          <div className={`flex text-[#7D7D7D] items-center justify-center ${gapX50px}`}>
            <span className={`${text24px}`}>포탈301</span>
            <span className={`${text16px}`}>사업자등록번호 : 353-87-02451</span>
            <div className={`w-[1px] h-[13px] bg-[#D9D9D9]`} />
            <span className={`${text16px}`}>박장준</span>
            <div className={`w-[1px] h-[13px] bg-[#D9D9D9]`} />
            <span className={`${text16px}`}>070-4776-7002</span>
            <div className={`w-[1px] h-[13px] bg-[#D9D9D9]`} />
            <span className={`${text16px}`}>jangjun_park@portal301.com</span>
          </div>
        </div>
        <span className={`text-[#7D7D7D] ${mt50px} ${text16px}`}>
          ⓒ 2023 Portal301 Co.,Ltd. check All rights Reserved.
        </span>
      </div>
    </div>
  );
};
export default LandingPage;

const Block1 = () => {
  const router = useRouter();
  return (
    <div className={`flex w-full relative justify-center items-center ${heightFlexible}`}>
      <picture className={`w-screen ${heightFlexible} -z-10 absolute top-0 left-0`}>
        <Image
          src={`/images/landing/landing.jpg`}
          fill="fill"
          style={{ objectFit: "cover" }}
          alt=""
        />
      </picture>
      <div className={`flex w-screen ${heightFlexible} bg-opacity-50 bg-black z-10 absolute`}></div>
      <div className={`text-white flex flex-col w-[103.75rem] z-20 h-fit ${pt200px} ${pl240px}`}>
        <span
          className={`uppercase w-fit font-['RobotoB'] z-30 ${letterSpacing10percent} ${text60px}`}
        >
          portal
        </span>
        <span className={`whitespace-pre z-30 ${text34px} ${mt50px} ${mb100px}`}>
          {`로봇팔을 이용하여 더 다양하고,\n정교한 작업을 대신해보세요.\n로봇팔 업계 1위 업체,\n포탈에서 경험해보세요.`}
        </span>
        <button
          className={`relative bg-black bg-opacity-50 flex justify-start items-center ${width600px} ${height90px} ${pl100px} hover:opacity-80`}
          onClick={() => {
            router.push("/main/login");
          }}
        >
          <span className={`${text30px}`}>로그인 / 서비스 이용하기</span>
          <span
            className={`${width50px} ${height50px} flex absolute top-[22.5%] right-[3.083333333333333%]`}
          >
            <Image src={`/images/landing/chevron-right.svg`} alt="" fill="fill" />
          </span>
        </button>
      </div>
    </div>
  );
};
const Block2 = () => {
  return (
    <div
      className={`flex w-full max-w-[103.75rem] flex-col bg-white items-center ${heightFlexible} ${px130px} ${pb200px}
    `}
    >
      <span
        className={`flex text-[#252525] self-start ${ml60px} ${text50px} ${mt170px} ${mb100px}`}
      >{`포탈의 로봇팔은 무엇이 다른가요?`}</span>
      <div className={`flex justify-start w-full gap-[6%]`}>
        <div className={`flex ${width550px} ${height560px}`}>
          <div className={`w-[2px] ${height560px} bg-[#cbcbcb] border`} />
          <div className={`flex flex-col ${pl76px} relative`}>
            <span
              className={`text-[#909090] z-10 font-['Roboto'] ${text40px} ${mt20px} ${mb90px}`}
            >{`3D telepresence`}</span>
            <div className={`flex mb-[3.6%] relative`}>
              <div
                className={`bg-[#CCD4E8] z-0 absolute ${width120px} ${height120px}
            -left-[8.6%] lg:-left-[5.3%] 
            top-[25%] lg:-top-[38%] 
            `}
              />
              <span
                className={`text-[#182A5B] font-['Roboto'] z-10 ${text40px}`}
              >{`Remote control robot`}</span>
            </div>
            <span
              className={`text-[#252525] whitespace-pre z-10 ${mb90px} ${text34px} ${lineHeight49px}`}
            >
              {`초저지연 통신을 통해 사용자의\n모션에 위화감 없이 동기화됩니다.\n위험하거나 멀리 있는 현장의\n노동자를 대체합니다.`}
            </span>
          </div>
        </div>
        <picture className={`relative ${width990px} ${height560px}`}>
          <Image src={`/images/landing/robot-1.svg`} fill="fill" alt="" />
        </picture>
      </div>
    </div>
  );
};
const Block3 = () => {
  const targetRef = useRef();
  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(
        ([e]) => {
          const target = e.target;
          if (e.isIntersecting) {
            target.style.opacity = 1;
            target.style.transform = "translateY(0)";
          } else {
            target.style.opacity = 0;
            target.style.transform = "translateY(150px)";
            target.style.transition = "opacity 1s, transform 0.5s";
          }
        },
        { threshold: 0 }
      );
      observer.observe(targetRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      className={`flex flex-col w-fit max-w-[103.75rem] justify-center bg-[#F3F3F3] ${heightFlexible}`}
    >
      <div className={`flex w-full h-full ${gap76px} ${px130px} ${pt150px}`}>
        <picture className={`${width800px} ${height450px} relative`}>
          <Image src={`/images/landing/robot-2.svg`} fill="fill" alt="" />
        </picture>
        <div className={`flex flex-col`}>
          <span
            className={`text-[#252525] ${mb50px} ${text50px}`}
          >{`로봇팔을 활용한 다양한 서비스`}</span>
          <span
            className={`text-[#182A5B] font-['Roboto'] ${mb30px} font-medium ${text40px}`}
          >{`SMART FARM`}</span>
          <span className={`whitespace-pre text-[#252525] ${mb70px} ${lineHeight49px} ${text36px}`}>
            {`인구 감소와 고령화 문제로 인한 일손이 부족한\n농촌에서는 팜봇을 활용하여 씨를 심거나\n모를 심는 작업 등 사람이 하던 작업을\n빠르고 정확한 작업을 수행해냅니다.`}
          </span>
          <div className={`w-full h-[1px] bg-[#CBCBCB]`}></div>
        </div>
      </div>
      <div
        className={`flex w-full h-full font-['Roboto'] transition-all duration-300 overflow-x-scroll scrollbar-hide ${py100px} ${px130px} ${gap90px}
    `}
        ref={targetRef}
      >
        {[
          { filename: "factory.svg", title: "Factory" },
          { filename: "smart-farm.svg", title: "Smart-Farm" },
          { filename: "teleoperation.svg", title: "Teleoperation" },
          { filename: "streaming.svg", title: "2D/3D\nStreaming" },
          { filename: "education.svg", title: "Education" },
          { filename: "ai.svg", title: "Ai" },
        ].map((item, index) => {
          return (
            <div key={item.title} className={`w-fit h-fit`}>
              <IconsComponent icon={`/images/landing/${item.filename}`} title={item.title} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Block4 = () => {
  return (
    <div
      className={`flex flex-col w-fit max-w-[103.75rem] justify-center bg-white ${heightFlexible}`}
    >
      <div
        className={`flex flex-col w-fit max-w-[103.75rem] justify-center h-fit ${pl150px} ${pt170px}`}
      >
        <picture className={`relative flex ${width300px} ${height74px} ${mb30px}`}>
          <Image src={`/images/landing/logo.svg`} alt="" fill="fill" />
        </picture>
        <span className={`whitespace-pre text-[#161616] ${pl40px} ${text50px} ${lineHeight68px}`}>
          {`스타트업에서 부터 대기업까지\n포탈을 믿고 맡겨주신 소중한 파트너사`}
        </span>
      </div>
      <div
        className={`w-full h-fit grid overflow-y-clip overflow-x-scroll scrollbar-hide ${gapX60px} ${gapY80px} ${py150px} ${gridCols480px}`}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <div key={item} className={`w-full h-fit`}>
              <LogosComponent logo={``} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IconsComponent = ({ icon, title }) => {
  return (
    <button
      className={`flex justify-center items-center bg-white gap-[11%] select-none ${width200px} ${height240px}
      hover:-translate-y-5 transition-transform duration-300 ease-in-out z-10
      `}
    >
      <div className={`w-full h-full flex flex-col justify-center items-center`}>
        <picture
          className={`relative ${width60px} ${height60px} ${
            title.includes("Streaming") ? "scale-[0.6666667]" : null
          }`}
        >
          <Image src={icon} alt="" fill="fill" />
        </picture>
        <span
          className={`text-[#182A5B] whitespace-pre-wrap ${mt20px} truncate w-full ${text20px}`}
        >
          {title}
        </span>
      </div>
    </button>
  );
};
const LogosComponent = ({ logo }) => {
  return (
    <div
      className={`w-full flex justify-center items-center bg-[#CCD4E880] relative ${height120px}`}
    >
      <span className={`uppercase text-white relative ${text50px}`}>
        {logo ? <Image src={logo} alt="" fill="fill" /> : "logo"}
      </span>
    </div>
  );
};
// 1px convert to rem = 0.0625rem
// 1660px convert to rem = 103.75rem
// 1920px convert to rem = 120rem
