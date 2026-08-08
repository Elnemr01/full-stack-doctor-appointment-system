import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import useLogin from '@/hooks/auth/useLogin';
import { loginValidationSchema } from '@/constants/schemas/authSchema';
import AuthBtns from '@/myComponents/authBtns/AuthBtns';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login,isPending } = useLogin();

  const initialValues=useMemo(()=> {
    return {
      email: '',
      password: '',
    }
  },[])

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const handleGoToAuthApplication = (strategy)=> {
    window.location.href=`${import.meta.env.VITE_BASE_URL}/users/auth/${strategy}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 text-blue-600">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                } focus:outline-none focus:ring-1 transition-colors`}
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 pr-10 border ${
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
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative cursor-pointer
              w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending  ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
            <AuthBtns/>
          </div>
        </form>
        <div className="VerfiyEmail flex items-center justify-center">
          <Link to="/verify-email" className="font-medium text-sm text-blue-600 hover:text-blue-500">
            Forgot your password?
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Demo credentials: demo@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;