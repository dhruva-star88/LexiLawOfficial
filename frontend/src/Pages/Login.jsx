import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();
      // console.log("Login successful, token:", token);
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#0f172a] overflow-hidden">

      {/* ✅ Background Doodles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="pattern"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <g fill="none" stroke="white" strokeWidth="1">
                <path d="M100 50 L100 120" />
                <path d="M70 70 L130 70" />
                <circle cx="70" cy="90" r="15" />
                <circle cx="130" cy="90" r="15" />
              </g>
              <rect x="30" y="150" width="40" height="10" fill="white" />
              <rect x="60" y="130" width="10" height="30" fill="white" />
              <text x="150" y="160" fontSize="30" fill="white">
                §
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-[#1e293b] text-white p-10 rounded-md shadow-2xl w-[420px]"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif tracking-wide">LexiLaw</h2>
          <div className="h-[1px] w-16 bg-[#c9a227] mx-auto my-3"></div>
          <p className="text-sm text-gray-300 tracking-wide">
            Secure Client Access Portal
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 bg-transparent border border-gray-600 rounded text-white focus:outline-none focus:border-[#c9a227]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password with Toggle */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pr-12 bg-transparent border border-gray-600 rounded text-white focus:outline-none focus:border-[#c9a227]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586M9.88 4.24A9.956 9.956 0 0112 4c5 0 9 8 9 8a17.55 17.55 0 01-2.676 3.657M6.53 6.53A17.543 17.543 0 003 12s4 8 9 8a9.956 9.956 0 005.47-1.53"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#c9a227] text-black font-semibold p-3 rounded hover:bg-yellow-500 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;