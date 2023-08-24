import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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
      </div>
    </div>
  );
};

export default LoginForm;
