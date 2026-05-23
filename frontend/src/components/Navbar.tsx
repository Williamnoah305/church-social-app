import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-2xl">
            🙏 Church Connect
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link to="/events" className="hover:bg-blue-700 px-3 py-2 rounded">
              Events
            </Link>
            <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
              Login
            </Link>
            <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
