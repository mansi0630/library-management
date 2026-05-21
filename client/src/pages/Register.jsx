import API_URL from '../config/api'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      // FIREBASE REGISTER
      const userCredential =
        await register(email, password)

      // FIREBASE USER
      const firebaseUser =
        userCredential.user

      // SAVE USER IN MONGODB
      await axios.post(
        `${API_URL}/api/users`,
        {

          firebaseUID: firebaseUser.uid,

          name,

          email,

        }
      )

      toast.success(
        'Account Created Successfully 🎉'
      )

      navigate('/dashboard')

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }
  }

  return (

    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">

      <div className="bg-white border border-gray-200 rounded-3xl p-8 w-full max-w-md shadow-sm">

        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

        <p className="text-gray-500 mt-3">
          Start managing your library smarter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black transition-all"
            required
          />

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

            Create Account

          </button>

        </form>

        <p className="text-gray-500 mt-6 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-black font-medium ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  )
}

export default Register