// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/users/authApi";
import { setUser } from "../../redux/features/users/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginUser, { isError }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isError) {
    console.log("Error logging in");
  }

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      console.log(res);
      const { user } = res;
      dispatch(setUser({ user }));
      if (res.error) {
        console.error("Error logging in:", res.error);
      }
      navigate("/");
    } catch (error) {
      setMessage("Error logging in");
      console.error("Error logging in:", error);
    }
  };

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
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
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
            {errors.email && <span>This field is required</span>}
          </div>

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
              {errors.password && <span>This field is required</span>}
              {message && <span className="text-red-500">{message}</span>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-500"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        {/* <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/349576/facebook.svg"
              alt="Facebook"
              className="h-5 w-5"
            />
            Sign in with Facebook
          </button>
        </div> */}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
