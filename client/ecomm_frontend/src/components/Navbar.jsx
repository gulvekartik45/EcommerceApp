import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">ShopX</Link>

      <div className="space-x-4">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {role === "admin" && <Link to="/admin">Dashboard</Link>}

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
