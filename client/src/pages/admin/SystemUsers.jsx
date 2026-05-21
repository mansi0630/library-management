import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { useAuth } from '../../context/AuthContext'

const ManageUsers = () => {

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  const { user } = useAuth()

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/users`
      )

      setUsers(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    fetchUsers()

  }, [])

  // DELETE USER
  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/api/users/${id}`
      )

      fetchUsers()

    } catch (error) {

      console.log(error)

    }
  }

  // CHANGE ROLE
  const changeRole = async (
    id,
    role
  ) => {

    try {

      await axios.put(

        `${API_URL}/api/users/${id}`,

        {

          role,

          currentUserEmail:
            user.email,

        }

      )

      fetchUsers()

    } catch (error) {

      console.log(error)

    }
  }

  // SEARCH USERS
  const filteredUsers =
    users.filter((user) =>

      user.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

    )

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-lg w-full mb-6"
      />

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((userItem) => (

              <tr
                key={userItem._id}
                className="border-b"
              >

                <td className="p-4">
                  {userItem.name}
                </td>

                <td className="p-4">
                  {userItem.email}
                </td>

                <td className="p-4">

                  <select
                    value={userItem.role}
                    onChange={(e) =>
                      changeRole(
                        userItem._id,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded"
                  >

                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteUser(userItem._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ManageUsers