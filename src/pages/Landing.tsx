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
      {/* طبقة شفافية خفيفة أعلى الخلفية */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* الزر */}
      <div className="relative z-10 mb-20">
        <ScrollReveal direction="up">
          <Link to="/home">
            <button className="relative px-8 py-3 rounded-full text-white font-medium text-lg bg-algeria-green-500 hover:bg-algeria-green-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 group overflow-hidden">
              <span className="relative z-10">دخول المنصة</span>

              {/* تأثير glow عند hover */}
              <span className="absolute inset-0 bg-green-300 opacity-0 group-hover:opacity-10 blur-xl transition duration-500 pointer-events-none" />
            </button>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Landing;
