import {useState} from "react";
import {useNavigate} from "react-router-dom";

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPassword = (value: string): boolean => value.length >= 6;

export const LogInPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  return (
    <div
      className="bg-white w-full min-w-[1280px] min-h-[832px] relative"
      data-model-id="11:4"
    >
      <img
        className="left-0 w-[1280px] h-[832px] absolute top-0"
        alt="Rectangle"
        src="https://c.animaapp.com/yXmvUUBv/img/rectangle-4.svg"
      />

      <div className="left-0 w-[306px] h-[832px] bg-[#375cac] absolute top-0" />

      <div className="absolute top-[232px] left-[119px] [font-family:'Jaldi',Helvetica] font-normal text-white text-[32.2px] tracking-[0] leading-[normal]">
        Login
      </div>

      <form onSubmit={handleSubmit}>
        <div className="absolute top-[309px] left-[37px] w-[234px] h-[35px]">
          <label
            htmlFor="email"
            className="absolute top-0 left-0 [font-family:'Jaldi',Helvetica] font-normal text-[#ffffffb2] text-xl tracking-[0] leading-[normal] cursor-text"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="absolute top-0 left-0 w-[232px] h-[33px] bg-transparent [font-family:'Jaldi',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal] outline-none border-0 focus:outline-none"
            aria-label="Email"
          />
          <img
            className="absolute top-[33px] left-0 w-[232px] h-0.5"
            alt="Line"
            src="https://c.animaapp.com/yXmvUUBv/img/line-1-1.svg"
          />
        </div>

        <div className="absolute top-[367px] left-[37px] w-[234px] h-[35px]">
          <label
            htmlFor="password"
            className="absolute top-0 left-0 [font-family:'Jaldi',Helvetica] font-normal text-[#ffffffb2] text-xl tracking-[0] leading-[normal] cursor-text"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="absolute top-0 left-0 w-[232px] h-[33px] bg-transparent [font-family:'Jaldi',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal] outline-none border-0 focus:outline-none"
            aria-label="Password"
          />
          <img
            className="absolute top-[33px] left-0 w-[232px] h-0.5"
            alt="Line"
            src="https://c.animaapp.com/yXmvUUBv/img/line-1-1.svg"
          />
        </div>

        {error && (
          <p className="absolute top-[425px] left-[37px] [font-family:'Inter',Helvetica] font-normal text-red-300 text-[13px] tracking-[0] leading-[normal] whitespace-nowrap z-10">
            {error}
          </p>
        )}

        <div className="absolute top-[439px] left-[50px] w-[204px] h-10">
          <button
            type="submit"
            className="left-[50px] w-[100px] h-10 bg-[#063261] rounded-[10px] absolute top-0 cursor-pointer hover:bg-[#0a4a8f] transition-colors"
            aria-label="Login"
          />
          <span className="absolute top-[11px] left-[81px] [font-family:'Inter',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none">
            Login
          </span>
        </div>
      </form>

      <p className="absolute top-[544px] left-[42px] [font-family:'Inter',Helvetica] font-normal text-transparent text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
        <span className="text-white">Don&apos;t have an account? </span>
        <a href="#" className="text-[#8db9e9] hover:underline cursor-pointer">
          Sign up
        </a>
      </p>

      <div className="absolute top-[102px] left-4 w-[258px] h-[97px]">
        <img
          className="absolute top-0 left-0 w-[97px] h-[97px]"
          alt="Mask group"
          src="https://c.animaapp.com/yXmvUUBv/img/mask-group@2x.png"
        />
        <div className="absolute top-[9px] left-[84px] [font-family:'Retro_Sugar_-_Demo_Version-Black',Helvetica] font-black text-white text-[53.2px] tracking-[0] leading-[normal]">
          ANCHOR
        </div>
      </div>

      {/* WAVES — ANIMATE THESE 4 FOR WAVE MOTION */}

      {/* WAVE — Vector 4 | src: vector-4.svg | bottom-most wave layer, full width, top-[595px] */}
      <img
        className="absolute top-[595px] left-0 w-[1280px] h-[237px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-4.svg"
      />

      {/* WAVE — Vector 3 | src: vector-3.svg | second wave layer, offset left-[132px], top-[605px] */}
      <img
        className="absolute top-[605px] left-[132px] w-[1148px] h-[227px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-3.svg"
      />

      {/* WAVE — Vector 1 | src: vector-1.svg | third wave layer, full width, top-[609px] */}
      <img
        className="absolute top-[609px] left-0 w-[1280px] h-[223px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-1.svg"
      />

      {/* WAVE — Vector 2 | src: vector-2.svg | top/front wave layer, full width, top-[684px] */}
      <img
        className="absolute top-[684px] left-0 w-[1280px] h-[148px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-2.svg"
      />

      {/* CLOUDS — ANIMATE THESE 2 FOR CLOUD DRIFT */}

      {/* CLOUD 1 | src: vector-6.svg | top-right area, top-[82px] left-[912px] */}
      <img
        className="absolute top-[82px] left-[912px] w-[308px] h-[87px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-6.svg"
      />

      {/* CLOUD 2 | src: vector-6.svg | mid-page, top-[324px] left-[388px] */}
      <img
        className="absolute top-[324px] left-[388px] w-[308px] h-[87px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-6.svg"
      />

      {/* SMALL ACCENTS — ANIMATE THESE 2 ALONGSIDE CLOUDS IF DESIRED */}

      {/* VECTOR 5 | src: vector-7.svg | small cloud accent, top-[184px] left-[650px] */}
      <img
        className="absolute top-[184px] left-[650px] w-[95px] h-[31px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-7.svg"
      />

      {/* VECTOR 6 | src: vector-8.svg | small cloud accent, top-[210px] left-[700px] */}
      <img
        className="absolute top-[210px] left-[700px] w-[95px] h-[31px]"
        alt="Vector"
        src="https://c.animaapp.com/yXmvUUBv/img/vector-8.svg"
      />
    </div>
  );
};
