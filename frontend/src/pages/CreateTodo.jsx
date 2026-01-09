import { useState } from "react";
import useCreateTodo from "../hooks/useCreateTodo";


const CreateTodo = ({ setActiveView, setTodos }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const { loading, createtodo } = useCreateTodo();
    const handleSubmit = async (e) => {
		e.preventDefault();
		const newTodo = await createtodo(title, description);
         if (newTodo) {
            setTodos(prev => [newTodo, ...prev]);
            setActiveView('all'); 
        }
	};    

  return (
    <div className="w-full max-w-auto bg-gray-200 p-4 sm:p-6 rounded-xl">
      <h1 className="text-xl font-semibold mb-4">Create Todo</h1>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Todo title"
          value={title}
		  onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-200 text-gray-500 border focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded bg-gray-200 text-gray-500 border focus:outline-none"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium"
        >
          {loading ? "Creating..." : "Create Todo"}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
