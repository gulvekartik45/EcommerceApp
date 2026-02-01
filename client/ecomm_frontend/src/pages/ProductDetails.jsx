import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const backendUrl = "http://localhost:3000";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/products`);
        const found = res.data.find((p) => p._id === id);
        setProduct(found);
      } catch (err) {
        console.error("PRODUCT FETCH ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => qty > 1 && setQty(qty - 1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/products" className="text-orange-500 mb-6 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-gray-100 rounded-lg p-6 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold mb-6">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decreaseQty}
              className="px-4 py-2 bg-gray-200 rounded text-lg"
            >
              −
            </button>

            <span className="text-lg font-semibold">{qty}</span>

            <button
              onClick={increaseQty}
              className="px-4 py-2 bg-gray-200 rounded text-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={addToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
