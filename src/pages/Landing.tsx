import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import BlobBackground from "@/components/BlobBackground";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 overflow-hidden text-center">
      <BlobBackground />

      <div className="relative z-10 max-w-2xl px-4">
        <ScrollReveal direction="zoom">
          {/* 🇩🇿 شعار الجزائر المتوهج */}
          <div className="mx-auto w-44 h-44 mb-6">
            <img
              src="/1.png"
              alt="شعار الجزائر"
              className="w-full h-full animate-pulse drop-shadow-lg"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800 mb-4">
            الجزائر بين يديك 🇩🇿
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            منصة شاملة تربطك بالمجتمع والخدمات بسهولة وأناقة
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <Link to="/home">
            <button className="px-8 py-3 rounded-full text-white font-medium text-lg bg-algeria-green-500 hover:bg-algeria-green-600 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400/50 group relative overflow-hidden">
              <span className="relative z-10">دخول المنصة</span>
              <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300" />
            </button>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Landing;
