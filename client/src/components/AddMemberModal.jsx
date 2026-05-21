import API_URL from '../config/api'
import { useState } from 'react'
import axios from 'axios'

const AddMemberModal = ({
  isOpen,
  onClose,
  fetchMembers,
}) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        `${API_URL}/api/members`,
        formData
      )

      fetchMembers()

      onClose()

      setFormData({
        name: '',
        email: '',
        phone: '',
      })

    } catch (error) {

      console.log(error)

    }
  }

  if (!isOpen) return null

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-3xl p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Add Member
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

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
            className="w-full border border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-black"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all"
          >
            Add Member
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddMemberModal