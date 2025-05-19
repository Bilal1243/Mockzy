import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useCreateOrganizationMutation,
  useChangeStatusMutation,
} from "../slices/organizationApiSlice";

export default function Register() {
  const [form, setForm] = useState({
    organizationName: "",
    email: "",
    description: "",
    password: "",
    logo: null,
  });

  const [register] = useCreateOrganizationMutation();
  const [changeStatus] = useChangeStatusMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const options = {
        key: "rzp_test_x6b41FJRXFLvmM",
        key_secret: "98Y7mFd5GcpuJPIkjB0DaqIh",
        amount: 499 * 100,
        currency: "INR",
        name: "Mockzy",
        description: "Mockzy Organization Transaction",
        handler: async function (response) {
          try {
            const formData = new FormData();
            formData.append("organizationName", form.organizationName);
            formData.append("email", form.email);
            formData.append("description", form.description);
            formData.append("password", form.password);
            formData.append("logo", form.logo);

            const res = await register(formData).unwrap();
            await changeStatus({ id: res._id }).unwrap();

            navigate("/login");
          } catch (error) {
            console.log(error?.message || error?.data?.message);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const pay = new window.Razorpay(options);
      pay.open();
    } catch (error) {
      console.log(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-black text-center mb-6">
          Join <span className="text-black">Mockzy</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="organizationName"
            type="text"
            placeholder="Organization Name"
            value={form.organizationName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            name="description"
            placeholder="Describe your organization"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Logo
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
