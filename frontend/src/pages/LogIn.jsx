import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	
	const {loading, login} = useLogin();
    const handleSubmit = async (e) => {
		e.preventDefault();
		await login(email, password);
	};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
			onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
			onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg" disabled={loading}>
          {loading ? <span className='loading loading-spinner '></span> : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}
