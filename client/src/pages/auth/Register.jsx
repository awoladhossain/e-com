// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8"
      >
        {/* Logo / Branding */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">ShopNest</h1>
          <p className="mt-2 text-gray-500">
            Create your account to start shopping.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="Your username"
              className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-500"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms & Conditions
              </a>
            </span>
          </div> */}

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Signup */}
        {/* <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/349576/facebook.svg"
              alt="Facebook"
              className="h-5 w-5"
            />
            Sign up with Facebook
          </button>
        </div> */}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
