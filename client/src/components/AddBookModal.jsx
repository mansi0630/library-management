import API_URL from '../config/api'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddBookModal = ({
  isOpen,
  onClose,
  fetchBooks,
}) => {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    image: '',
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
        `${API_URL}/api/books`,
        formData
      )

      fetchBooks()

      toast.success(
        'Book added successfully'
      )

      onClose()

      setFormData({
        title: '',
        author: '',
        category: '',
        image: '',
      })

    } catch (error) {

      console.log(error)

      toast.error('Something went wrong')

    }
  }

  if (!isOpen) return null

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-3xl p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Add New Book
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all"
          >
            Add Book
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddBookModal