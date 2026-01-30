import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price}
                </p>
              </div>
            ))
          )}

          <Link
            to="/products"
            className="inline-block mt-4 text-orange-500 font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">
              ₹{total}
            </span>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
