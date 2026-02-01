import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export default function Navbar() {
  const [search, setSearch] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  /* ================= CHECK LOGIN + ROLE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    } catch (err) {
      console.error("Invalid token");
      setUserRole(null);
    }
  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
    setSearch("");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          ShopX
        </Link>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/2"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 border rounded-l-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button className="bg-orange-500 text-white px-5 py-2 rounded-r-xl hover:bg-orange-600">
            Search
          </button>
        </form>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link to="/products" className="hover:text-orange-500">
            Products
          </Link>

          <Link to="/cart" className="hover:text-orange-500">
            Cart
          </Link>

          {/* ✅ ADMIN DASHBOARD (ONLY ADMIN) */}
          {userRole === "admin" && (
            <Link
              to="/admin"
              className="text-orange-500 font-semibold"
            >
              Admin Dashboard
            </Link>
          )}

          {/* LOGIN / LOGOUT */}
          {!userRole ? (
            <Link to="/login" className="hover:text-orange-500">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-500"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
