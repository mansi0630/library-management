import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import toast from 'react-hot-toast'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await login(email, password)

      toast.success(
        'Login Successful 🔥'
      )

      navigate('/dashboard')

    } catch (error) {

      console.log(error)

      if (
        error.message.includes(
          'invalid-credential'
        )
      ) {

        toast.error(
          'Invalid email or password'
        )

      } else {

        toast.error(
          'Login failed'
        )

      }

    }
  }

  return (

    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">

      <div className="bg-white border border-gray-200 rounded-3xl p-8 w-full max-w-md shadow-sm">

        <h1 className="text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-3">
          Login to continue managing your library.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black transition-all"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black transition-all"
            required
          />

          <button className="bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all">

            Login

          </button>

        </form>

        <p className="text-gray-500 mt-6 text-center">

          Don’t have an account?

          <Link
            to="/register"
            className="text-black font-medium ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  )
}

export default Login