import API_URL from '../config/api'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditMemberModal = ({
  isOpen,
  onClose,
  member,
  fetchMembers,
}) => {

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      phone: '',
    })

  useEffect(() => {

    if (member) {

      setFormData({
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
      })

    }

  }, [member])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.put(
        `${API_URL}/api/members/${member._id}`,
        formData
      )

      toast.success(
        'Member updated successfully'
      )

      fetchMembers()

      onClose()

    } catch (error) {

      console.log(error)

      toast.error(
        'Failed to update member'
      )

    }
  }

  // DELETE MEMBER
  const deleteMember = async () => {

    try {

      await axios.delete(
        `${API_URL}/api/members/${member._id}`
      )

      toast.success(
        'Member deleted successfully'
      )

      fetchMembers()

      onClose()

    } catch (error) {

      console.log(error)

      toast.error(
        'Failed to delete member'
      )

    }
  }

  if (!isOpen) return null

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl w-full max-w-lg p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Edit Member
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black"
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Member Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
          />

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all"
            >
              Update Member
            </button>

            <button
              type="button"
              onClick={deleteMember}
              className="w-full border border-red-500 text-red-500 py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
            >
              Delete
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default EditMemberModal