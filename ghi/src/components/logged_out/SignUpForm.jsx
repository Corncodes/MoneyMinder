import { useState } from 'react';

function SignUpForm() {


const [first_name, setFirstName] = useState('');
const [last_name, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);


const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
    };

const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
    };

const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    };

const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    if (first_name === '' || last_name === '' || email === '' || password === '') {
    setError(true);
    } else {
    setSubmitted(true);
    setError(false);
    }
};

const successMessage = () => {
    return (
    <div
    className="success"
    style={{
    display: submitted ? '' : 'none',
    }}>
    <h1>User {first_name} {last_name} successfully registered!!</h1>
    </div>
    );
};

const errorMessage = () => {
    return (
    <div
    className="error"
    style={{
    display: error ? '' : 'none',
    }}>
    <h1>Please enter all the fields</h1>
    </div>
    );
};

return (
  <div className="form">
    <div>
      <h1>User Registration</h1>
    </div>

    <div className="messages">
      {errorMessage()}
      {successMessage()}
    </div>

    <form>
      <label className="label">First Name</label>
      <input onChange={handleFirstName} className="input"
        value={first_name} type="text" />

      <label className="label">Last Name</label>
      <input onChange={handleLastName} className="input"
        value={last_name} type="text" />

      <label className="label">Email</label>
      <input onChange={handleEmail} className="input"
        value={email} type="email" />

      <label className="label">Password</label>
      <input onChange={handlePassword} className="input"
        value={password} type="password" />

      <button onClick={handleSubmit} className="btn" type="submit">
        Submit
      </button>
    </form>
  </div>
);
}

export default SignUpForm;
