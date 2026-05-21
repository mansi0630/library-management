import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Issues = () => {

  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] =
    useState('All')

  // FETCH ISSUES
  const fetchIssues = async (showSpinner = false) => {

    try {

      if (showSpinner) {
        setLoading(true)
      }

      const res = await axios.get(
        `${API_URL}/api/issues`
      )

      setIssues(res.data)

    } catch (error) {

      console.log(error)

      // Only toast error on active foreground loading
      if (showSpinner) {
        toast.error('Failed to load issues')
      }

    } finally {

      if (showSpinner) {
        setLoading(false)
      }

    }
  }

  useEffect(() => {

    fetchIssues(true)

    const interval = setInterval(() => {

      fetchIssues(false)

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  // RETURN BOOK
  const handleReturn = async (id) => {

    try {

      await axios.put(
        `${API_URL}/api/issues/return/${id}`
      )

      toast.success(
        'Book returned successfully 📚'
      )

      fetchIssues()

    } catch (error) {

      console.log(error)

      toast.error(
        'Failed to return book'
      )

    }
  }

  // SETTLE FINE
  const handleSettleFine = async (id) => {

    try {

      await axios.put(
        `${API_URL}/api/issues/pay-fine/${id}`
      )

      toast.success(
        'Fine settled successfully 💰'
      )

      fetchIssues()

    } catch (error) {

      console.log(error)

      toast.error(
        'Failed to settle fine'
      )

    }
  }

  // FILTER ISSUES
  const filteredIssues = issues.filter(
    (issue) => {

      const isOverdue =
        !issue.returned &&
        new Date(issue.dueDate) < new Date()

      if (filter === 'Active') {

        return !issue.returned && !isOverdue

      }

      if (filter === 'Returned') {

        return issue.returned

      }

      if (filter === 'Overdue') {

        return isOverdue

      }

      return true

    }
  )

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Issues
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Manage borrowed books and returns.
        </p>

      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-8 flex-wrap">

        {[
          'All',
          'Active',
          'Returned',
          'Overdue',
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            className={`px-5 py-3 rounded-2xl transition-all ${
              filter === item
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 hover:border-black'
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            Loading Issues...
          </h2>

        </div>

      ) : filteredIssues.length === 0 ? (

        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            No Issues Found
          </h2>

          <p className="text-gray-500 mt-3">
            No records available for this filter.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredIssues.map((issue) => {

            const isOverdue =
              !issue.returned &&
              new Date(issue.dueDate) < new Date()

            return (

              <div
                key={issue._id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all"
              >

                {/* BOOK */}
                <h2 className="text-2xl font-bold">
                  {issue.book?.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  by {issue.book?.author}
                </p>

                {/* MEMBER */}
                <div className="mt-5 text-sm text-gray-600">

                  Issued To:

                  <span className="font-semibold ml-1 text-black">
                    {issue.member?.name}
                  </span>

                </div>

                {/* ISSUE DETAILS */}
                <div className="mt-4 space-y-2 text-sm text-gray-600">

                  <p>

                    Issued On:

                    <span className="font-semibold ml-1 text-black">
                      {
                        new Date(
                          issue.createdAt
                        ).toLocaleDateString()
                      }
                    </span>

                  </p>

                  <p>

                    Due Till:

                    <span className="font-semibold ml-1 text-black">
                      {
                        new Date(
                          issue.dueDate
                        ).toLocaleDateString()
                      }
                    </span>

                  </p>

                  <p>

                    Duration:

                    <span className="font-semibold ml-1 text-black">
                      {issue.issueDays} Days
                    </span>

                  </p>

                </div>

                {/* STATUS */}
                <div className="mt-5">

                  {issue.returned ? (

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      Returned
                    </span>

                  ) : isOverdue ? (

                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      Overdue
                    </span>

                  ) : (

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>

                  )}

                </div>

                {/* FINE */}
                {issue.fine > 0 && (

                  <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between">

                    <div>

                      <p className="text-xs text-red-500 font-medium uppercase tracking-wider">
                        {issue.returned ? 'Unpaid Fine' : 'Accumulated Fine'}
                      </p>

                      <p className="text-xl font-bold text-red-600 mt-0.5">
                        ₹{issue.fine}
                      </p>

                    </div>

                    {issue.returned && (

                      <button
                        onClick={() => handleSettleFine(issue._id)}
                        className="bg-red-600 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all cursor-pointer shadow-sm hover:shadow"
                      >
                        Settle Fine
                      </button>

                    )}

                  </div>

                )}

                {/* RETURN BUTTON */}
                {!issue.returned && (

                  <button
                    onClick={() =>
                      handleReturn(issue._id)
                    }
                    className="w-full mt-6 bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition-all"
                  >
                    Return Book
                  </button>

                )}

              </div>

            )

          })}

        </div>

      )}

    </div>

  )
}

export default Issues