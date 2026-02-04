import { useEffect, useState } from "react";
import { placeOrder } from "../api/apis";
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

  const handleCheckout = async () => {
    try {
      const order = {
        items: cart,
        totalAmount: totalPrice,
      };

      await placeOrder(order);
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (err) {
      alert("Order failed");
    }
  };

  if (cart.length === 0) {
    return <p className="text-center mt-20">Cart is empty</p>;
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
