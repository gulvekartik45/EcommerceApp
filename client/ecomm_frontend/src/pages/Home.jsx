import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/apis";

const categories = [
  { name: "Electronics", slug: "electronics", icon: "📱", color: "from-blue-500 to-indigo-500" },
  { name: "Fashion", slug: "fashion", icon: "👕", color: "from-pink-500 to-rose-500" },
  { name: "Shoes", slug: "shoes", icon: "👟", color: "from-green-500 to-emerald-500" },
  { name: "Accessories", slug: "accessories", icon: "⌚", color: "from-yellow-500 to-orange-500" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getProducts().then((data) =>
      setProducts(Array.isArray(data) ? data : [])
    );
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.min(products.length, 5));
    }, 3000);

    return () => clearInterval(timer);
  }, [products]);

  const trendingProducts = products.slice(0, 5);

  return (
    <div className="bg-orange-50">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Shop Smart. <br />
            <span className="text-orange-500">Shop Fast.</span>
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Premium products, best prices, fast delivery.
          </p>

          <Link
            to="/products"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="w-96 h-96 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white text-4xl font-bold">
              ShopX
            </span>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className={`group p-8 rounded-2xl text-white shadow-lg bg-gradient-to-br ${cat.color} hover:scale-105 transition`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xl">
                  {cat.name}
                </h3>
                <p className="text-sm opacity-90 mt-2">
                  Explore latest {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRENDING PRODUCTS ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Trending Products
          </h2>

          {trendingProducts.length === 0 ? (
            <p className="text-gray-500">
              No products available
            </p>
          ) : (
            <div className="relative overflow-hidden">
              {trendingProducts.map((product, index) => (
                <div
                  key={product._id}
                  className={`transition-all duration-700 ${
                    index === current
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 absolute inset-0"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-56 object-cover rounded-xl mb-6"
                    />

                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      ₹{product.price}
                    </p>

                    <Link
                      to={`/product/${product._id}`}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
