import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const useCreateTodo = () => {

  const [loading, setLoading] = useState(false)

  const createtodo = async (title, description ) => {

    const success = handleInputErrors( title, description )
    if(!success) return

    setLoading(true);
    try {
        const res = await fetch('/api/tasks/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        })

        const data = await res.json();
        if (!res.ok) {
                throw new Error( data.message || "Failed to create todo");
        }
        toast.success(data.message)
        return data.newTodo;
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false)
    }
  }
  return { loading, createtodo };
}

export default useCreateTodo

function handleInputErrors( title, description ) {

    if (!title || !description) {
		toast.error("Please fill in all fields");
		return false;
	}

    if (title.length < 3) {
        toast.error("Title must be at least 3 characters");
        return false;
    }

    if (description.length > 500) {
        toast.error("Description cannot exceed 500 characters");
        return false;
    }

    return true;
}