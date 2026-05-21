import {
  User,
  ShieldCheck,
  Mail,
  BadgeCheck,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'

const Settings = () => {

  const {
    user,
    userRole,
  } = useAuth()

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl sm:text-5xl font-bold">
          Profile
        </h1>

        <p className="text-gray-500 mt-2 text-base sm:text-lg">
          Manage your account information.
        </p>

      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">

          {/* AVATAR */}
          <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold">

            {user?.email?.charAt(0).toUpperCase()}

          </div>

          {/* INFO */}
          <div>

            <h2 className="text-3xl font-bold break-all">

              {user?.displayName || 'Library User'}

            </h2>

            <p className="text-gray-500 mt-2 break-all">

              {user?.email}

            </p>

            {/* ROLE BADGE */}
            <div className="mt-4">

              <span className={`px-5 py-2 rounded-2xl text-sm font-medium ${
                userRole === 'admin'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black'
              }`}>

                {userRole === 'admin'
                  ? 'Admin Account'
                  : 'User Account'}

              </span>

            </div>

          </div>

        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* EMAIL */}
          <div className="border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center">

                <Mail size={22} />

              </div>

              <h3 className="text-xl font-semibold">
                Email Address
              </h3>

            </div>

            <p className="text-gray-500 break-all">

              {user?.email}

            </p>

          </div>

          {/* ACCOUNT TYPE */}
          <div className="border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center">

                <BadgeCheck size={22} />

              </div>

              <h3 className="text-xl font-semibold">
                Account Type
              </h3>

            </div>

            <p className="text-gray-500">

              {userRole === 'admin'
                ? 'Administrator Access'
                : 'Standard User Access'}

            </p>

          </div>

          {/* FIREBASE UID */}
          <div className="border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center">

                <User size={22} />

              </div>

              <h3 className="text-xl font-semibold">
                Firebase UID
              </h3>

            </div>

            <p className="text-gray-500 break-all text-sm">

              {user?.uid}

            </p>

          </div>

          {/* ADMIN STATUS */}
          <div className="border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">

                <ShieldCheck size={22} />

              </div>

              <h3 className="text-xl font-semibold">
                Security Status
              </h3>

            </div>

            <p className="text-gray-500">

              {userRole === 'admin'
                ? 'Full administrative privileges enabled.'
                : 'Protected standard user account.'}

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Settings