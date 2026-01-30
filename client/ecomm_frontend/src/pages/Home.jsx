import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/apis";

const categories = [
  { name: "Electronics", slug: "electronics", icon: "📱" },
  { name: "Fashion", slug: "fashion", icon: "👕" },
  { name: "Shoes", slug: "shoes", icon: "👟" },
  { name: "Accessories", slug: "accessories", icon: "⌚" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
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

      {/* HERO */}
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
            className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="w-96 h-96 bg-orange-200 rounded-full flex items-center justify-center">
            <span className="text-orange-600 text-3xl font-bold">
              ShopX
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="p-6 rounded-xl shadow hover:shadow-lg transition text-center hover:bg-orange-50"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="font-semibold text-lg">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS (FROM DB) */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
                  <div className="bg-white rounded-xl shadow p-10">
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
