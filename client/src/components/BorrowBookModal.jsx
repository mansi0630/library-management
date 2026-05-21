import API_URL from '../config/api'
import { useEffect, useState } from 'react'

import axios from 'axios'

import toast from 'react-hot-toast'

const BorrowBookModal = ({
  isOpen,
  onClose,
  book,
  fetchBooks,
}) => {

  const [members, setMembers] = useState([])

  const [selectedMember, setSelectedMember] =
    useState('')

  // NEW
  const [issueDays, setIssueDays] =
    useState(7)

  const [loading, setLoading] = useState(false)

  // FETCH MEMBERS
  const fetchMembers = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/api/members`
      )

      setMembers(response.data)

    } catch (error) {

      console.log(error)

      toast.error('Failed to fetch members')

    }
  }

  useEffect(() => {

    if (isOpen) {

      fetchMembers()

    }

  }, [isOpen])

  // ISSUE BOOK
  const handleIssue = async () => {

    if (!selectedMember) {

      return toast.error(
        'Select a member'
      )

    }

    if (!issueDays || issueDays <= 0) {

      return toast.error(
        'Enter valid issue duration'
      )

    }

    try {

      setLoading(true)

      await axios.post(
        `${API_URL}/api/issues`,
        {
          bookId: book._id,
          memberId: selectedMember,
          issueDays,
        }
      )

      toast.success(
        'Book issued successfully 📚'
      )

      fetchBooks()

      onClose()

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        'Failed to issue book'
      )

    } finally {

      setLoading(false)

    }
  }

  if (!isOpen) return null

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="bg-white rounded-3xl p-8 w-full max-w-md">

        {/* HEADER */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Issue Book
          </h2>

          <p className="text-gray-500 mt-2">
            Select member and duration.
          </p>

        </div>

        {/* BOOK */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">

          <h3 className="text-xl font-bold">
            {book.title}
          </h3>

          <p className="text-gray-500 mt-1">
            {book.author}
          </p>

        </div>

        {/* MEMBER SELECT */}
        <div className="mb-5">

          <label className="block text-sm font-medium mb-2">
            Select Member
          </label>

          <select
            value={selectedMember}
            onChange={(e) =>
              setSelectedMember(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black"
          >

            <option value="">
              Select Member
            </option>

            {members.map((member) => (

              <option
                key={member._id}
                value={member._id}
              >
                {member.name}
              </option>

            ))}

          </select>

        </div>

        {/* ISSUE DURATION */}
        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">
            Issue Duration (Days)
          </label>

          <input
            type="number"
            min="1"
            value={issueDays}
            onChange={(e) =>
              setIssueDays(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black"
          />

        </div>

        {/* ISSUE INFO */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6">

          <p className="text-sm text-gray-600">

            Issue Date:

            <span className="font-semibold text-black ml-1">
              {new Date().toLocaleDateString()}
            </span>

          </p>

          <p className="text-sm text-gray-600 mt-2">

            Due Date:

            <span className="font-semibold text-black ml-1">
              {
                new Date(
                  Date.now() +
                  issueDays * 24 * 60 * 60 * 1000
                ).toLocaleDateString()
              }
            </span>

          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-4 rounded-2xl hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleIssue}
            disabled={loading}
            className="flex-1 bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all disabled:opacity-50"
          >

            {loading
              ? 'Issuing...'
              : 'Issue Book'}

          </button>

        </div>

      </div>

    </div>

  )
}

export default BorrowBookModal