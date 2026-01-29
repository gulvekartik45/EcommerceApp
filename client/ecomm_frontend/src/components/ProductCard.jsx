import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      
      <Link to={`/product/${product.id}`}>
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">
          {product.name}
        </h3>

        <p className="text-gray-600 mb-4">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="block text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
