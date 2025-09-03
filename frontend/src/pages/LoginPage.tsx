import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const { getLoginOtp, otpSent, login  }=useAuthStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) getLoginOtp(formData);
     else login(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-between pl-3">
            <div className="flex gap-2 mb-6 items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
              <span className="font-semibold text-lg">HD</span>
            </div>
          </div>

          <div className="flex justify-center items-center h-full pb-20">
            <div className="flex flex-col w-[60%]">
              <h2 className="text-2xl font-bold mb-2">Sign In</h2>
              <p className="text-gray-500 mb-6 text-sm">
               Please login to continue to your account
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {otpSent && (
                  <>
                  <div>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div 
                  className="text-[#367AFF] underline underline-offset-1 cursor-pointer"
                  onClick={()=>getLoginOtp(formData)}
                  >
                      Resend OTP 
                  </div>
                </>
                )}


                <div className="flex items-center space-x-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded text-[#367AFF] focus:ring-[#367AFF]"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Keep me logged in
                </label>
              </div>




                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  onSubmit={()=>handleSubmit}
                >
                  {otpSent ? "Sign In" : "Get OTP"}
                </button>
              </form>

              <p className="text-sm text-center text-gray-600 mt-4">
                Need an account??{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-7/12 h-full p-1">
          <img
            src="https://wallpaperaccess.com/full/317501.jpg"
            alt="signup-banner"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
