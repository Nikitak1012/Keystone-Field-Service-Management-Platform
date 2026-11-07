import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Keystone Field Service Management Platform. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

