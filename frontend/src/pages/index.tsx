import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { isAuthenticated } from '@/utils/auth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <Layout title="Home - Role-Based Auth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Role-Based Authentication
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A full-stack web application with secure user authentication and role-based access control.
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-lg text-lg font-medium transition transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-rocket mr-2"></i>
              Get Started Now
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 md:p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-300 text-white">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">
              <i className="fas fa-lock"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Secure Authentication</h3>
            <p className="text-sm md:text-base text-blue-100">
              Password hashing with bcrypt and JWT token-based authentication for maximum security.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 md:p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-300 text-white">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">
              <i className="fas fa-users-gear"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Role-Based Access</h3>
            <p className="text-sm md:text-base text-purple-100">
              Different access levels for Users and Admins with protected routes and middleware.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 md:p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-300 text-white md:col-span-2 lg:col-span-1">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Modern Stack</h3>
            <p className="text-sm md:text-base text-green-100">
              Built with Next.js, TypeScript, Express, and MongoDB for optimal performance.
            </p>
          </div>
        </div>
        
        <div className="mt-12 md:mt-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-10 text-white text-center">
          <div className="text-4xl md:text-6xl mb-3 md:mb-4">
            <i className="fas fa-shield-halved"></i>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Enterprise-Grade Security</h2>
          <p className="text-base md:text-xl mb-4 md:mb-6 text-yellow-50">
            Your data is protected with industry-standard encryption and security practices
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 md:space-x-8 space-y-3 sm:space-y-0 text-sm md:text-lg">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-xl md:text-2xl mr-2"></i>
              <span>Encrypted Passwords</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-xl md:text-2xl mr-2"></i>
              <span>JWT Tokens</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-xl md:text-2xl mr-2"></i>
              <span>Protected Routes</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
