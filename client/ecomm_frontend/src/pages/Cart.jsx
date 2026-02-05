import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item._id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    // Navigate to checkout page instead of placing order directly
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-600 text-lg mb-8">Add items to your cart to get started!</p>
          <a href="/products" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              className="w-20 h-20 object-contain bg-gray-100 rounded"
            />
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>₹{item.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => decreaseQty(item._id)} className="px-3 py-1 bg-gray-200">−</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item._id)} className="px-3 py-1 bg-gray-200">+</button>
          </div>

          <p className="font-semibold">₹{item.price * item.qty}</p>

          <button onClick={() => removeItem(item._id)} className="text-red-500">
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>

        <button
          onClick={handleCheckout}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
