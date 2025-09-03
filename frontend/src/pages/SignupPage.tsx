import useAuthStore from "../store/useAuthStore";
import { Calendar } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import wallpaper from '../assets/asset-image.jpg';

export default function Signup() {
  const { name, email, dob, otp, setname, setemail, setdob, setotp }=useAuthStore();

  const { getSignupOtp, otpSent, signup, isLoading }=useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) getSignupOtp({ name , email, dob, otp });
     else {
      signup({ name, email, dob, otp});
    }
  };
  if(isLoading) return (<LoadingSpinner/>)
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8">
          <div className="flex md:justify-between justify-center pl-3">
            <div className="flex gap-2 mb-6 items-center md:m-0 mr-6">
              <Logo/>
              <span className="font-semibold text-lg">HD</span>
            </div>
          </div>

          <div className="flex justify-center items-center md:h-full pb-20">
            <div className="flex flex-col w-full md:w-[60%]">
              <h2 className="md:text-2xl font-bold mb-2 md:text-left text-center w-full text-4xl">Sign up</h2>
              <p className="text-gray-500 mb-6 md:text-sm text-xl text-center md:text-left">
                Sign up to enjoy the feature of HD
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                    <FormField
                    id="name"
                    content="Name"
                    value={name}
                    onChange={(e)=>setname(e.target.value)}
                    type="text"
                    placeholder=""
                    />

                    <div className="relative w-full">
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 pointer-events-none"
                      />

                      <input
                        type="text"
                        name="dob"
                        value={dob}
                        onChange={(e)=>setdob(e.target.value)}
                        className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      />
                    </div>

                    <FormField
                    id="email"
                    content="Email"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    type="text"
                    placeholder=""
                    />

                {otpSent && (
                  <div>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e)=>setotp(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  onSubmit={()=>handleSubmit}
                >
                  {otpSent ? "Sign up" : "Get OTP"}
                </button>
              </form>

              <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account??{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </p>

            </div>
          </div>
        </div>

        <div className="hidden md:block w-7/12 h-full p-1">
        <img
          src={wallpaper}
          alt="Windows 11 Bloom wallpaper (light)"
          className="w-full h-full object-cover rounded-3xl"
          loading="lazy"
        />
        </div>
      </div>
    </div>
  );
}
