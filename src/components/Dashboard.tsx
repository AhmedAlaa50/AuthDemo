import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="w-12 h-12 text-blue-600 p-2 bg-blue-100 rounded-full" />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.username}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Member Since
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(user?.createdAt || "").toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Account ID
                </label>
                <p className="mt-1 text-sm text-gray-900">{user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
