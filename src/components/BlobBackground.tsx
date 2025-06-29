const BlobBackground = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-green-400 via-emerald-500 to-lime-400 opacity-20 blur-[120px] animate-pulse" />
    </div>
  );
};

export default BlobBackground;

