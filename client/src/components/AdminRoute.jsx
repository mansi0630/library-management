import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {

  const {
    user,
    userRole,
    loading,
  } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user || userRole !== 'admin') {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default AdminRoute