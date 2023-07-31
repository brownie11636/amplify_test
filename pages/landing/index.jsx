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
      {/* <div className="flex w-full h-full max-h-[1080px] relative">
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
      </div> */}
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
                  className="w-[26.822835173677858%] bg-[#CCD4E8] z-0 absolute -left-[24px] -top-[18px]
                  h-[42.66211604%] sm:h-[85.32423208%] md:h-[127.9863481%] lg:h-[170.6484642%] xl:h-[213.3105802%] 2xl:h-[255.9726962%]
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
      <div className="w-flex w-full h-full max-h-[1080px] bg-[#F3F3F3] flex flex-col gap-[100px] justify-center px-[130px]">
        <div className="flex gap-[76px]">
          <picture className="min-w-[800px] h-[450px] relative">
            <Image src={`/images/landing/robot-2.svg`} fill alt="" />
          </picture>
          <div className="flex flex-col">
            <span className="text-[50px] text-[#252525] mb-[50px]">{`로봇팔을 활용한 다양한 서비스`}</span>
            <span className="text-[40px] text-[#182A5B] mb-[34px] font-['Roboto']">{`SMART FARM`}</span>
            <span className="whitespace-pre text-[36px] text-[#252525] leading-[49.03px] mb-[83px]">
              {`인구 감소와 고령화 문제로 인한 일손이 부족한\n농촌에서는 팜봇을 활용하여 씨를 심거나\n모를 심는 작업 등 사람이 하던 작업을\n빠르고 정확한 작업을 수행해냅니다.`}
            </span>
            <div className="w-full h-[1px] bg-[#CBCBCB]"></div>
          </div>
        </div>
        <div
          className="flex gap-[92px] font-['Roboto'] transition-all duration-300"
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
              <div key={item.title}>
                <IconsComponent icon={`/images/landing/${item.filename}`} title={item.title} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-[68rem] pt-[170px] bg-white">
        <div className="flex flex-col gap-[44px] px-[148px]">
          <picture className="relative w-[300px] h-[74px] flex">
            <Image src={`/images/landing/logo.svg`} alt="" fill />
          </picture>
          <span className="whitespace-pre text-[50px] text-[#161616] leading-[68.1px] ml-[30px]">
            {`스타트업에서 부터 대기업까지\n포탈을 믿고 맡겨주신 소중한 파트너사`}
          </span>
        </div>
        <div className="mt-[158px] w-full grid grid-cols-[480px_480px_480px_480px] gap-[60px] overflow-scroll scrollbar-hide">
          {[1, 2, 3, 4, 5, 6].map((item, index) => {
            return (
              <div key={item}>
                <LogosComponent logo={``} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-[24rem] bg-[#F3F3F3] flex flex-col justify-center items-center font-['Inter']">
        <picture className="relative w-[300px] h-[74px] flex">
          <Image src={`/images/landing/logo.svg`} alt="" fill />
        </picture>
        <div className="mt-[60px]">
          <div className="flex gap-[50px] text-[#7D7D7D] items-center">
            <span className="text-[24px]">포탈301</span>
            <span className="text-[16px]">사업자등록번호 : 353-87-02451</span>
            <div className="w-[1px] h-[13px] bg-[#D9D9D9]" />
            <span className="text-[16px]">박장준</span>
            <div className="w-[1px] h-[13px] bg-[#D9D9D9]" />
            <span className="text-[16px]">070-4776-7002</span>
            <div className="w-[1px] h-[13px] bg-[#D9D9D9]" />
            <span className="text-[16px]">jangjun_park@portal301.com</span>
          </div>
        </div>
        <span className="text-[16px] text-[#7D7D7D] mt-[60px]">
          ⓒ 2023 Portal301 Co.,Ltd. check All rights Reserved.
        </span>
      </div>
    </div>
  );
};
export default LandingPage;

const IconsComponent = ({ icon, title }) => {
  return (
    <button className="min-w-[200px] h-[240px] flex flex-col justify-center items-center bg-white gap-[26px] select-none">
      <picture className="relative w-[60px] h-[60px]">
        <Image src={icon} alt="" fill />
      </picture>
      <span className="text-xl text-[#182A5B] whitespace-pre-wrap">{title}</span>
    </button>
  );
};
const LogosComponent = ({ logo }) => {
  return (
    <div className="min-w-[480px] h-[120px] flex justify-center items-center bg-[#CCD4E880] relative">
      <span className="uppercase text-white text-[50px] relative">
        {logo ? <Image src={logo} alt="" fill /> : "logo"}
      </span>
    </div>
  );
};
