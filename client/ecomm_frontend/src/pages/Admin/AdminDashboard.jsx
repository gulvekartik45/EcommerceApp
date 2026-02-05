import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import imageCompression from "browser-image-compression";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  updateUser,
  deleteUser as removeUser,
} from "../../api/apis";

const AdminDashboard = () => {
  const navigate = useNavigate();

  
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        navigate("/");
        return;
      }
      setIsAdmin(true);
    } catch {
      navigate("/login");
    } finally {
      setCheckingAuth(false);
    }
  }, [navigate]);

 
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [image, setImage] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(Array.isArray(data) ? data : []);
  };

  
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FETCH USERS ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchUsers();
    }
  }, [isAdmin]);

 
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    setImage(compressed);
  };

 
  const handleProductChange = (e) =>
    setProductForm({ ...productForm, [e.target.name]: e.target.value });

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productForm).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append("image", image);

    if (editProductId) {
      await updateProduct(editProductId, formData);
      setEditProductId(null);
    } else {
      await addProduct(formData);
    }

    setProductForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    });
    setImage(null);
    fetchProducts();
  };

  const handleEditProduct = (p) => {
    setEditProductId(p._id);
    setProductForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
    });
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };


  const handleUserChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  const handleEditUser = (u) => {
    setEditUserId(u._id);
    setUserForm({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userForm.firstName || !userForm.email) {
        alert("Please fill in required fields");
        return;
      }
      await updateUser(editUserId, userForm);
      alert("User updated successfully!");
      setEditUserId(null);
      setUserForm({ firstName: "", lastName: "", email: "", role: "" });
      fetchUsers();
    } catch (err) {
      alert("Error updating user: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await removeUser(id);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        alert("Error deleting user: " + (err.response?.data?.message || err.message));
      }
    }
  };


  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Checking admin access…</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">

      {/* ================= PRODUCTS ================= */}
      <div className="bg-white p-6 rounded shadow max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        <form onSubmit={handleProductSubmit} className="grid grid-cols-6 gap-3 mb-6">
          <input name="name" value={productForm.name} onChange={handleProductChange} className="border p-2" placeholder="Name" />
          <input name="description" value={productForm.description} onChange={handleProductChange} className="border p-2" placeholder="Description" />
          <input name="price" value={productForm.price} onChange={handleProductChange} className="border p-2" placeholder="Price" />
          <input name="stock" value={productForm.stock} onChange={handleProductChange} className="border p-2" placeholder="Stock" />
          <input name="category" value={productForm.category} onChange={handleProductChange} className="border p-2" placeholder="Category" />

          <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2" />

          <button className="col-span-6 bg-orange-500 text-white py-2 rounded">
            {editProductId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Image</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border-t">
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>{p.image && <img src={p.image} className="h-12 mx-auto rounded" />}</td>
                <td className="space-x-2">
                  <button onClick={() => handleEditProduct(p)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteProduct(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= USERS ================= */}
      <div className="bg-white p-6 rounded shadow max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Users</h2>

        {editUserId && (
          <form onSubmit={handleUserSubmit} className="grid grid-cols-4 gap-3 mb-6 bg-blue-50 p-4 rounded">
            <input name="firstName" value={userForm.firstName} onChange={handleUserChange} className="border p-2" placeholder="First Name" />
            <input name="lastName" value={userForm.lastName} onChange={handleUserChange} className="border p-2" placeholder="Last Name" />
            <input name="email" value={userForm.email} onChange={handleUserChange} className="border p-2" placeholder="Email" />
            
            <select name="role" value={userForm.role} onChange={handleUserChange} className="border p-2">
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="col-span-2 bg-green-500 text-white py-2 rounded">
              Update User
            </button>
            <button 
              type="button"
              onClick={() => {
                setEditUserId(null);
                setUserForm({ firstName: "", lastName: "", email: "", role: "" });
              }}
              className="col-span-2 bg-gray-500 text-white py-2 rounded"
            >
              Cancel
            </button>
          </form>
        )}

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center border-t">
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="space-x-2">
                  <button onClick={() => handleEditUser(u)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteUser(u._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;
