const Loader = ({ message = "Loading residences..." }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer subtle ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#E4E1D9]" />
        {/* Spinning terracotta accent ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#B87556] animate-spin" />
        {/* Centered forest teal dot */}
        <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#173D3B]" />
      </div>
      <p className="text-xs uppercase tracking-widest font-semibold text-[#173D3B]">
        {message}
      </p>
    </div>
  );
};

export default Loader;