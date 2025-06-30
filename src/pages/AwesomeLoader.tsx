import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AwesomeLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-emerald-200 via-white to-green-100 overflow-hidden">

      {/* بلوبات تتوهج */}
      <div className="absolute w-96 h-96 bg-green-300 opacity-20 blur-3xl top-[-80px] left-[-80px] rounded-full animate-ping" />
      <div className="absolute w-80 h-80 bg-emerald-400 opacity-15 blur-2xl bottom-[-100px] right-[-100px] rounded-full animate-pulse" />

      {/* خطوط خفيفة تدور */}
      <div className="absolute w-[120%] h-[120%] rounded-full border-[1px] border-white/10 animate-spin-slow" />

      {/* محتوى مركزي */}
      <div className="z-10 flex flex-col items-center gap-6">
        <img
          src="/logo.svg"
          alt="شعار المنصة"
          className="w-24 h-24 animate-pulse drop-shadow-2xl"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 tracking-wide animate-fadeIn">
          لحظات وتبدأ رحلتك ✨
        </h1>
        <p className="text-lg text-green-600 animate-fadeIn delay-200">
          المنصة تُحضّر لك الأفضل...
        </p>
      </div>
    </div>
  );
};

export default AwesomeLoader;
