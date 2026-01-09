import { useState } from "react";
import { toast } from "react-hot-toast";

const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);

  const deleteTodo = async (todoId) => {
    if (!todoId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${todoId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete todo");
      }

      toast.success(data.message || "Todo deleted");
      return todoId;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteTodo };
};

export default useDeleteTodo;
