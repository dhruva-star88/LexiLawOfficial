import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Settings
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Home
          </button>
        </div>

        <hr className="mb-8" />

        <div className="space-y-10">

          {/* Account Preferences */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Account Preferences
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center border p-4 rounded-md">
                <div>
                  <p className="font-medium text-gray-800">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive updates about document activity and bookings.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="w-5 h-5"
                />
              </div>

              <div className="flex justify-between items-center border p-4 rounded-md">
                <div>
                  <p className="font-medium text-gray-800">
                    Dark Mode
                  </p>
                  <p className="text-sm text-gray-500">
                    Enable dark interface theme.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="w-5 h-5"
                />
              </div>

            </div>
          </div>

          {/* Privacy Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Privacy & Security
            </h2>

            <div className="space-y-4">

              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Update Password
              </button>

              <button className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition">
                Delete Account
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;