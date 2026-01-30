import { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../api/apis";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateProduct(editId, form);
      setEditId(null);
    } else {
      await addProduct(form);
    }

    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    });

    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-3 mb-6">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Desc" className="border p-2" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2" />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-2" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2" />

          <button className="col-span-5 bg-orange-500 text-white py-2 rounded">
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
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
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
