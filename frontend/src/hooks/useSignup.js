import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'


const useSignup = () => {

  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext();

  const signup = async ({ name, email, password }) => {

    const success = handleInputErrors({ name, email, password })
    if(!success) return

    setLoading(true);
    try {
        const res = await fetch('/api/auth/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json();
        if (!res.ok) {
				throw new Error( data.message || "Sign up failed");
		}
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        setAuthUser(data);
        toast.success(data.message)
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false)
    }
  }
  return { loading, signup };
}

export default useSignup

function handleInputErrors({ name, email, password }) {
	if (!name || !email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}