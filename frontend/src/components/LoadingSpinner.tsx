import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="text-black bg-white flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-6"/>
    </div>
  )
}

export default LoadingSpinner