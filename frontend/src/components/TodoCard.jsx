import { Pencil, Trash2, CheckCircle, Clock } from "lucide-react";


const TodoCard = ({todo, onDelete, onEdit, onStatusUpdate}) => {
  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {todo.title}
        </h3>

      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed h-16 overflow-hidden line-clamp-3">
        {todo.description}
     </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        {/* Left  */}
        <div className="flex items-center gap-3">
          {/* Edit */}
          <button
            onClick={() => onEdit(todo)}
            className="text-gray-500 hover:text-blue-500 transition"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(todo._id)}
            className="text-gray-500 hover:text-red-500 transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Status toggle */}
        <button
          onClick={() => onStatusUpdate(todo)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-500 transition"
          title="Update Status"
        >
          {todo.status === "completed" ? <CheckCircle size={18} /> : <Clock size={18} />}

        </button>
      </div>
    </div>
  );
};

export default TodoCard;
