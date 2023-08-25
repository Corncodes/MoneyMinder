import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../ContextStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const store = useStore()

//   testFunction("is this printing?")

  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    e.target.reset();
  };

  return (
    <div>
      <h5>Login:</h5>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
        <p>Don't have an account? Create one!</p>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
