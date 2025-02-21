'use client';

import React, { useState } from 'react';
import axios from 'axios';
import InputField from '@/components/shared/InputField';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '@/components/shared/Logo';
import registerImage from '../../../../public/register.jpg';
import logo from '../../../../public/logo.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8008/api/users/signin', {
        email: formData.email,
        password: formData.password,
      });
      console.log('User signed in:', response.data);
      localStorage.setItem("Token",response.data.accessToken)
      router.push(`/dashboard/my-profile/${response.data._id}`)
      // Handle successful sign-in (e.g., redirect to dashboard, store token, etc.)
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      {/* Top div for lg */}
      <div className="hidden justify-center items-start lg:flex bg-white h-10">
        {/* left image div */}
        <div className="flex-1 flex items-center w-full h-full">
          <div className="pl-10 pt-8">
            <Logo />
          </div>
        </div>
        <div className="flex-1 bg-custom-gray-2 h-10"></div>
      </div>
      {/* Top div for mobile */}
      <div className="lg:hidden bg-white flex justify-center items-center pt-10">
        <Logo />
      </div>

      {/* Bottom div for large screen */}
      <div className='lg:flex justify-center items-center hidden'>
        {/* left div */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
          <form onSubmit={handleSubmit} className='px-32'>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="mb-4 flex justify-between items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox peer checked:bg-custom-dark-blue-1 border-black rounded-lg"
                  name="terms"
                  // Handle checkbox change
                />
                <span className="ml-2">Remember me</span>
              </label>
              <p className='text-custom-light-blue-1 text-base'>Forgot Password</p>
            </div>
            <button
              type="submit"
              className="w-full bg-custom-orange-1 text-white font-semibold py-2 rounded-lg hover:bg-orange-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an Account? <Link href="/register" className="text-custom-light-blue-1">Register</Link>
          </p>
        </div>

        {/* right div */}
        <div className='flex-1 bg-custom-gray-2 min-h-screen'>
          <div className="flex-1 flex justify-center items-start">
            <Image
              src={registerImage}
              alt="Amplify register"
              height={800}
              width={600}
            />
          </div>
        </div>
      </div>

      {/* Bottom div for small screen */}
      <div className='flex lg:hidden'>
        <div className='flex-1'>
          <h2 className="text-2xl font-bold text-center my-6">LOGIN</h2>
          <form onSubmit={handleSubmit} className='px-10 md:px-28 pt-5'>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="mb-4 flex justify-between items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox peer checked:bg-custom-dark-blue-1 border-black rounded-lg"
                  name="terms"
                  // Handle checkbox change
                />
                <span className="ml-2">Remember me</span>
              </label>
              <p className='text-custom-light-blue-1 text-base'>Forgot Password</p>
            </div>
            <button
              type="submit"
              className="w-full bg-custom-orange-1 text-white font-semibold py-2 rounded-lg hover:bg-orange-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an Account? <Link href="/register" className="text-custom-light-blue-1">Register</Link>
          </p>
        </div>
      </div>
      </div>
    
  );
};

export default Login;
