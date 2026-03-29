import {useNavigate} from "react-router-dom";

export const SessionHistory = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden w-full min-w-[1280px] min-h-[832px] relative">
      <img
        className="absolute top-0 left-0 w-[1300px] h-[832px]"
        alt="Rectangle"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/rectangle-4.svg"
      />

      <div className="absolute top-0 left-[0px] w-[1300px] h-[68px] bg-[#375cac]" />

      <nav className="absolute top-0 left-0 w-full h-[68px] flex items-center">
        <div className="absolute top-1 left-4 w-40 h-[60px]">
          <img
            className="absolute top-0 left-0 w-[60px] h-[60px]"
            alt="Mask group"
            src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/mask-group.png"
          />
          <div className="absolute top-[5px] left-[52px] [font-family:'Retro_Sugar_-_Demo_Version-Black',Helvetica] font-black text-white text-[32.8px] tracking-[0] leading-[normal]">
            ANCHOR
          </div>
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="absolute top-[19px] left-[688px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors"
        >
          Profile
        </div>

        <div
          onClick={() => navigate("/dashboard")}
          className="absolute top-[19px] left-[837px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors"
        >
          Dashboard
        </div>

        <div
          className="absolute top-[19px] left-[1039px] [font-family:'Inter',Helvetica] font-normal text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-default"
        >
          Session History
        </div>
      </nav>

      {/* Stat Cards */}
      <div className="absolute top-[122px] left-16 w-[364px] h-[117px] flex bg-white rounded-[20px]">
        <div className="mt-6 w-[179px] h-[69.32px] ml-[100px] flex flex-col gap-[6.3px]">
          <div className="w-[175px] h-[26px] [font-family:'Inter',Helvetica] font-normal text-[#375cac] text-[21.8px] tracking-[0] leading-[normal] whitespace-nowrap">
            Total Study Time
          </div>
          <div className="ml-0 w-[84px] h-[37px] [font-family:'Inter',Helvetica] font-bold text-[#375cac] text-[30.6px] tracking-[0] leading-[normal]">
            0 min
          </div>
        </div>
      </div>

      <div className="absolute top-[149px] left-[82px] w-[63px] h-[63px] bg-[#ebcfcf] rounded-[15px]" />
      <img
        className="absolute top-[163px] left-24 w-[35px] h-[35px]"
        alt="Clock"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/clock.svg"
      />

      <div className="absolute top-[122px] left-[462px] w-[364px] h-[117px] bg-white rounded-[20px]" />
      <div className="absolute top-[146px] left-[562px] w-[172px] h-[69px] flex flex-col gap-[6.3px]">
        <div className="w-[168px] h-[26px] [font-family:'Inter',Helvetica] font-normal text-[#375cac] text-[21.8px] tracking-[0] leading-[normal] whitespace-nowrap">
          Sessions Joined
        </div>
        <div className="ml-0 w-[22px] h-[37px] [font-family:'Inter',Helvetica] font-bold text-[#375cac] text-[30.6px] tracking-[0] leading-[normal]">
          0
        </div>
      </div>

      <div className="absolute top-[149px] left-[484px] w-[63px] h-[63px] bg-[#ecdec1] rounded-[15px]" />
      <img
        className="absolute top-[162px] left-[501px] w-[38px] h-[38px]"
        alt="Person"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/person-1.svg"
      />
      <img
        className="absolute top-[162px] left-[493px] w-[38px] h-[38px]"
        alt="Person"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/person.svg"
      />

      <div className="absolute top-[122px] left-[872px] w-[364px] h-[117px] flex bg-white rounded-[20px]">
        <div className="mt-6 w-[227px] h-[69.32px] ml-[100px] flex flex-col gap-[6.3px]">
          <div className="w-[223px] h-[26px] [font-family:'Inter',Helvetica] font-normal text-[#375cac] text-[21.8px] tracking-[0] leading-[normal] whitespace-nowrap">
            Longest Study Streak
          </div>
          <div className="ml-0 w-[100px] h-[37px] [font-family:'Inter',Helvetica] font-bold text-[#375cac] text-[30.6px] tracking-[0] leading-[normal]">
            0 days
          </div>
        </div>
      </div>

      <div className="absolute top-[149px] left-[895px] w-[63px] h-[63px] bg-[#ddf2dc] rounded-[15px]" />
      <img
        className="absolute top-[163px] left-[909px] w-[35px] h-[35px]"
        alt="Trending up"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/trending-up.svg"
      />

      {/* Productivity Trend Card */}
      <div className="absolute top-[271px] left-[58px] w-[1172px] h-[535px] bg-white rounded-[20px]" />

      <img
        className="absolute top-[299px] left-[97px] w-[41px] h-[41px]"
        alt="Trending up"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/trending-up-1.svg"
      />

      <div className="absolute top-[304px] left-[155px] w-[330px] [font-family:'Inter',Helvetica] font-semibold text-[#375cac] text-[26.9px] tracking-[0] leading-[normal] whitespace-nowrap">
        Productivity Trend
      </div>

      <img
        className="absolute top-[492px] left-[593px] w-[93px] h-[93px]"
        alt="Calendar"
        src="https://c.animaapp.com/mnc3x8srnjM5Oh/img/calendar.svg"
      />

      <p className="absolute top-[602px] left-[calc(50.00%_-_258px)] [font-family:'Inter',Helvetica] font-medium text-[#9f9f9f] text-[23px] tracking-[0] leading-[normal]">
        No study history yet. Set sail your first session!
      </p>
    </div>
  );
};
