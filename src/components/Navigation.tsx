import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/home", label: "الرئيسية" },
    { path: "/listings", label: "الإعلانات" },
    { path: "/submit", label: "أضف إعلان" },
    { path: "/about", label: "من نحن" },
    { path: "/testimonials", label: "التقييمات" },
    { path: "/contact", label: "اتصل بنا" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ل</span>
            </div>
            <span className="text-xl font-bold text-primary">L9itha DZ</span>
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex space-x-6 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

                    {/* ✅ Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
