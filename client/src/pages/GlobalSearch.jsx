import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const GlobalSearch = () => {

  const [query, setQuery] = useState('')

  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])
  const [issues, setIssues] = useState([])

  // FETCH ALL DATA
  useEffect(() => {

    const fetchData = async () => {

      try {

        const booksRes = await axios.get(
          `${API_URL}/api/books`
        )

        const membersRes = await axios.get(
          `${API_URL}/api/members`
        )

        const issuesRes = await axios.get(
          `${API_URL}/api/issues`
        )

        setBooks(booksRes.data)
        setMembers(membersRes.data)
        setIssues(issuesRes.data)

      } catch (error) {

        console.log(error)

      }
    }

    fetchData()

  }, [])

  // FILTERS
  const filteredBooks = books.filter((book) =>

    book.title
      ?.toLowerCase()
      .includes(query.toLowerCase())

  )

  const filteredMembers = members.filter((member) =>

    member.name
      ?.toLowerCase()
      .includes(query.toLowerCase())

  )

  const filteredIssues = issues.filter((issue) =>

    issue.book?.title
      ?.toLowerCase()
      .includes(query.toLowerCase())

  )

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Global Search
        </h1>

        <p className="text-gray-500 mt-2">
          Search books, members & issues.
        </p>

      </div>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search everything..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl outline-none focus:border-black transition-all mb-10"
      />

      {/* BOOKS */}
      {query && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6">
            Books
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredBooks.map((book) => (

              <div
                key={book._id}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >

                <h3 className="text-xl font-bold">
                  {book.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {book.author}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* MEMBERS */}
      {query && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6">
            Members
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredMembers.map((member) => (

              <div
                key={member._id}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >

                <h3 className="text-xl font-bold">
                  {member.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {member.email}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* ISSUES */}
      {query && (

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Issues
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredIssues.map((issue) => (

              <div
                key={issue._id}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >

                <h3 className="text-xl font-bold">
                  {issue.book?.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  Due:
                  {' '}

                  {new Date(
                    issue.dueDate
                  ).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  )
}

export default GlobalSearch