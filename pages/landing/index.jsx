import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const LandingPage = () => {
  const router = useRouter();
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
    <div className="landing-page w-full h-full flex flex-col whitespace-pre font-['NotoSans']">
      <div className="flex w-full h-full max-h-[1080px] relative">
        <picture className="w-full h-full max-h-[1080px] -z-10 absolute top-0 left-0">
          <Image src={`/images/landing/landing.jpg`} fill style={{ objectFit: "cover" }} alt="" />
        </picture>
        <div className="flex w-full h-full max-h-[1080px] bg-opacity-50 bg-black z-10">
          <div className="text-white flex flex-col w-full h-full ml-[12.5%] pt-[10.6777778%] pb-[17.5%]">
            <span
              className="uppercase font-['RobotoB'] tracking-[1.6px] z-30
              text-[100%] sm:text-[200%] md:text-[300%] lg:text-[400%] xl:text-[500%] 2xl:text-[600%] 
              mb-[0.5%] sm:mb-[1%] md:mb-[1.5%] lg:mb-[2%] xl:mb-[2.5%] 2xl:mb-[3.125%] 
            "
            >
              portal
            </span>
            <span
              className="whitespace-pre z-30
            text-[64%] sm:text-[128%] md:text-[192%] lg:text-[256%] xl:text-[320%] 2xl:text-[388.572%]
            mb-[0.868%] sm:mb-[1.736%] md:mb-[2.604%] lg:mb-[3.472%] xl:mb-[4.34%] 2xl:mb-[5.209%]
            "
            >
              {`로봇팔을 이용하여 더 다양하고,\n정교한 작업을 대신해보세요.\n로봇팔 업계 1위 업체,\n포탈에서 경험해보세요.`}
            </span>
            <button
              className="relative w-[31.25%] h-[8.273%] py-[1.489%] pl-[5.9533105%] bg-black bg-opacity-50 mb-[7.407407407407407%] flex justify-start items-center"
              onClick={() => {
                router.push("/main/login");
              }}
            >
              <span className="text-[1.5625vw]">로그인/서비스 이용하기</span>
              <span className="w-[8.333333333333333%] h-[55.555555555555556%] flex absolute top-[22.5%] right-[2.083333333333333%]">
                <Image src={`/images/landing/chevron-right.svg`} alt="" fill />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full max-h-[1080px] flex-col justify-center items-center pt-[8.334%] px-[6.771%] pb-[10.417%] bg-white">
        <span
          className="text-[#252525] leading-[68px] self-start ml-[60px]
          text-[95.23816667%] sm:text-[190.4763333%] md:text-[285.7145%] lg:text-[380.9526667%] xl:text-[476.1908333%] 2xl:text-[571.429%]
          mb-[1.1045%] sm:mb-[2.209%] md:mb-[3.3135%] lg:mb-[4.418%] xl:mb-[5.5225%] 2xl:mb-[6.627%]
          "
        >{`포탈의 로봇팔은 무엇이 다른가요?`}</span>
        <div className="flex w-full h-full gap-[6%]">
          <div className="flex w-[33.2535%] h-[100%]">
            <div className="w-[2px] h-full bg-[#cbcbcb] border" />
            <div className="flex flex-col ml-[13.77%] relative">
              <span
                className="text-[#909090] leading-[46.88px] z-10 font-['Roboto']
                text-[76.1905%] sm:text-[152.381%] md:text-[228.5715%] lg:text-[304.762%] xl:text-[380.9525%] 2xl:text-[457.143%]
                mt-[1%] sm:mt-[2%] md:mt-[3%] lg:mt-[4%] xl:mt-[5%] 2xl:mt-[6%]
                mb-[3.353333333%] sm:mb-[6.706666667%] md:mb-[10.06%] lg:mb-[13.41333333%] xl:mb-[16.76666667%] 2xl:mb-[20.12%]
                "
              >{`3D telepresence`}</span>
              <div className="flex mb-[3.6%] relative">
                <div
                  className="bg-[#CCD4E8] z-0 absolute 
                  -left-[8.6%] lg:-left-[5.3%] 
                  top-[25%] lg:-top-[38%]
                  w-[26.822835173677858%]
                  h-[75.3%] sm:h-[85.32423208%] md:h-[127.9863481%] lg:h-[170.6484642%] xl:h-[213.3105802%] 2xl:h-[255.9726962%]
                  "
                />
                <span
                  className="text-[#182A5B] leading-[46.88px] font-['Roboto'] z-10
                  text-[76.1905%] sm:text-[152.381%] md:text-[228.5715%] lg:text-[304.762%] xl:text-[380.9525%] 2xl:text-[457.143%]
                  "
                >{`Remote control robot`}</span>
              </div>
              <span
                className="text-[#252525] whitespace-pre z-10 mb-[90px]
                text-[64.762%] sm:text-[129.524%] md:text-[194.286%] lg:text-[259.048%] xl:text-[323.81%] 2xl:text-[388.572%]
                "
              >
                {`초저지연 통신을 통해 사용자의\n모션에 위화감 없이 동기화됩니다.\n위험하거나 멀리 있는 현장의\n노동자를 대체합니다.`}
              </span>
            </div>
          </div>
          <picture className="relative w-[59.7599%] h-[100%]">
            <Image src={`/images/landing/robot-1.svg`} fill alt="" />
          </picture>
        </div>
      </div>
      <div className="flex flex-col w-full h-full max-h-[1080px] bg-[#F3F3F3]">
        <div className="flex w-full h-full gap-[4.6%] px-[6.771%] pt-[8%]">
          <picture className="w-[48.193%] h-[86.71%] relative">
            <Image src={`/images/landing/robot-2.svg`} fill alt="" />
          </picture>
          <div className="flex flex-col">
            <span
              className="text-[#252525] mb-[6.948%]
              text-[95.23816667%] sm:-text-[190.4763333%] md:text-[285.7145%] lg:text-[380.9526667%] xl:text-[476.1908333%] 2xl:text-[571.429%]
              "
            >{`로봇팔을 활용한 다양한 서비스`}</span>
            <span
              className="text-[#182A5B] font-['Roboto'] mb-[4.725%]
              text-[76.1905%] sm:text-[152.381%] md:text-[228.5715%] lg:text-[304.762%] xl:text-[380.9525%] 2xl:text-[457.143%]
              "
            >{`SMART FARM`}</span>
            <span
              className="whitespace-pre text-[#252525] mb-[11.5344%] leading-[135%]
            text-[68.57133333%] sm:text-[137.1426667%] md:text-[205.714%] lg:text-[274.2853333%] xl:text-[342.8566667%] 2xl:text-[411.428%]
            "
            >
              {`인구 감소와 고령화 문제로 인한 일손이 부족한\n농촌에서는 팜봇을 활용하여 씨를 심거나\n모를 심는 작업 등 사람이 하던 작업을\n빠르고 정확한 작업을 수행해냅니다.`}
            </span>
            <div className="w-full h-[1px] bg-[#CBCBCB]"></div>
          </div>
        </div>
        <div
          className="flex w-full h-full gap-[5.55%] font-['Roboto'] transition-all duration-300 mt-[6.025%] mb-[7%] overflow-scroll scrollbar-hide
          px-[1.1285%] sm:px-[2.257%] md:px-[3.3855%] lg:px-[4.514%] xl:px-[5.6425%] 2xl:px-[6.771%]
          "
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
              <div key={item.title} className="w-full h-full">
                <IconsComponent icon={`/images/landing/${item.filename}`} title={item.title} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full h-full bg-white">
        <div className="flex flex-col w-full h-fit pl-[7.713355048859935%] pt-[8.859934853420195%]">
          <picture
            className="relative w-[16.930022573363431%] flex
            h-[12.33333333px] sm:h-[24.66666667px] md:h-[37px] lg:h-[49.33333333px] xl:h-[61.66666667px] 2xl:h-[74px]
            "
          >
            <Image src={`/images/landing/logo.svg`} alt="" fill />
          </picture>
          <span
            className="whitespace-pre text-[#161616] mt-[2.71%] pl-[3%]
            text-[95.23816667%] sm:text-[190.4763333%] md:text-[285.7145%] lg:text-[380.9526667%] xl:text-[476.1908333%] 2xl:text-[571.429%]
            leading-[11.35px] sm:leading-[22.7px] md:leading-[34.05px] lg:leading-[45.4px] xl:leading-[56.75px] 2xl:leading-[68.1px]
            "
          >
            {`스타트업에서 부터 대기업까지\n포탈을 믿고 맡겨주신 소중한 파트너사`}
          </span>
        </div>
        <div
          className="w-full h-fit grid  gap-x-[3.1%] overflow-y-clip overflow-x-scroll scrollbar-hide pt-[8.234527687296417%] pb-[10.944625407166124%]
          gap-y-[16.5%] lg:gap-y-[22%] xl:gap-y-[27.5%] 2xl:gap-y-[33%]
        grid-cols-[80px_80px_80px_80px_80px] 
        sm:grid-cols-[160px_160px_160px_160px_160px] 
        md:grid-cols-[240px_240px_240px_240px_240px] 
        lg:grid-cols-[320px_320px_320px_320px_320px] 
        xl:grid-cols-[400px_400px_400px_400px_400px] 
        2xl:grid-cols-[480px_480px_480px_480px_480px]
        "
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <div key={item} className="w-full h-fit">
                <LogosComponent logo={``} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-full bg-[#F3F3F3] flex flex-col justify-center items-center font-['Inter'] py-[4.169381107491857%]">
        <picture
          className="relative w-[16.930022573363431%] flex
            h-[12.33333333px] sm:h-[24.66666667px] md:h-[37px] lg:h-[49.33333333px] xl:h-[61.66666667px] 2xl:h-[74px]
            "
        >
          <Image src={`/images/landing/logo.svg`} alt="" fill />
        </picture>
        <div className="w-screen mt-[3.29330142490175%] flex justify-center">
          <div
            className="flex text-[#7D7D7D] items-center justify-center
          gap-[1.333333333%] sm:gap-[2.666666667%] md:gap-[4%] lg:gap-[5.333333333%] xl:gap-[6.666666667%] 2xl:gap-[8%]
          "
          >
            <span className="text-[45.71433333%] sm:text-[91.42866667%] md:text[137.143%] lg:text-[182.8573333%] xl:text[228.5716667%] 2xl:text-[274.286%]">
              포탈301
            </span>
            <span className="text-[30.47616667%] sm:text-[60.95233333%] md:text-[91.4285%] lg:text-[121.9046667%] xl:text-[152.3808333%] 2xl:text-[182.857%]">
              사업자등록번호 : 353-87-02451
            </span>
            <div className="w-[1px] h-[13px] bg-[#D9D9D9]" />
            <span className="text-[30.47616667%] sm:text-[60.95233333%] md:text-[91.4285%] lg:text-[121.9046667%] xl:text-[152.3808333%] 2xl:text-[182.857%]">
              박장준
            </span>
            <div className="w-[1px] h-[13px] bg-[#D9D9D9]" />
            <span className="text-[30.47616667%] sm:text-[60.95233333%] md:text-[91.4285%] lg:text-[121.9046667%] xl:text-[152.3808333%] 2xl:text-[182.857%]">
              070-4776-7002
            </span>
            <div className="w-[1px] h-[13px] bg-[#D9D9D9]" />
            <span className="text-[30.47616667%] sm:text-[60.95233333%] md:text-[91.4285%] lg:text-[121.9046667%] xl:text-[152.3808333%] 2xl:text-[182.857%]">
              jangjun_park@portal301.com
            </span>
          </div>
        </div>
        <span
          className="text-[#7D7D7D] mt-[3.29330142490175%]
        text-[30.47616667%] sm:text-[60.95233333%] md:text-[91.4285%] lg:text-[121.9046667%] xl:text-[152.3808333%] 2xl:text-[182.857%]
        "
        >
          ⓒ 2023 Portal301 Co.,Ltd. check All rights Reserved.
        </span>
      </div>
    </div>
  );
};
export default LandingPage;

