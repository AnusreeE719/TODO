import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from './layout/Dashboard'
import { SignUp } from './pages/SignUp'
import { LogIn } from './pages/LogIn'
import { useAuthContext } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'


const App = () => {
  const { authUser } = useAuthContext();
  return (
  
    <div>
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <LogIn />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
    </Routes>
     <Toaster />
    </div>
  
  )
}

export default App

