import { useEffect, useState } from "react";
import { placeOrder } from "../api/apis";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const checkout = async () => {
    await placeOrder({
      items: cart,
      totalAmount: totalPrice,
    });

    localStorage.removeItem("cart");
    navigate("/orders");
  };

  if (cart.length === 0) {
    return <p className="text-center mt-20">Cart is empty</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div key={item._id} className="flex justify-between border-b py-4">
          <div>
            <h2>{item.name}</h2>
            <p>₹{item.price} × {item.qty}</p>
          </div>
          <p>₹{item.price * item.qty}</p>
        </div>
      ))}

      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
        <button
          onClick={checkout}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
