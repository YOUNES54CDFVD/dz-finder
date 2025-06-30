import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AwesomeLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-emerald-200 overflow-hidden">

      {/* دوائر متوهجة */}
      <div className="absolute w-80 h-80 bg-green-300 rounded-full opacity-20 blur-3xl top-[-80px] left-[-80px] animate-ping" />
      <div className="absolute w-96 h-96 bg-emerald-400 rounded-full opacity-10 blur-2xl bottom-[-100px] right-[-100px] animate-pulse" />

      {/* شعار ينبض */}
      <div className="z-10 flex flex-col items-center gap-4">
        <img
          src="/logo.svg" // غيّر للمسار المناسب
          alt="شعار"
          className="w-32 h-32 animate-bounce drop-shadow-xl"
        />
        <p className="text-2xl font-bold text-green-800 animate-fadeIn">
          جاري تجهيز السحر ✨...
        </p>
      </div>
    </div>
  );
};

export default AwesomeLoader;
