'use client';
import React, { useState } from 'react';
import axios from 'axios';
import InputField from '@/components/shared/InputField';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiSolidErrorAlt } from "react-icons/bi";
import Logo from '@/components/shared/Logo';
import registerImage from '../../../../public/register.jpg';
import logo from '../../../../public/logo.jpg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [emailAvailable, setEmailAvailable] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) errors.terms = 'You must accept the Terms & Conditions';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8008/api/users/create', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'PrimaryAdmin'
      });
      console.log('User created:', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      {/* Top div for lg */}
      <div className="hidden justify-center items-start lg:flex bg-white h-10">
        {/* left image div */}
        <div className="flex-1 flex items-center w-full h-full">
          <div className='pl-10 pt-8'><Logo /></div>
        </div>
        <div className="flex-1 bg-custom-gray-2 h-10"></div>
      </div>
      {/* Top div for mobile */}
      <div className="lg:hidden bg-white flex justify-center items-center pt-10">
        <Image src={logo} alt="logo" height={120} width={180} />
      </div>

      {/* Bottom div for large screen*/}
      <div className='lg:flex justify-center items-center hidden'>
        {/* left div */}
        <div className='flex-1'>
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className='px-32'>
            <div className='flex justify-between items-center gap-2'>
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                error={errors.lastName}
              />
            </div>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              emailSuccess={emailAvailable}
            />
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
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
            <InputField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
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
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox peer checked:bg-custom-dark-blue-1 border-black rounded-lg"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span className="ml-2">
                  I agree to the <a href="#" className="text-custom-light-blue-2 font-bold">Terms & Conditions</a>
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
              <p className='pl-5 text-xs pt-2'>
                Your personal data will be used to support your experience throughout this website to manage access to your account, and for other purposes described in our <span className='text-custom-light-blue-1 underline'>Privacy Policy</span>.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-custom-orange-1 text-white font-semibold py-2 rounded-lg hover:bg-orange-600"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account? <a href="#" className="text-custom-light-blue-1">Login</a>
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
          <h2 className="text-2xl font-bold text-center my-6">Register</h2>
          <form onSubmit={handleSubmit} className='px-10 md:px-28 pt-5'>
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              error={errors.lastName}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              emailSuccess={emailAvailable}
            />
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
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
            <InputField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
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
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox peer checked:bg-custom-dark-blue-1 border-black rounded-lg"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span className="ml-2">
                  I agree to the <a href="#" className="text-custom-light-blue-2 font-bold">Terms & Conditions</a>
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
              <p className='pl-5 text-xs pt-2'>
                Your personal data will be used to support your experience throughout this website to manage access to your account, and for other purposes described in our <span className='text-custom-light-blue-1 underline'>Privacy Policy</span>.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-custom-orange-1 text-white font-semibold py-2 rounded-lg hover:bg-orange-600"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account? <Link href="/login" className="text-custom-light-blue-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
