import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Role-Based Auth' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Role-based authentication system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-bold mb-3">About Us</h3>
                <p className="text-blue-100 text-sm">
                  Secure role-based authentication system built with modern technologies.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-blue-100 hover:text-white transition">Home</a></li>
                  <li><a href="/signup" className="text-blue-100 hover:text-white transition">Sign Up</a></li>
                  <li><a href="/login" className="text-blue-100 hover:text-white transition">Login</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-100 hover:text-white transition transform hover:scale-110">
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-100 hover:text-white transition transform hover:scale-110">
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-100 hover:text-white transition transform hover:scale-110">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-100 hover:text-white transition transform hover:scale-110">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-blue-400 pt-4 text-center">
              <p className="text-sm text-blue-100">
                &copy; 2025 Role-Based Auth. All rights reserved. Made with <i className="fas fa-heart text-pink-300"></i>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
