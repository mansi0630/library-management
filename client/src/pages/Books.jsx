import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import BookCard from '../components/BookCard'
import AddBookModal from '../components/AddBookModal'

import exportBooksPDF from '../utils/exportBooksPDF'

import { useAuth } from '../context/AuthContext'

const Books = () => {

  const { userRole } = useAuth()

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState('All')

  const [isOpen, setIsOpen] = useState(false)

  // FETCH BOOKS
  const fetchBooks = async () => {

    try {

      setLoading(true)

      const res = await axios.get(
        `${API_URL}/api/books`
      )

      setBooks(
        Array.isArray(res.data)
          ? res.data
          : []
      )

    } catch (error) {

      console.log(error)

      toast.error('Failed to fetch books')

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    fetchBooks()

  }, [])

  // DYNAMIC CATEGORIES
  const categories = [

    'All',

    ...new Set(
      books.map((book) => book.category)
    ),

  ]

  // FILTER BOOKS
  const filteredBooks = books.filter((book) => {

    const matchesSearch = book.title
      ?.toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =

      selectedCategory === 'All'
        ? true
        : book.category === selectedCategory

    return matchesSearch && matchesCategory

  })

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-4xl sm:text-5xl font-bold">
            Books
          </h1>

          <p className="text-gray-500 mt-2 text-base sm:text-lg">
            Manage your library collection.
          </p>

        </div>

        <div className="flex gap-4 w-full md:w-auto">

          {/* EXPORT PDF */}
          <button
            onClick={() =>
              exportBooksPDF(filteredBooks)
            }
            className="bg-white border border-black text-black px-6 py-4 rounded-2xl hover:bg-black hover:text-white transition-all w-full md:w-auto"
          >
            Export PDF
          </button>

          {/* ADMIN ONLY */}
          {userRole === 'admin' && (

            <button
              onClick={() => setIsOpen(true)}
              className="bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all w-full md:w-auto"
            >
              Add Book
            </button>

          )}

        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl outline-none focus:border-black transition-all"
        />

      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap gap-4 mb-10">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-5 py-3 rounded-2xl transition-all ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 hover:border-black'
            }`}
          >
            {category}
          </button>

        ))}

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            Loading Books...
          </h2>

        </div>

      ) : filteredBooks.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredBooks.map((book) => (

            <BookCard
              key={book._id}
              book={book}
              fetchBooks={fetchBooks}
            />

          ))}

        </div>

      ) : (

        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            No Books Found
          </h2>

        </div>

      )}

      {/* ADMIN MODAL */}
      {userRole === 'admin' && (

        <AddBookModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          fetchBooks={fetchBooks}
        />

      )}

    </div>

  )
}

export default Books