const IconsComponent = ({ icon, title }) => {
  return (
    <button
      className="flex justify-center items-center bg-white gap-[11%] select-none
      w-[33.33333333px] sm:w-[66.66666667px] md:w-[100px] lg:w-[133.3333333px] xl:w-[166.6666667px] 2xl:w-[200px]
      h-[40px] sm:h-[80px] md:h-[120px] lg:h-[160px] xl:h-[200px] 2xl:h-[240px]
      "
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <picture className="relative w-[30%] h-[25%]">
          <Image src={icon} alt="" fill />
        </picture>
        <span
          className="text-[#182A5B] whitespace-pre-wrap mt-[13%] truncate w-full
          text-[38%] sm:text-[76%] md:text-[114%] lg:text-[152%] xl:text-[190%] 2xl:text-[228%]
          "
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
      className="w-full flex justify-center items-center bg-[#CCD4E880] relative
    h-[20px] sm:h-[40px] md:h-[60px] lg:h-[80px] xl:h-[100px] 2xl:h-[120px]
    "
    >
      <span
        className="uppercase text-white relative
      text-[95.23816667%] sm:text-[190.4763333%] md:text-[285.7145%] lg:text-[380.9526667%] xl:text-[476.1908333%] 2xl:text-[571.429%]
      "
      >
        {logo ? <Image src={logo} alt="" fill /> : "logo"}
      </span>
    </div>
  );
};
