import { Bell, LogOut } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const Topbar = () => {

  const { logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {

    try {

      await logout()

      navigate('/login')

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-5 flex items-center justify-between">

      {/* LEFT */}
      <div />

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell size={22} />

          <span className="absolute -top-1 -right-1 bg-black text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
            2
          </span>

        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  )
}

export default Topbar