import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetAllTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getAllTodos = async () => {
			setLoading(true);
			 try {
                const res = await fetch("/api/tasks", {
                    method: "GET",
                    credentials: "include", 
                });
                const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch todos");
            }

            setTodos(data.todoList);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllTodos();
		
	}, []);

	return { todos, setTodos, loading };
}

export default useGetAllTodos