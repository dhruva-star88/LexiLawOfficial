import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-[#0f172a] overflow-hidden text-white">

      {/* Background Doodles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="pattern" width="200" height="200" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="white" strokeWidth="1">
                <path d="M100 50 L100 120" />
                <path d="M70 70 L130 70" />
                <circle cx="70" cy="90" r="15" />
                <circle cx="130" cy="90" r="15" />
              </g>
              <rect x="30" y="150" width="40" height="10" fill="white" />
              <rect x="60" y="130" width="10" height="30" fill="white" />
              <text x="150" y="160" fontSize="30" fill="white">§</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      {/* 404 Card */}
      <div className="relative z-10 bg-[#1e293b] p-12 rounded-md shadow-2xl w-[480px] text-center">

        <h1 className="text-6xl font-serif tracking-wide mb-4">404</h1>

        <div className="h-[1px] w-20 bg-[#c9a227] mx-auto my-4"></div>

        <h2 className="text-2xl font-serif mb-4">
          Oops. This Page Does Not Exist.
        </h2>

        <p className="text-gray-300 mb-8 text-sm tracking-wide">
          The page you are looking for may have been moved,
          removed, or is temporarily unavailable.
        </p>

        <Link
          to="/dashboard"
          className="inline-block bg-[#c9a227] text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition duration-300"
        >
          Return to Homepage
        </Link>

      </div>
    </div>
  );
};

export default NotFound;