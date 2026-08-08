import { useMemo, useState } from 'react';
import {  Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Loader2, Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react';
import { registerValidationSchema } from '@/constants/schemas/authSchema';
import useRegister from '@/hooks/auth/useRegister';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isPending, isError, error } = useRegister();

  const initialValues=useMemo(()=> {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',
    }
  },[])

  const formik = useFormik({
    initialValues,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log(values)
      register(values);
    }
  });

  const passwordRequirements = useMemo(()=> [
    { label: 'At least 8 characters', test: (val) => val && val.length >= 8 },
    { label: 'One uppercase letter', test: (val) => val && /[A-Z]/.test(val) },
    { label: 'One lowercase letter', test: (val) => val && /[a-z]/.test(val) },
    { label: 'One number', test: (val) => val && /[0-9]/.test(val) },
  ],[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 text-blue-600">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>

            <div>
              <label htmlFor="firstName" className="sr-only">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border ${
                    formik.touched.name && formik.errors.name
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  } focus:outline-none focus:ring-1 transition-colors`}
                  placeholder="Your Name"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>
          

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                } focus:outline-none focus:ring-1 transition-colors`}
                placeholder="Email address"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                } focus:outline-none focus:ring-1 transition-colors`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}

          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Register as
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                formik.touched.role && formik.errors.role
                  ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              } focus:outline-none focus:ring-1 transition-colors bg-white`}
            >
              <option value="user">Patient (user)</option>
              <option value="admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.role}</p>
            )}
          </div>


          <div>
            <button
              type="submit"
              disabled={isPending }
              className="group relative w-full flex justify-center cursor-pointer
              py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  <span>Register</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Register;