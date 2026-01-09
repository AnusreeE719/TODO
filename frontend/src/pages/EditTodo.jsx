import { useState } from "react";
import useUpdateTodo from "../hooks/useUpdateTodo";


const EditTodo = ({ todo, setActiveView, setTodos }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const { updateTodo, loading } = useUpdateTodo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = await updateTodo(todo._id, title, description);
    if (!updated) return;

    setTodos(prev =>
      prev.map(t => (t._id === updated._id ? updated : t))
    );

    setActiveView("all");
  };

  return (
    <div className="w-full max-w-auto bg-gray-200 p-4 sm:p-6 rounded-xl">
      <h1 className="text-xl font-semibold mb-4">Edit Todo</h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
         name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-200 text-gray-500 border focus:outline-none"
      />

      <textarea
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 rounded bg-gray-200 text-gray-500 border focus:outline-none"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium"
      >
        {loading ? "Updating..." : "Update Todo"}
      </button>
    </form>
    </div>
  );
};

export default EditTodo;
