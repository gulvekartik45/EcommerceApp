import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="flex gap-4 mb-6">
      <Link
        to="/products?category=electronics"
        className="px-4 py-2 bg-gray-200 rounded hover:bg-orange-500 hover:text-white"
      >
        Electronics
      </Link>

      <Link
        to="/products?category=fashion"
        className="px-4 py-2 bg-gray-200 rounded hover:bg-orange-500 hover:text-white"
      >
        Fashion
      </Link>

      <Link
        to="/products?category=shoes"
        className="px-4 py-2 bg-gray-200 rounded hover:bg-orange-500 hover:text-white"
      >
        Shoes
      </Link>

      <Link
        to="/products?category=accessories"
        className="px-4 py-2 bg-gray-200 rounded hover:bg-orange-500 hover:text-white"
      >
        Accessories
      </Link>
    </div>
  );
};

export default Categories;
