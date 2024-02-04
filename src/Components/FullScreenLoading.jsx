import Loading from "./Loading";

function FullScreenLoading({ children, isLoading }) {
  return (
    <div className={`relative ${isLoading ? "overflow-hidden" : ""}`}>
      <div
        className={`w-full z-50 h-[2000px] bg-white/80 ${
          isLoading ? "absolute" : "hidden"
        }`}
      >
        <Loading />
      </div>
      {children}
    </div>
  );
}

export default FullScreenLoading;
