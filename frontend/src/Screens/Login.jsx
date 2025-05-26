import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { setCredentails } from "../slices/authSlice";

export default function Login() {
  const { mockzyUser } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const [loginUser, { error }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response = await loginUser({ ...form }).unwrap();
      console.log(response)
      dispatch(setCredentails({ ...response }));
      navigate("/");
    } catch (error) {
      console.log(error?.message || error?.data?.message);
    }
  };

  useEffect(() => {
    if (mockzyUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error && <MessageBox message={error?.data?.message} />}

        <h2 className="text-4xl font-extrabold text-black text-center mb-6">
          Welcome Back to <span className="text-black">Mockzy</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
