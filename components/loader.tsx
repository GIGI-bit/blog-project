import Lottie from "lottie-react";
import animationData from "@/images/LottieFiles/Animation - 1746213403846.json";

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-64 h-64">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default CustomLoader;
