import { useMemo, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Loader2, Eye, EyeOff, Lock } from 'lucide-react';
import useResetPassword from '@/hooks/password/useResetPassword';
import { resetPasswordValidationSchema } from '@/constants/schemas/authSchema';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email') || '';
    const { resetPassword, isPending } = useResetPassword();

    const initialValues = useMemo(() => {
        return {
            newPassword: '',
        };
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: resetPasswordValidationSchema,
        onSubmit: (values) => {
        resetPassword({ email, newPassword: values.newPassword });
        },
    });

    if (!email) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
            <div className="mx-auto h-12 w-12 text-red-600">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Invalid Reset Link
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                This password reset link is invalid or has expired.
            </p>
            <div className="mt-6">
                <Link to="/verify-email" className="font-medium text-sm text-blue-600 hover:text-blue-500">
                Request a new reset link
                </Link>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <div className="mx-auto h-12 w-12 text-blue-600">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Set New Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Your new password must be different from previously used passwords.
            </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="newPassword" className="sr-only">
                New Password
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 cursor-pointer flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 py-2 border ${
                    formik.touched.newPassword && formik.errors.newPassword
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-1 transition-colors`}
                    placeholder="New Password"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.newPassword}</p>
                )}

                
            </div>


            <div>
                <button
                type="submit"
                disabled={isPending}
                className="group relative cursor-pointer
                w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                {isPending ? (
                    <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Resetting...</span>
                    </div>
                ) : (
                    'Reset Password'
                )}
                </button>
            </div>
            </form>

            <div className="text-center">
            <Link to="/login" className="font-medium text-sm text-blue-600 hover:text-blue-500">
                Back to login
            </Link>
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;