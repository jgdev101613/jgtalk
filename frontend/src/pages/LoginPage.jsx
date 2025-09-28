import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimation from "../components/BorderAnimation";
import { Link } from "react-router";

// Import Icons
import {
  LoaderIcon,
  LockIcon,
  Mail,
  MessageCircleIcon,
  UserIcon,
} from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="flex items-center justify-center w-full p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimation>
          <div className="flex flex-col w-full md:flex-row">
            {/* FORM LEFT SIDE */}
            <div className="flex items-center justify-center p-8 md:w-1/2 md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING */}
                <div className="mb-8 text-center">
                  <img
                    src="/logo.png"
                    alt=""
                    className="w-24 mx-auto object-fit"
                  />
                  {/* <MessageCircleIcon className="w-12 h-12 mx-auto mb-4 text-slate-400" /> */}
                  <h2 className="mb-2 text-2xl font-bold text-slate-200">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <Mail className="auth-input-icon" />
                      <input
                        type="email"
                        placeholder="johngregg@gmail.com"
                        className="input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 text-center animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to={"/signup"} className="auth-link">
                    Dont have an account? Register
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION RIGHT SIDE */}
            <div className="items-center justify-center hidden p-6 md:w-1/2 md:flex bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="Signup Image"
                  className="object-contain w-full h-auto"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect with people anytime, anywhere
                  </h3>
                  <div className="flex justify-center gap-4 mt-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Secured</span>
                    <span className="auth-badge">Lifetime Access </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimation>
      </div>
    </div>
  );
};

export default LoginPage;
