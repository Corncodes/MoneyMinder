import { useState } from 'react';
import { FetchWrapper } from '../../fetch-wrapper';


const CreateAccountForm = ({ baseUrl }) => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const FastAPI = new FetchWrapper(baseUrl)

const handleFirstName = (e) => {
    setFirstName(e.target.value);
    };

const handleLastName = (e) => {
    setLastName(e.target.value);
    };

const handleEmail = (e) => {
    setEmail(e.target.value);
    };

const handlePassword = (e) => {
    setPassword(e.target.value);
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {}
    body.email = email
    body.password = password
    body.first_name = firstName
    body.last_name = lastName

    const data = await FastAPI.post('/api/accounts', body)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
};

return (
  <div className="form">
    <div>
      <h1>User Registration</h1>
    </div>

    <form onSubmit={(e) => handleSubmit(e)}>
      <label>First Name</label>
      <input
        onChange={handleFirstName}
        value={firstName}
        type="text"
        required
      />

      <label>Last Name</label>
      <input
        onChange={handleLastName}
        value={lastName}
        type="text"
        required
      />

      <label>Email</label>
      <input
        onChange={handleEmail}
        value={email}
        type="email"
        required
      />

      <label>Password</label>
      <input
        onChange={handlePassword}
        value={password}
        type="password"
        required
      />

      <input type="submit" value="Create Account" />
    </form>
  </div>
);
}

export default CreateAccountForm;
