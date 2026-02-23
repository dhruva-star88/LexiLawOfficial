import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Client"
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Profile
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Home
          </button>
        </div>

        <hr className="mb-8" />

        {/* User Info Section */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Account Info */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Account Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full mt-1 p-2 border rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full mt-1 p-2 border rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">
                  Role
                </label>
                <input
                  type="text"
                  value={user.role}
                  readOnly
                  className="w-full mt-1 p-2 border rounded-md bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Security
            </h2>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Change Password
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

export default Profile;