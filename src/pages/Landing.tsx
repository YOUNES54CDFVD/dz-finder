import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const Landing = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-fixed bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: 'url("/00.png")', // تأكد أن الصورة داخل مجلد public
      }}
    >
      {/* طبقة شفافية علوية لتعديل التباين */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* المحتوى الأساسي */}
      <div className="relative z-10 max-w-3xl space-y-6">
        <ScrollReveal direction="down" delay={0.1}>
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            مرحباً بك 👋
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto leading-relaxed">
            منصة مجتمعية جزائرية مبتكرة تساعدك على الإبلاغ أو البحث عن الممتلكات المفقودة بسهولة وسرعة.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.5}>
          <Link to="/loading">
            <button className="relative px-8 py-4 rounded-full text-white text-lg font-semibold bg-gradient-to-br from-green-600 to-emerald-500 shadow-xl transition-all duration-300 ease-in-out group overflow-hidden hover:scale-105">
              <span className="relative z-10">🚀 دخول المنصة</span>

              {/* وهج بصري */}
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
