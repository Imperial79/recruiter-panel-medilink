import CircularProgressIndicator from "./CircularProgressIndicator";

function Scaffold({ isLoading, children }) {
  return (
    <div className="relative">
      <div
        className={`h-screen w-full bg-white/80 flex justify-center items-center fixed pointer-events-none transition-all duration-200 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <CircularProgressIndicator />
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default Scaffold;
