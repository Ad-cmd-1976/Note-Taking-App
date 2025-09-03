import useAuthStore from "../store/useAuthStore";
import { Calendar } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import FormField from "../components/FormField";

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
          <div className="flex justify-between pl-3">
            <div className="flex gap-2 mb-6 items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
              <span className="font-semibold text-lg">HD</span>
            </div>
          </div>

          <div className="flex justify-center items-center h-full pb-20">
            <div className="flex flex-col w-[60%]">
              <h2 className="text-2xl font-bold mb-2">Sign up</h2>
              <p className="text-gray-500 mb-6 text-sm">
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
                <a href="/login" className="text-blue-500 hover:underline">
                  Sign in
                </a>
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
