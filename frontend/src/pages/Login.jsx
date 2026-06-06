import { loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const data = await loginWithGoogle();

      login(data.user);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>KrishiSathi Login</h1>

      <button onClick={handleLogin}>Continue with Google</button>
    </div>
  );
}

export default Login;
