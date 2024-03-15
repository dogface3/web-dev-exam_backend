// imports
import useLogin  from "../hooks/useLogin";
import useField  from "../hooks/useField";
import { useNavigate } from "react-router-dom";

//Login component
const Login = ({ setIsAuthenticated }) => {
  // variables
  const navigate = useNavigate();


  const { login, error } = useLogin("/api/users/login");

  const emailInput = useField("email");
  const passwordInput = useField("password");
  const email = emailInput.value;
  const password = passwordInput.value;


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password});
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <form className="login" onSubmit={handleFormSubmit}>
      <h3>Log In</h3>

      <label>Email:</label>
      <input {...emailInput} />
      <label>Password:</label>
      <input {...passwordInput} />

      <button>Log in</button>
    </form>
  );
};

export default Login;
