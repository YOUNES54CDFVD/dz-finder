import { useEffect, useState } from "react";

const ScrollChain = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const chainLength = Math.min(scrollY / 2, 150); // الحد الأقصى للطول

  return (
    <div
      className="fixed top-0 right-4 z-50 flex flex-col items-center transition-all duration-300"
      style={{ height: `${chainLength + 40}px` }}
    >
      <div className="w-px bg-gray-400" style={{ flexGrow: 1 }} />
      {scrollY > 100 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md mt-1"
          aria-label="العودة للأعلى"
        >
          ⬆️
        </button>
      )}
    </div>
  );
};

export default ScrollChain;
