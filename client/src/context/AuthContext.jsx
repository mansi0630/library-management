import API_URL from '../config/api'
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import axios from 'axios'

import { auth } from '../firebase/firebase'

const AuthContext = createContext()

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null)

  const [userRole, setUserRole] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  // REGISTER
  const register = (
    email,
    password
  ) => {

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
  }

  // LOGIN
  const login = (
    email,
    password
  ) => {

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    )
  }

  // LOGOUT
  const logout = () => {

    return signOut(auth)
  }

  // TRACK USER SESSION
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (currentUser) => {

          setUser(currentUser)

          if (currentUser?.email) {

            try {

              const res =
                await axios.get(
                  `${API_URL}/api/users`
                )

              const dbUser =
                res.data.find(

                  (u) =>

                    u.email
                      .toLowerCase() ===

                    currentUser.email
                      .toLowerCase()

                )

              if (dbUser) {

                setUserRole(
                  dbUser.role
                )

              }

            } catch (error) {

              console.log(error)

            }

          }

          setLoading(false)

        }
      )

    return () => unsubscribe()

  }, [])

  return (

    <AuthContext.Provider
      value={{

        user,

        userRole,

        loading,

        register,

        login,

        logout,

      }}
    >

      {!loading && children}

    </AuthContext.Provider>

  )
}

export const useAuth = () => {

  return useContext(AuthContext)
}