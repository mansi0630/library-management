import { Link } from 'react-router-dom'

const Navbar = () => {

  return (

    <nav className="flex items-center justify-between gap-4 px-4 sm:px-8 md:px-16 py-6">

      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Libero
      </h1>

      {/* Buttons */}
      <div className="flex items-center gap-2 sm:gap-4">

        <Link to="/login">

          <button className="border border-gray-300 hover:bg-gray-100 px-3 sm:px-5 py-2 rounded-xl transition-all text-sm sm:text-base">
            Login
          </button>

        </Link>

        <Link to="/register">

          <button className="bg-black text-white hover:bg-gray-800 px-3 sm:px-5 py-2 rounded-xl transition-all text-sm sm:text-base">
            Get Started
          </button>

        </Link>

      </div>

    </nav>

  )
}

export default Navbar