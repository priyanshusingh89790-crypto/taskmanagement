import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/constant";
import { Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
if(user){
    return <Navigate to="/dashboard" replace />;
}
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-[400px] shadow-2xl border border-gray-300">
        <h1 className="text-4xl font-bold text-orange-600">Login</h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 mt-10"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 h-12 rounded-md p-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 h-12 rounded-md p-2"
          />

          <button className="bg-orange-500 text-white py-2 rounded-md">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;