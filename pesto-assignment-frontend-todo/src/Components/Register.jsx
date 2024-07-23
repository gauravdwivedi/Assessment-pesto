import React, { useState } from 'react';
import { registerUser } from '../utils/API';
import { useNavigate, redirect } from 'react-router-dom';

const Register = () => {
    const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setError('');

    try {
      const response = await registerUser(userName,email, password);
      if(response?.data?.success){
        navigate('/');
    }
    } catch (err) {
        console.log(err)
      setError('Not able to register. Please try again in sometime!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className='mb-4'>
                <label className='block text-gray-700'>Username</label>
                <input
                    type='text'
                    className='w-full border p-2'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
        </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
