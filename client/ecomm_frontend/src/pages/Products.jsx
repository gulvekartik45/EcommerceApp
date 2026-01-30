import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/apis";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 capitalize">
          {selectedCategory
            ? `${selectedCategory} Products`
            : "All Products"}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">
            No products found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
