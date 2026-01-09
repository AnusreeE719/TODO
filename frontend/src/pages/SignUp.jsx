import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

export const SignUp = () => {
    const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
	});
    const { loading, signup } = useSignup();
    const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          SignUp
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={inputs.name}
			onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={inputs.email}
			onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
			onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg" disabled={loading}>
          {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

