import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import dogImg from "../../assets/dog-login.svg";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login | Prani Seva Ashram";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, form, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/admin/");
    } catch (err) {
      console.error("Login error response:", err.response?.data);
      toast.error(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="bg-white shadow-lg rounded-xl flex overflow-hidden max-w-4xl w-full">
        <div className="w-1/2 hidden md:block bg-yellow-100 p-6">
          <img
            src={dogImg}
            alt="Dog illustration"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
            >
              Login
            </button>
          </form>
          {/* <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/admin/register")}
              className="text-yellow-700 hover:underline font-medium"
            >
              Register
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
