import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex justify-between"
            >
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">₹{total}</span>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
