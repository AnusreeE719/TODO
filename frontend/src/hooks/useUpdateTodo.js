import { useState } from "react";
import { toast } from "react-hot-toast";

const useUpdateTodo = () => {
  const [loading, setLoading] = useState(false);

  const updateTodo = async (todoId, title, description) => {
    const success = handleInputErrors(title, description);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update todo");
      }

      toast.success("Todo updated successfully");
      return data.todo;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateTodo };
};

export default useUpdateTodo;

function handleInputErrors(title, description) {
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
