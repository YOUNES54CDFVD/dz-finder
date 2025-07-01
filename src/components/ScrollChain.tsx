import { useEffect, useState } from "react";

const ScrollChain = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hasBounced, setHasBounced] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100 && !hasBounced) setHasBounced(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBounced]);

  const chainLength = Math.min(scrollY / 1.5, 200);
  const linkCount = Math.floor(chainLength / 24);

  return (
    <div
      className={`fixed top-0 right-4 z-50 flex flex-col items-center transition-all duration-300 ${
        scrollY > 20 ? "animate-swing" : ""
      }`}
      style={{ height: `${chainLength + 60}px` }}
    >
      {Array.from({ length: linkCount }).map((_, i) => (
        <img
          key={i}
          src="/images/chain-link.png"
          alt="سلسلة"
          className="h-6 w-6 opacity-60 select-none pointer-events-none"
          draggable={false}
        />
      ))}

      {scrollY > 100 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md mt-2 transition-transform hover:scale-110 ${
            hasBounced ? "animate-bounce-once" : ""
          }`}
          aria-label="العودة للأعلى"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-6 6h4v6h4v-6h4l-6-6z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollChain;
