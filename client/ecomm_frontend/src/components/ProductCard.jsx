import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      
      <Link to={`/product/${product._id}`}>
        <div className="h-56 w-full bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
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
          to={`/product/${product._id}`}
          className="block text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
