import { IoRocketOutline } from "react-icons/io5";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-slate-950">
      <div className="animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#4b7bec] to-[#231652] p-3 animate-pulse">
          <IoRocketOutline className="w-full h-full text-white" />
        </div>
      </div>
    </div>
  );
};

export default loading;
