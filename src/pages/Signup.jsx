import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNr, setPhoneNr] = useState('');
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { firstName, lastName, email, password, phoneNr, cameras };

    try {
      await signup(user);
      console.log(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signup', error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phoneNr"
          value={phoneNr}
          onChange={({ target }) => setPhoneNr(target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>

      {error && <p>{error}</p>}
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;
