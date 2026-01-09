import { Menu } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import { useState } from "react";
import Logout from "../components/Logout";
import CreateTodo from "../pages/CreateTodo";
import { TodoList } from "../pages/TodoList";
import useGetAllTodos from "../hooks/useGetAllTodos";
import useDeleteTodo from "../hooks/useDeleteTodo";
import toast from "react-hot-toast";
import useUpdateTodoStatus from "../hooks/useUpdateTodoStatus";
import EditTodo from "../pages/EditTodo";


export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("all"); // all || create || completed || in-progress || edit
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { todos, setTodos, loading } = useGetAllTodos();
  const { deleteTodo } = useDeleteTodo();
  const { updateStatus } = useUpdateTodoStatus();

    const handleDelete = (todoId) => {
        toast(
            (t) => (
            <div className="flex flex-col gap-3">
                <p>Delete this todo?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={async () => {
                            const deletedId = await deleteTodo(todoId);
                            if (deletedId) {
                                setTodos(prev => prev.filter(t => t._id !== deletedId));
                            }
                            toast.dismiss(t.id);
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            ),
            { duration: Infinity }
        );
    };

    const handleStatusUpdate = async (todo) => {
        const nextStatus =
            todo.status === "completed" ? "in-progress" : "completed";

        const res = await updateStatus(todo._id, nextStatus);
        if (!res) return;

        setTodos(prev => {
            // console.log("PREV TODOS:", prev);

            const updated = prev.map(t =>
                t._id === todo._id
                    ? { ...t, status: nextStatus }
                    : t
            );

            // console.log("UPDATED TODOS:", updated);
            return updated;    
        });
    };
    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setActiveView("edit");
    };

 
   return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onChangeView={(view) => {
            setActiveView(view);
            setSidebarOpen(false); // close sidebar on mobile
        }}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-base sm:text-lg font-semibold text-gray-800">
              My Todo List
            </h1>
          </div>

          <Logout />
        </header>

        {/* Content */}
        <section className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {activeView === "all" && (
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <TodoList 
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onStatusUpdate={handleStatusUpdate}
                        todos={todos} 
                    />
                )
            )}

            {activeView === "create" && (
                <CreateTodo
                    setActiveView={setActiveView}
                    setTodos={setTodos}
                    onCancel={() => setActiveView("all")}
                />
            )}

            {activeView === "edit" && selectedTodo  && (
                <EditTodo
                    todo={selectedTodo}
                    setTodos={setTodos}
                    setActiveView={setActiveView}
                />
            )}
            {activeView === "completed" && (
                <TodoList
                    todos={todos.filter(todo => todo.status === "completed")}
                />
            )}

            {activeView === "in-progress" && (
                <TodoList
                    todos={todos.filter(todo => todo.status === "in-progress")}
                />
            )}
        </section>
      </main>
    </div>
  );
}

