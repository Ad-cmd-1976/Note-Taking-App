import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Calendar } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const { getOtp, otpSent, signup }=useAuthStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (!otpSent) getOtp(formData);
     else {
      signup(formData);
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Logo */}
          <div className="flex justify-between pl-3">
            <div className="flex gap-2 mb-6 items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
              <span className="font-semibold text-lg">HD</span>
            </div>
          </div>

          {/* Form container */}
          <div className="flex justify-center items-center h-full pb-20">
            <div className="flex flex-col w-[60%]">
              <h2 className="text-2xl font-bold mb-2">Sign up</h2>
              <p className="text-gray-500 mb-6 text-sm">
                Sign up to enjoy the feature of HD
              </p>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>


                    <div className="relative w-full">
                      {/* Calendar Icon */}
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 pointer-events-none"
                      />

                      <input
                        type="text"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      />
                    </div>

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
                <a href="/signin" className="text-blue-500 hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right section */}
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
