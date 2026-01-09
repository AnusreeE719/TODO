import { useState } from "react";
import { toast } from "react-hot-toast";

const useUpdateTodoStatus = () => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (todoId, status) => {
    if (!todoId || !status) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/status/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }
      toast.success("Status updated");
      return data.todo;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateStatus };
};

export default useUpdateTodoStatus;
