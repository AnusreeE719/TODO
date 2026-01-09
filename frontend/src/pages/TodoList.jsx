import TodoCard from "../components/TodoCard";

export const TodoList = ({ todos, onDelete, onEdit, onStatusUpdate }) => {
    
    if (!todos.length) {
        return <p className="text-gray-400">No todos found.</p>;
    }

    return (
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {todos.map(todo => (
            <TodoCard 
                key={todo._id} 
                todo={todo}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusUpdate={onStatusUpdate} 
            />
        ))}
        </div>
    );
};