import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      login(data.user, data.token);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#131314]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-[#1e1f20] p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-[#2d2e30] p-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-[#2d2e30] p-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-[#2d2e30] p-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-gray-300">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-[#2d2e30] p-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="mt-5 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;