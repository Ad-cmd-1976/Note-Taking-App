import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md">
      <Loader className="animate-spin text-gray-600 size-7" />
    </div>
  );
};

export default LoadingSpinner;
