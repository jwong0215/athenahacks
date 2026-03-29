import {JSX} from "react";
import {useNavigate} from "react-router-dom";

const profileTags = {
  university: [
    {
      label: "University of Southern California",
      bg: "#dd2e2e",
      text: "#ebcfcf",
    },
  ],
  major: [
    {
      label: "Computer Engineering and Computer Science",
      bg: "#d9d9d9",
      text: "#8d8d8d",
    },
  ],
  subjects: [
    { label: "Computer Science", bg: "#d9d9d9", text: "#8d8d8d" },
    { label: "Physics", bg: "#73b771", text: "#d5ecd4" },
  ],
  studyStyles: [{ label: "Pomodoro Timer", bg: "#894f87", text: "#e2cbee" }],
};

const profileRows = [
  { label: "University:", tags: profileTags.university },
  { label: "Major:", tags: profileTags.major },
  { label: "Subjects Currently Studying:", tags: profileTags.subjects },
  { label: "Preferred Study Styles:", tags: profileTags.studyStyles },
];

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden w-full min-w-[1280px] min-h-[832px] relative">
      <img
        className="absolute top-0 left-0 w-[1300px] h-[832px]"
        alt="Rectangle"
        src="https://c.animaapp.com/mnc4oq63uODbTP/img/rectangle-4.svg"
      />

      {/* Navigation Bar */}
      <div className="absolute top-0 left-[0px] w-[1300px] h-[68px] bg-[#375cac]" />

      {/* Logo */}
      <div className="absolute top-1 left-4 w-40 h-[60px]">
        <img
          className="absolute top-0 left-0 w-[60px] h-[60px]"
          alt="Mask group"
          src="https://c.animaapp.com/mnc4oq63uODbTP/img/mask-group-2.png"
        />
        <div className="absolute top-[5px] left-[52px] [font-family:'Retro_Sugar_-_Demo_Version-Black',Helvetica] font-black text-white text-[32.8px] tracking-[0] leading-[normal]">
          ANCHOR
        </div>
      </div>

      {/* Nav — Profile (active) */}
      <div className="absolute top-[19px] left-[688px] [font-family:'Inter',Helvetica] font-normal text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-default">
        Profile
      </div>

      {/* Nav — Dashboard */}
      <div
        onClick={() => navigate("/dashboard")}
        className="absolute top-[19px] left-[837px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors"
      >
        Dashboard
      </div>

      {/* Nav — Session History */}
      <div
        onClick={() => navigate("/session-history")}
        className="absolute top-[19px] left-[1039px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors"
      >
        Session History
      </div>

      {/* Profile Card Background */}
      <div className="absolute top-[168px] left-[167px] w-[1027px] h-[233px] bg-white rounded-[15px]" />
      <div className="absolute top-[277px] left-[167px] w-[1027px] h-[139px] bg-[#a2baee] rounded-[0px_0px_15px_15px]" />

      {/* Profile Avatar */}
      <img
        className="absolute top-48 left-[68px] w-[197px] h-[197px]"
        alt="Mask group"
        src="https://c.animaapp.com/mnc4oq63uODbTP/img/mask-group.png"
      />

      {/* Profile Name */}
      <div className="absolute top-48 left-80 [font-family:'Inter',Helvetica] font-medium text-[#063261] text-[50px] tracking-[0] leading-[normal]">
        Janessa Techathamawong
      </div>

      {/* Email and Location */}
      <p className="absolute top-[310px] left-80 [font-family:'Inter',Helvetica] font-normal text-transparent text-3xl tracking-[0] leading-[normal]">
        <span className="font-medium text-white">Email:</span>
        <span className="font-light text-white">
          {" "}
          techatha@usc.edu
          <br />
        </span>
        <span className="font-medium text-white">Location:</span>
        <span className="font-light text-white"> Los Angeles, CA</span>
      </p>

      {/* Profile Info Card */}
      <div className="absolute top-[445px] left-[38px] w-[688px] h-[300px] bg-white rounded-[15px]" />

      {/* Profile Section Title */}
      <div className="top-[486px] left-[121px] font-medium text-[#063261] text-[38.1px] absolute [font-family:'Inter',Helvetica] tracking-[0] leading-[normal]">
        Profile
      </div>

      {/* Profile Section Underline */}
      <img
        className="absolute top-[547px] left-[121px] w-20 h-[3px]"
        alt="Line"
        src="https://c.animaapp.com/mnc4oq63uODbTP/img/line-3.svg"
      />

      {/* Profile Rows */}
      {profileRows.map((row, index) => {
        const topPositions = [573, 608, 643, 678];
        const top = topPositions[index];

        return (
          <div key={row.label}>
            <div
              className="absolute [font-family:'Inter',Helvetica] font-normal text-[#063261] text-[23px] tracking-[0] leading-[normal]"
              style={{ top: `${top}px`, left: "121px" }}
            >
              {row.label}
            </div>

            {row.tags.map((tag, tagIndex) => {
              const tagLeftOffsets: Record<string, number[]> = {
                "University:": [249],
                "Major:": [196],
                "Subjects Currently Studying:": [442, 582],
                "Preferred Study Styles:": [382],
              };
              const leftPositions = tagLeftOffsets[row.label] || [249];
              const left = leftPositions[tagIndex] ?? leftPositions[0];

              const tagWidths: Record<string, number[]> = {
                "University:": [223],
                "Major:": [304],
                "Subjects Currently Studying:": [136, 70],
                "Preferred Study Styles:": [122],
              };
              const widths = tagWidths[row.label] || [120];
              const width = widths[tagIndex] ?? widths[0];

              return (
                <div
                  key={tag.label}
                  className="absolute h-[30px]"
                  style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 h-[30px] rounded-[10px]"
                    style={{ width: `${width - 2}px`, backgroundColor: tag.bg }}
                  />
                  <div
                    className="absolute top-2 left-2.5 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[13px] whitespace-nowrap"
                    style={{ color: tag.text }}
                  >
                    {tag.label}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Bio Card */}
      <div className="absolute top-[447px] left-[794px] w-[400px] h-[300px] bg-white rounded-[15px]" />

      {/* Bio Title */}
      <div className="absolute top-[486px] left-[965px] [font-family:'Inter',Helvetica] font-medium text-[#063261] text-[38.1px] tracking-[0] leading-[normal]">
        Bio
      </div>

      {/* Bio Text */}
      <p className="absolute top-[548px] left-[816px] w-[355px] [font-family:'Inter',Helvetica] font-normal text-[#063261] text-[21.1px] tracking-[0] leading-[normal]">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </p>

      {/* Edit Button Circle */}
      <div className="absolute top-[143px] left-[1164px] w-[60px] h-[60px] bg-[#a2baee] rounded-[30px]" />

      {/* Edit Icon */}
      <img
        className="absolute top-[150px] left-[1172px] w-[46px] h-[45px]"
        alt="Mask group"
        src="https://c.animaapp.com/mnc4oq63uODbTP/img/mask-group-1.png"
      />
    </div>
  );
};
