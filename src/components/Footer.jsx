export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600">EventPro</h2>
          <p className="mt-4 text-sm text-gray-400">
            Providing the best services with modern design and seamless usability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/allservices" className="hover:text-white">Products</a></li>
            <li><a href="https://www.facebook.com/rohit.roy.692944" className="hover:text-white">Contact</a></li>
           
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/rohit.roy.692944" className="hover:text-white">Facebook</a>
            <a href="https://www.instagram.com/rohit.here_17/?hl=en" className="hover:text-white">Instagram</a>
            <a href="https://www.linkedin.com/in/rohit-roy-dev/" className="hover:text-white">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-600 mt-10 pt-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}

