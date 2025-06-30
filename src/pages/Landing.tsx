import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const Landing = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center"
      style={{
        backgroundImage: 'url("/2.png")', // تأكد أن الصورة داخل مجلد public
      }}
    >
      {/* طبقة شفافية خفيفة أعلى الخلفية (احذفها لو كانت تظلم الصورة) */}
      <div className="absolute inset-0 bg-black/05 z-0" />

      {/* الزر */}
      <div className="relative z-10 mb-20">
        <ScrollReveal direction="up">
          <Link to="/home">
            <button className="relative px-10 py-4 rounded-full text-white text-xl font-semibold bg-gradient-to-br from-green-600 to-emerald-500 shadow-lg transition-all duration-300 ease-in-out group overflow-hidden hover:scale-105">
              <span className="relative z-10">دخول المنصة</span>

              {/* ⚡ وهج ضوء متفاعل */}
              <span className="absolute inset-0 bg-emerald-300 opacity-0 group-hover:opacity-10 blur-2xl transition duration-500 pointer-events-none" />
              <span className="absolute inset-0 border border-white/20 rounded-full group-hover:shadow-[0_0_40px_10px_rgba(52,211,153,0.4)] transition duration-500" />
            </button>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Landing;
