// components/FancyRedirect.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FancyRedirect = ({ to }: { to: string }) => {
  const [stage, setStage] = useState<"fade-out" | "loading">("fade-out");
  const navigate = useNavigate();

  useEffect(() => {
    const fadeTimer = setTimeout(() => setStage("loading"), 700); // 💨 fade-out لمدة 0.7s
    const navTimer = setTimeout(() => navigate(to), 3700); // 3 ثواني تحميل

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, to]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center bg-background text-foreground transition-opacity duration-700 ${
        stage === "fade-out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">جاري التحويل... انتظر لحظة</p>
      </div>
    </div>
  );
};

export default FancyRedirect;
