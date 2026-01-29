import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Wireless Headphones", price: 999, category: "electronics" },
  { id: 2, name: "Smart Watch", price: 1499, category: "electronics" },
  { id: 3, name: "Bluetooth Speaker", price: 1999, category: "electronics" },
  { id: 4, name: "T-Shirt", price: 799, category: "fashion" },
  { id: 5, name: "Running Shoes", price: 2499, category: "shoes" },
  { id: 6, name: "Leather Watch", price: 2999, category: "accessories" },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category === selectedCategory
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
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
