import { CheckCircle, Clock, PlusCircle, LayoutList } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ isOpen, onClose,activeView, onChangeView }) => {
  return (
     <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-900 text-gray-100 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="h-16 flex items-center justify-center text-xl font-semibold border-b border-gray-800">
          Todo List
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
            <SidebarItem 
                icon={<PlusCircle size={18} />} 
                label="Create" 
                active={activeView === "create"}
                onClick={() => onChangeView("create")}
            />
            <SidebarItem 
                icon={<LayoutList size={18} />} 
                label="All Todos" 
                active={activeView === "all"}
                onClick={() => onChangeView("all")} 
            />
            <SidebarItem
                icon={<CheckCircle size={18} />} 
                label="Completed Todos" 
                active={activeView === "completed"}
                onClick={() => onChangeView("completed")}
            />
            <SidebarItem 
                icon={<Clock size={18} />} 
                label="In Progress Todos"
                active={activeView === "in-progress"}
                onClick={() => onChangeView("in-progress")}
            />
        </nav>
      </aside>
    </>
  );
}
