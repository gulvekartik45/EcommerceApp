import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/apis";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProducts().then((data) => {
      const found = data.find((p) => p._id === id);
      setProduct(found);
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <Link
          to="/products"
          className="text-orange-500 font-medium mb-6 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="bg-white h-96 rounded-xl shadow flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-2">
              {product.category}
            </p>

            <p className="text-2xl mb-6">
              ₹{product.price}
            </p>

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
