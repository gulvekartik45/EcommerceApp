import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/apis";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();

  useEffect(() => {
    getProducts().then((data) =>
      setProducts(Array.isArray(data) ? data : [])
    );
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory = category
      ? product.category?.toLowerCase() === category.toLowerCase()
      : true;

    const matchSearch = search
      ? product.name?.toLowerCase().includes(search)
      : true;

    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-bold mb-8">
          {search
            ? `Search results for "${search}"`
            : category
            ? `${category} Products`
            : "All Products"}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
