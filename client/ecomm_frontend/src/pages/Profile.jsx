import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCurrentUserProfile } from "../api/apis";

export default function Profile() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUserProfile();
        setUserProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="max-w-xl mx-auto p-6 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="max-w-xl mx-auto p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600">Name</p>
          <p className="text-lg font-semibold">
            {userProfile?.name || userProfile?.firstName || "User"}
            {userProfile?.lastName ? " " + userProfile.lastName : ""}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-lg font-semibold">{userProfile?.email || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">User ID</p>
          <p className="text-lg font-semibold">{decoded.userId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Role</p>
          <p className="text-lg font-semibold capitalize">{decoded.role || "user"}</p>
        </div>
      </div>
    </div>
  );
}
