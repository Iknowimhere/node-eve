import { useState } from "react";
import { Link } from "react-router";
import axios from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  let { setToken, setUser } = useAuth();
  let navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let res = await axios.post("/auth/login", { ...form });
      console.log(res);

      setToken(res.data.token);
      setUser({username: res.data.username, email: res.data.email, _id: res.data._id});
      navigate("/");
    } catch (error) {
      console.log(error);

      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
