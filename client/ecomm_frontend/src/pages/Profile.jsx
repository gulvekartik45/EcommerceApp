import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCurrentUserProfile, updateUser } from "../api/apis";

export default function Profile() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUserProfile();
        setUserProfile(data);
        setEditForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      if (!editForm.firstName || !editForm.email) {
        alert("Please fill in all required fields");
        return;
      }
      await updateUser(decoded.userId, editForm);
      setUserProfile({ ...userProfile, ...editForm });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="max-w-2xl mx-auto p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        // Edit Form
        <form onSubmit={handleSaveProfile} className="bg-white border rounded-lg p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // View Profile
        <>
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-8 mb-8 shadow-lg cursor-pointer hover:shadow-xl transition"
               onClick={() => setIsEditing(true)}>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-orange-500 text-3xl font-bold">
                {(userProfile?.firstName?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {userProfile?.firstName || "User"} {userProfile?.lastName || ""}
                </h2>
                <p className="text-orange-100 capitalize">{decoded.role || "user"}</p>
              </div>
            </div>
            <p className="text-sm text-orange-100 mt-4">👆 Click to edit profile</p>
          </div>

          {/* Profile Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Information */}
            <div className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer" onClick={() => setIsEditing(true)}>
              <h3 className="text-xl font-bold mb-6 text-gray-800">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium">First Name</p>
                  <p className="text-lg text-gray-800">{userProfile?.firstName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Last Name</p>
                  <p className="text-lg text-gray-800">{userProfile?.lastName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Email</p>
                  <p className="text-lg text-gray-800 break-all">{userProfile?.email || "N/A"}</p>
                </div>
              </div>
              <p className="text-xs text-orange-500 mt-4 font-semibold">👆 Click to edit</p>
            </div>

            {/* User Details */}
            <div className="bg-white border rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-6 text-gray-800">User Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium">User ID</p>
                  <p className="text-lg text-gray-800 font-mono">{decoded.userId?.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Account Status</p>
                  <p className="text-lg">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Active</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Member Since</p>
                  <p className="text-lg text-gray-800">{userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/orders" className="text-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition">
                <p className="text-2xl mb-2">📦</p>
                <p className="font-semibold text-gray-800">My Orders</p>
                <p className="text-sm text-gray-600">View your orders</p>
              </a>
              <a href="/products" className="text-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition">
                <p className="text-2xl mb-2">🛍️</p>
                <p className="font-semibold text-gray-800">Shop</p>
                <p className="text-sm text-gray-600">Continue shopping</p>
              </a>
              <a href="/cart" className="text-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition">
                <p className="text-2xl mb-2">🛒</p>
                <p className="font-semibold text-gray-800">Cart</p>
                <p className="text-sm text-gray-600">Review your cart</p>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
