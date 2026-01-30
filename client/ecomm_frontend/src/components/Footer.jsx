export default function Footer() {
  return (
    <footer className="bg-orange-400 text-orange-100 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            ShopX
          </h2>
          <p className="text-sm">
            Your one-stop destination for premium products.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">
            Contact
          </h3>
          <p className="text-sm">support@shopx.com</p>
          <p className="text-sm">+91 8805238896</p>
        </div>

      </div>

      <div className="border-t border-orange-300 text-center py-4 text-sm text-orange-100">
        © {new Date().getFullYear()} ShopX. All rights reserved.
      </div>

    </footer>
  );
}
