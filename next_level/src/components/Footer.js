"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-5 w-full">
      <p className="text-sm my-2">
        &copy; {new Date().getFullYear()} Next Level Academy. All rights
        reserved.
      </p>
      <p>
        <a href="/terms" className="text-green-500 hover:underline mx-2">
          Terms
        </a>
        |
        <a href="/privacy" className="text-green-500 hover:underline mx-2">
          Privacy Policy
        </a>
        |
        <a href="/contact" className="text-green-500 hover:underline mx-2">
          Contact Us
        </a>
      </p>
    </footer>
  );
};

export default Footer;
