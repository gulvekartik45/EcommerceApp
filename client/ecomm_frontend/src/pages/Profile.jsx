import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p>User ID: {user.userId}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
