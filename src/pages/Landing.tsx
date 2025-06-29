import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

// لا حاجة لـ BlobBackground هنا لأن الصورة صارت الخلفية الكاملة

const Landing = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("/1.png")',
      }}
    >
      {/* طبقة تعتيم خفيفة (اختياري لتمييز الزر) */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-10 text-center">
        <ScrollReveal direction="up">
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
