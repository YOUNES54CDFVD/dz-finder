
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-algeria-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">ل</span>
              </div>
              <span className="text-xl font-bold">L9itha DZ</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              منصة مجانية تهدف إلى مساعدة الأشخاص في الجزائر على استرجاع أشيائهم المفقودة
              والإبلاغ عن الأشياء الموجودة لإعادتها إلى أصحابها.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988zM12.017 7.129c1.297 0 2.348 1.051 2.348 2.348c0 1.297-1.051 2.348-2.348 2.348c-1.297 0-2.348-1.051-2.348-2.348C9.669 8.18 10.72 7.129 12.017 7.129z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link to="/listings" className="text-gray-300 hover:text-white transition-colors">الإعلانات</Link></li>
              <li><Link to="/submit" className="text-gray-300 hover:text-white transition-colors">أضف إعلان</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">من نحن</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-gray-300">
              <li>واتساب: +213672105646</li>
              <li>البريد: info@l9itha-dz.com</li>
              <li>الجزائر</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 L9itha DZ. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
