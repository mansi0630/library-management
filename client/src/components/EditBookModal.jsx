import API_URL from '../config/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditBookModal = ({
  isOpen,
  onClose,
  book,
  fetchBooks,
}) => {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    image: '',
    available: true,
  })

  useEffect(() => {

    if (book) {

      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        image: book.image,
        available: book.available,
      })

    }

  }, [book])

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.put(
        `${API_URL}/api/books/${book._id}`,
        formData
      )

      fetchBooks()

      onClose()

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
            Edit Book
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
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />

            Available

          </label>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl"
          >
            Update Book
          </button>

        </form>

      </div>

    </div>

  )
}

export default EditBookModal