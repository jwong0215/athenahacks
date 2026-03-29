import {useState} from "react";
import {useNavigate} from "react-router-dom";

const sessionData = [
  {
    id: 1,
    title: "studying for cs104!!!",
    tags: ["#cs", "#focus"],
    duration: "1 hr studying",
    participants: "2 studying",
    visibility: "public",
    icon: "https://c.animaapp.com/mnc2fqtrxRHYXu/img/mask-group.png",
  },
];

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Public", value: "public" },
  { label: "Friends-only", value: "friends" },
  { label: "Private", value: "private" },
];

export const Dashboard = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden w-full min-w-[1280px] h-[832px] relative">
      <img
        className="absolute top-0 left-0 w-[1300px] h-[832px]"
        alt="Rectangle"
        src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/rectangle-5.svg"
      />  

      {/* Navbar */}
      <div className="absolute top-0 left-[0px] w-[1300px] h-[68px] bg-[#375cac]" />

      <nav className="absolute top-0 left-0 w-full h-[68px] flex items-center">
        {/* Logo */}
        <div className="absolute top-1 left-4 w-40 h-[60px]">
          <img
            className="absolute top-0 left-0 w-[60px] h-[60px]"
            alt="Mask group"
            src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/mask-group-1.png"
          />
          <div className="absolute top-[5px] left-[52px] [font-family:'Retro_Sugar_-_Demo_Version-Black',Helvetica] font-black text-white text-[32.8px] tracking-[0] leading-[normal]">
            ANCHOR
          </div>
        </div>

        {/* Nav Links */}
        <div
          onClick={() => navigate("/profile")}
          className="absolute top-[19px] left-[688px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors"
        >
          Profile
        </div>
        <div className="absolute top-[19px] left-[837px] [font-family:'Inter',Helvetica] font-normal text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-default">
          Dashboard
        </div>
        <div
          onClick={() => navigate("/session-history")}
          className="absolute top-[19px] left-[1039px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors"
        >
          Session History
        </div>
      </nav>

      {/* Page Title */}
      <div className="absolute top-[106px] left-[46px] [font-family:'Inter',Helvetica] font-bold text-[#375cac] text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
        Study Sessions
      </div>

      <p className="absolute top-[166px] left-[46px] [font-family:'Inter',Helvetica] font-normal text-[#375cacb2] text-[24.2px] tracking-[0] leading-[normal] whitespace-nowrap">
        Enter the study current by joining a live session or creating your own.
      </p>

      {/* Create Session Button */}
      <button className="absolute top-[142px] left-[970px] w-[267px] h-[53px] cursor-pointer group">
        <div className="absolute top-0 left-0 w-[267px] h-[53px] bg-[#063261] group-hover:bg-[#375cac] rounded-[13.23px] transition-colors" />
        <div className="absolute top-[17px] left-[62px] w-[185px] [font-family:'Inter',Helvetica] font-normal text-white text-[21.2px] tracking-[0] leading-[21.2px] whitespace-nowrap">
          Create Session
        </div>
        <img
          className="absolute top-0.5 left-[35px] w-10 h-12"
          alt="Mask group"
          src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/mask-group-2.png"
        />
      </button>

      {/* Search Bar + Filter Buttons */}
      <div className="absolute top-[237px] left-[46px] flex items-center gap-[10px]">
        {/* Search input — width sized so right edge of Private aligns with right edge of Create Session (1237px from left) */}
        <div className="relative w-[714px] h-[63px]">
          <div className="absolute top-0 left-0 w-full h-full bg-white rounded-[15px]" />
          <input
            className="absolute top-0 left-0 w-full h-full bg-transparent rounded-[15px] pl-[30px] pr-[70px] [font-family:'Inter',Helvetica] font-normal text-[#929292] text-[21.2px] tracking-[0] leading-[21.2px] outline-none"
            type="text"
            placeholder="Search sessions..."
            aria-label="Search sessions"
          />
          <button
            className="absolute top-0 right-0 w-[63px] h-[63px] bg-[#063261] hover:bg-[#375cac] rounded-[15px] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Search"
          >
            <img
              className="w-[29px] h-[29px]"
              alt="Search"
              src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/search.svg"
            />
          </button>
        </div>

        {/* Filter buttons */}
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.value;
          const widthMap: Record<string, string> = {
            all: "w-[65px]",
            public: "w-[102px]",
            friends: "w-[163px]",
            private: "w-[107px]",
          };
          return (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`${widthMap[option.value]} h-[63px] rounded-[15px] [font-family:'Inter',Helvetica] font-normal text-[21.2px] tracking-[0] leading-[21.2px] whitespace-nowrap cursor-pointer flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-[#063262] text-white"
                  : "bg-white text-[#375cac] hover:bg-[#375cac] hover:text-white"
              }`}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Session Cards */}
      {sessionData.map((session) => (
        <article
          key={session.id}
          className="absolute top-[342px] left-[46px] w-[341px] h-[289px] bg-white rounded-[15px]"
        >
          {/* Visibility Badge */}
          <div className="absolute top-[21px] right-[24px] flex items-center gap-1">
            <img
              className="w-4 h-4"
              alt="Globe"
              src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/globe.svg"
            />
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#8d8d8d] text-[13px] tracking-[0] leading-[13px] whitespace-nowrap">
              {session.visibility}
            </span>
          </div>

          {/* Session Icon */}
          <div className="absolute top-[21px] left-[22px] w-[63px] h-[63px] bg-[#d9e1f4] rounded-[15px]">
            <img
              className="absolute top-0 left-0 w-[60px] h-[60px]"
              alt="Mask group"
              src={session.icon}
            />
          </div>

          {/* Session Title */}
          <div className="absolute top-[101px] left-[22px] [font-family:'Inter',Helvetica] font-bold text-[#375cac] text-[18.1px] tracking-[0] leading-[18.1px] whitespace-nowrap">
            {session.title}
          </div>

          {/* Tags */}
          <div className="absolute top-[145px] left-[22px] flex gap-[8px]">
            {session.tags.map((tag) => (
              <div key={tag} className="h-[30px] flex items-center">
                <div className="bg-[#d9d9d9] rounded-[10px] px-2.5 h-[30px] flex items-center">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#8d8d8d] text-[13px] tracking-[0] leading-[13px] whitespace-nowrap">
                    {tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Duration */}
          <div className="absolute top-[215px] left-[22px] flex items-center gap-[7px]">
            <img
              className="w-6 h-6"
              alt="Clock"
              src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/clock.svg"
            />
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#8d8d8d] text-[13px] tracking-[0] leading-[13px] whitespace-nowrap">
              {session.duration}
            </span>
          </div>

          {/* Participants */}
          <div className="absolute top-[245px] left-[22px] flex items-center gap-[7px]">
            <div className="relative w-[26px] h-[26px]">
              <img
                className="absolute top-0 left-[5px] w-[26px] h-[26px]"
                alt="Person"
                src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/person.svg"
              />
              <img
                className="absolute top-0 left-0 w-[26px] h-[26px]"
                alt="Person"
                src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/person-1.svg"
              />
            </div>
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#8d8d8d] text-[13px] tracking-[0] leading-[13px] whitespace-nowrap">
              {session.participants}
            </span>
          </div>

          {/* Join Button — navigates to the Session screen */}
          <button
            onClick={() => navigate("/session")}
            className="absolute top-[248px] left-[268px] [font-family:'Inter',Helvetica] font-medium text-[#375cac] text-[15.4px] tracking-[0] leading-[15.4px] whitespace-nowrap cursor-pointer hover:text-[#063261] transition-colors"
          >
            Join →
          </button>
        </article>
      ))}

      <img
        className="absolute w-0 h-0 top-[71.60%] left-[27.28%]"
        alt="Icon"
        src="https://c.animaapp.com/mnc2fqtrxRHYXu/img/icon.svg"
      />
    </div>
  );
};
