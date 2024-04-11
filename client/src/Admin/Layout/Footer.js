import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-white">
          Copyright &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;