import API_URL from '../config/api'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'

import BorrowBookModal from './BorrowBookModal'
import EditBookModal from './EditBookModal'

import { useAuth } from '../context/AuthContext'

const BookCard = ({
  book,
  fetchBooks,
}) => {

  const { userRole } = useAuth()

  const [isBorrowOpen, setIsBorrowOpen] =
    useState(false)

  const [isEditOpen, setIsEditOpen] =
    useState(false)

  // DELETE BOOK
  const handleDelete = async () => {

    try {

      await axios.delete(
        `${API_URL}/api/books/${book._id}`
      )

      toast.success('Book deleted')

      fetchBooks()

    } catch (error) {

      console.log(error)

      toast.error('Failed to delete book')

    }
  }

  // RETURN BOOK
  const handleReturn = async () => {

    try {

      await axios.put(
        `${API_URL}/api/books/return/${book._id}`
      )

      toast.success('Book returned')

      fetchBooks()

    } catch (error) {

      console.log(error)

      toast.error('Failed to return book')

    }
  }

  return (

    <>
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        {/* IMAGE */}
        <div className="overflow-hidden">

          <img
            src={book.image}
            alt={book.title}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/300x400?text=No+Image'
            }}
            className="w-full h-72 object-cover hover:scale-105 transition-all duration-500"
          />

        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* TOP */}
          <div className="flex items-center justify-between gap-3">

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
              {book.category}
            </span>

            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                book.available
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-500'
              }`}
            >
              {book.available
                ? 'Available'
                : 'Borrowed'}
            </span>

          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-bold mt-5 line-clamp-2">
            {book.title}
          </h2>

          {/* AUTHOR */}
          <p className="text-gray-500 mt-2">
            by {book.author}
          </p>

          {/* DESCRIPTION */}
          {book.description && (

            <p className="text-gray-500 text-sm mt-4 line-clamp-3">
              {book.description}
            </p>

          )}

          {/* BORROW INFO */}
          {!book.available && (

            <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-3">

              <p className="text-sm text-red-500 font-medium">
                Currently Issued
              </p>

            </div>

          )}

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 mt-6">

            {book.available ? (

              <button
                onClick={() =>
                  setIsBorrowOpen(true)
                }
                className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition-all"
              >
                Issue Book
              </button>

            ) : (

              <button
                onClick={handleReturn}
                className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700 transition-all"
              >
                Return Book
              </button>

            )}

            {/* ADMIN BUTTONS */}
            {userRole === 'admin' && (

              <>

                {/* EDIT BUTTON */}
                <button
                  onClick={() =>
                    setIsEditOpen(true)
                  }
                  className="w-full border border-black text-black py-3 rounded-2xl hover:bg-black hover:text-white transition-all"
                >
                  Edit Book
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={handleDelete}
                  className="w-full border border-red-500 text-red-500 py-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                >
                  Delete Book
                </button>

              </>

            )}

          </div>

        </div>

      </div>

      {/* BORROW MODAL */}
      <BorrowBookModal
        isOpen={isBorrowOpen}
        onClose={() =>
          setIsBorrowOpen(false)
        }
        book={book}
        fetchBooks={fetchBooks}
      />

      {/* EDIT MODAL */}
      <EditBookModal
        isOpen={isEditOpen}
        onClose={() =>
          setIsEditOpen(false)
        }
        book={book}
        fetchBooks={fetchBooks}
      />
    </>

  )
}



export default BookCard
