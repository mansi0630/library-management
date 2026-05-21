import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  UserCircle,
  Menu,
  X,
  Shield,
  Search
} from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { useAuth } from '../context/AuthContext'

const Sidebar = () => {

  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)

  const { userRole } = useAuth()

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Books', icon: <BookOpen size={20} />, path: '/books' },
    { name: 'Members', icon: <Users size={20} />, path: '/members' },
    { name: 'Issues', icon: <ClipboardList size={20} />, path: '/issues' },
    { name: 'Search', icon: <Search size={20} />, path: '/search' },
    { name: 'Profile', icon: <UserCircle size={20} />, path: '/settings' },
  ]

  return (

    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-white border p-3 rounded-2xl shadow-sm"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-white border-r p-6 flex flex-col transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>

        {/* TOP BRAND */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <img
              src="/logo.png"
              alt="Libero"
              className="w-14 h-14 object-contain drop-shadow-md hover:scale-105 transition"
            />

            <div className="leading-tight">

              <h1 className="text-2xl font-bold">
                Libero
              </h1>

              <p className="text-gray-500 text-xs">
                Library Management System
              </p>

            </div>

          </div>

          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>

        </div>

        {/* NAV */}
        <div className="mt-12 flex flex-col gap-3">

          {menuItems.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                location.pathname === item.path
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >

              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>

            </Link>

          ))}

          {/* ADMIN BUTTON */}
          {userRole === 'admin' && (

            <Link
              to="/admin/system-users"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                location.pathname === '/admin/system-users'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >

              <Shield size={20} />

              <span className="font-medium">
                System Users
              </span>

            </Link>

          )}

        </div>

        {/* BOTTOM CARD */}
        <div className="mt-auto bg-black text-white rounded-3xl p-6">

          <h2 className="text-xl font-semibold">
            Upgrade Your Library
          </h2>

          <p className="text-gray-300 mt-3 text-sm">
            Manage books, members, issues & analytics
          </p>

          <button className="bg-white text-black mt-5 w-full py-3 rounded-2xl">
            Learn More
          </button>

        </div>

      </div>
    </>
  )
}

export default Sidebar