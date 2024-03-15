import useSignup from "../hooks/useSignup";
import useField  from "../hooks/useField";
import { useNavigate } from "react-router-dom";


const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const emailValue = useField("email");
  const passwordValue = useField("password");
  const firstnameValue = useField("firstName");
  const lastnameValue = useField("lastName");
  const phonenumberValue = useField("text");
  const roleValue = useField("role");

  const email = emailValue.value;
  const password = passwordValue.value;
  const firstname = firstnameValue.value;
  const lastname = lastnameValue.value;
  const phonenumber = phonenumberValue.value;
  const role = roleValue.value;

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({ email, password, firstname, lastname, phonenumber, role});
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };



  return (
    <form className="signup" onSubmit={handleFormSubmit}>
      <h3>Sign Up</h3>
      <label>Email address:</label>
      <input {...emailValue} />
      <label>Password:</label>
      <input {...passwordValue} />
      <label>First name:</label>
      <input {...firstnameValue} />
      <label>Last name:</label>
      <input {...lastnameValue} />
      <label>Phonenumber</label>
      <input {...phonenumberValue} />
      <label>Role:</label>
      <input {...roleValue} />
      <button>Sign up</button>
    </form>
  );
};

export default Signup;
