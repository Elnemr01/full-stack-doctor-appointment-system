import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Loader2, Mail } from 'lucide-react';
import useVerifyEmail from '@/hooks/password/useVerifyEmail';
import { verifyEmailValidationSchema } from '@/constants/schemas/authSchema';

const VerfiyEmail = () => {
    const { verfiyEmail, isPending } = useVerifyEmail();

    const initialValues = useMemo(() => {
        return {
        email: '',
        };
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: verifyEmailValidationSchema,
        onSubmit: (values) => {
        verfiyEmail(values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <div className="mx-auto h-12 w-12 text-blue-600">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
            </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
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
                <button
                type="submit"
                disabled={isPending}
                className="group relative cursor-pointer
                w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                {isPending ? (
                    <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                    </div>
                ) : (
                    'Send Reset Link'
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

export default VerfiyEmail;