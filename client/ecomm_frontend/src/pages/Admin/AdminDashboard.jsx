import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/apis";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      if (editId) {
        await updateProduct(editId, formData);
        setEditId(null);
      } else {
        await addProduct(formData);
      }

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImage(null);

      fetchProducts();
    } catch (err) {
      console.error("ADD PRODUCT ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
    });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-3 mb-6">
          <input name="name" value={form.name} onChange={handleChange} className="border p-2" placeholder="Name" />
          <input name="description" value={form.description} onChange={handleChange} className="border p-2" placeholder="Description" />
          <input name="price" value={form.price} onChange={handleChange} className="border p-2" placeholder="Price" />
          <input name="stock" value={form.stock} onChange={handleChange} className="border p-2" placeholder="Stock" />
          <input name="category" value={form.category} onChange={handleChange} className="border p-2" placeholder="Category" />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2"
          />

          <button className="col-span-6 bg-orange-500 text-white py-2 rounded">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border-t">
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>
                  <img src={p.image} alt="" className="h-12 mx-auto" />
                </td>
                <td className="space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
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
