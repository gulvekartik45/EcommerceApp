import { useState } from "react";
import { addProduct } from "../../api/apis";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    alert("Product added");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input name="name" onChange={handleChange} placeholder="Name" />
        <input name="description" onChange={handleChange} placeholder="Desc" />
        <input name="price" onChange={handleChange} placeholder="Price" />
        <input name="stock" onChange={handleChange} placeholder="Stock" />
        <input name="category" onChange={handleChange} placeholder="Category" />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
