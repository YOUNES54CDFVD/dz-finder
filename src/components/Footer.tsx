import AnimatedLinkButton from "@/components/AnimatedLinkButton"; // ✅ الزر الذكي
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ✅ Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">ل</span>
              </div>
              <span className="text-xl font-bold text-primary">L9itha DZ</span>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              منصة مجانية تهدف إلى مساعدة الأشخاص في الجزائر على استرجاع أشيائهم المفقودة
              والإبلاغ عن الأشياء الموجودة لإعادتها إلى أصحابها.
            </p>

            <div className="flex space-x-4 space-x-reverse">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.516c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zM12.017 7.129c1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ✅ Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { label: "الرئيسية", to: "/" },
                { label: "الإعلانات", to: "/listings" },
                { label: "أضف إعلان", to: "/submit" },
                { label: "من نحن", to: "/about" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <AnimatedLinkButton
                    to={to}
                    variant="link"
                    className="text-muted-foreground hover:text-accent p-0 h-auto text-base"
                  >
                    {label}
                  </AnimatedLinkButton>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                واتساب:{" "}
                <a
                  href="https://wa.me/213563263186"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  +213563263186
                </a>
              </li>
              <li>
                البريد:{" "}
                <a
                  href="mailto:l9itha.dz@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  l9itha.dz@gmail.com
                </a>
              </li>
              <li>الجزائر</li>
            </ul>
          </div>
        </div>

        {/* ✅ Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 L9itha DZ. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
