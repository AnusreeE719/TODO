import { LogOut } from 'lucide-react'
import useLogout from '../hooks/useLogout';

const Logout = () => {
    const { loading, logout } = useLogout();
  return (
    <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                {!loading ? (
				    <LogOut size={18} onClick={logout} />
                ) : (
                    <span className='loading loading-spinner'></span>
                )}
            </button>
           
          </div>
  )
}

export default Logout
