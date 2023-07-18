import Image from "next/image";

const landingPage = () => {
  return (
    <div className="landing-page w-screen h-fit flex flex-col whitespace-pre font-['NotoSans']">
      <div className="w-full min-w-fit max-h-[68rem] h-screen relative">
        <picture className="w-full h-full flex absolute top-0 z-0">
          <Image src={`/images/landing/landing.jpg`} fill style={{ objectFit: "cover" }} alt="" />
        </picture>
        <div className="flex w-full h-full bg-opacity-50 bg-black z-30 absolute top-0">
          <div className="text-white flex flex-col w-full h-full mt-[18.98148148148148vh] ml-[12.5vw]">
            <span
              className="uppercase font-['RobotoB'] tracking-[1.6px]
              text-[100%] sm:text-[200%] md:text-[300%] lg:text-[400%] xl:text-[500%] 2xl:text-[600%] 
              mb-[0.5%] sm:mb-[1%] md:mb-[1.5%] lg:mb-[2%] xl:mb-[2.5%] 2xl:mb-[3.125%] 
            "
            >
              portal
            </span>
            <span
              className="whitespace-pre 
            text-[64%] sm:text-[128%] md:text-[192%] lg:text-[256%] xl:text-[320%] 2xl:text-[388.572%]
            mb-[0.868%] sm:mb-[1.736%] md:mb-[2.604%] lg:mb-[3.472%] xl:mb-[4.34%] 2xl:mb-[5.209%]
            "
            >
              {`로봇팔을 이용하여 더 다양하고,\n정교한 작업을 대신해보세요.\n로봇팔 업계 1위 업체,\n포탈에서 경험해보세요.`}
            </span>
            <button className="relative w-[31.25vw] h-[8.273vh] bg-black bg-opacity-50 mb-[7.48858vh]">
              <span className="text-[1.5625vw]">로그인/서비스 이용하기</span>
              <span className="w-[2.604166666666667vw] h-[4.62962962962963vh] flex absolute top-[1.851851851851852vh] right-[2.083333333333333vw]">
                <Image src={`/images/landing/chevron-right.svg`} alt="" fill />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[68rem] flex flex-col justify-center items-center px-[130px]">
        <span className="text-[50px] text-[#252525] leading-[68px] self-start ml-[60px] mb-[110px]">{`포탈의 로봇팔은 무엇이 다른가요?`}</span>
        <div className="flex w-full gap-[100px]">
          <div className="flex flex-col relative pl-[76px]">
            <span className="text-[40px] text-[#909090] leading-[46.88px] z-10 mb-[90px] font-['Roboto']">{`3D telepresence`}</span>
            <span className="text-[40px] text-[#182A5B] leading-[46.88px] z-10 mb-[30px] font-['Roboto']">{`Remote control robot`}</span>
            <span className="text-[34px] text-[#252525] leading-[46.31px] whitespace-pre z-10 mb-[90px]">
              {`초저지연 통신을 통해 사용자의\n모션에 위하감 없이 동기화됩니다.\n위험하거나 멀리 있는 현장의\n노동자를 대체합니다.`}
            </span>
            <div className="w-[120px] h-[120px] bg-[#CCD4E8] z-0 absolute left-[52px] top-[130px]" />
          </div>
          <picture className="relative min-w-[992px] h-[558px]">
            <Image src={`/images/landing/robot-1.svg`} fill alt="" />
          </picture>
        </div>
      </div>
      <div className="w-full min-w-fit h-[68rem] bg-[#F3F3F3] flex flex-col gap-[100px] justify-center px-[130px]">
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
        <div className="flex gap-[92px] font-['Roboto']">
          {[
            "factory.svg",
            "smart-farm.svg",
            "teleoperation.svg",
            "streaming.svg",
            "education.svg",
            "ai.svg",
          ].map((item, index) => {
            return <IconsComponent icon={`/images/landing/${item}`} title={`Factory`} />;
          })}
        </div>
      </div>
      <div className="w-full h-[68rem] pt-[170px]">
        <div className="flex flex-col gap-[44px] px-[148px]">
          <picture className="relative w-[300px] h-[74px] flex">
            <Image src={`/images/landing/logo.svg`} alt="" fill />
          </picture>
          <span className="whitespace-pre text-[50px] text-[#161616] leading-[68.1px] ml-[30px]">
            {`스타트업에서 부터 대기업까지\n포탈을 믿고 맡겨주신 소중한 파트너사`}
          </span>
        </div>
        <div className="mt-[158px] grid grid-cols-[480px_480px_480px_480px] gap-[60px] overflow-scroll scrollbar-hide">
          {[1, 2, 3, 4, 5, 6].map((item, index) => {
            return <LogosComponent logo={``} />;
          })}
        </div>
      </div>
      <div className="w-full min-w-fit h-[24rem] bg-[#F3F3F3] flex flex-col justify-center items-center font-['Inter']">
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
export default landingPage;
const IconsComponent = ({ icon, title }) => {
  return (
    <button className="min-w-[200px] h-[240px] flex flex-col justify-center items-center bg-white gap-[26px] select-none">
      <picture className="relative w-[60px] h-[60px]">
        <Image src={icon} alt="" fill />
      </picture>
      <span className="text-xl text-[#182A5B]">{title}</span>
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
