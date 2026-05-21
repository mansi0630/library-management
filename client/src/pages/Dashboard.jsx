import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from 'recharts'

const Dashboard = () => {

  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])
  const [issues, setIssues] = useState([])

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {

    try {

      setLoading(true)

      const booksResponse = await axios.get(
        `${API_URL}/api/books`
      )

      const membersResponse = await axios.get(
        `${API_URL}/api/members`
      )

      const issuesResponse = await axios.get(
        `${API_URL}/api/issues`
      )

      setBooks(booksResponse.data)

      setMembers(membersResponse.data)

      setIssues(issuesResponse.data)

    } catch (error) {

      console.log(error)

      toast.error('Failed to load dashboard')

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    fetchData()

  }, [])

  // STATS
  const totalBooks = books.length

  const borrowedBooks = books.filter(
    (book) => !book.available
  ).length

  const availableBooks = books.filter(
    (book) => book.available
  ).length

  const totalMembers = members.length

  // OVERDUE
  const overdueIssues = issues.filter(
    (issue) =>
      !issue.returned &&
      new Date(issue.dueDate) < new Date()
  )

  const overdueCount =
    overdueIssues.length

  // FINES
  const finesCollected = issues
    .filter((issue) => issue.returned)
    .reduce((sum, issue) => sum + (issue.fine || 0), 0)

  const outstandingFines = issues
    .filter((issue) => !issue.returned)
    .reduce((sum, issue) => sum + (issue.fine || 0), 0)

  const stats = [

    {
      title: 'Total Books',
      value: totalBooks,
      color: 'bg-black text-white',
    },

    {
      title: 'Borrowed Books',
      value: borrowedBooks,
      color: 'bg-red-500 text-white',
    },

    {
      title: 'Available Books',
      value: availableBooks,
      color: 'bg-green-500 text-white',
    },

    {
      title: 'Total Members',
      value: totalMembers,
      color: 'bg-blue-500 text-white',
    },

    {
      title: 'Overdue Books',
      value: overdueCount,
      color: 'bg-red-700 text-white',
    },

    {
      title: 'Fines Collected',
      value: `₹${finesCollected}`,
      color: 'bg-amber-600 text-white',
    },

    {
      title: 'Outstanding Fines',
      value: `₹${outstandingFines}`,
      color: 'bg-orange-700 text-white',
    },

  ]

  // PIE CHART
  const availabilityData = [

    {
      name: 'Available',
      value: availableBooks,
    },

    {
      name: 'Borrowed',
      value: borrowedBooks,
    },

  ]

  // CATEGORY DATA
  const categoryData = books.reduce(
    (acc, book) => {

      const existing = acc.find(
        (item) =>
          item.category === book.category
      )

      if (existing) {

        existing.count += 1

      } else {

        acc.push({
          category: book.category,
          count: 1,
        })

      }

      return acc

    },
    []
  )

  // MONTHLY ISSUES DATA
  const monthlyIssuesData = [

    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',

  ].map((month, index) => {

    const count = issues.filter((issue) => {

      const issueDate = new Date(
        issue.createdAt
      )

      return issueDate.getMonth() === index

    }).length

    return {

      month,

      issues: count,

    }

  })

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl sm:text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-3 text-base sm:text-lg">
          Library analytics overview.
        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            Loading Dashboard...
          </h2>

        </div>

      ) : (

        <>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {stats.map((stat) => (

              <div
                key={stat.title}
                className={`${stat.color} rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
              >

                <p className="text-lg opacity-90">
                  {stat.title}
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  {stat.value}
                </h2>

              </div>

            ))}

          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">

            {/* PIE CHART */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

              <h2 className="text-2xl font-bold mb-8">
                Book Availability
              </h2>

              <div className="w-full h-[320px] min-w-0">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={availabilityData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >

                      <Cell fill="#22c55e" />

                      <Cell fill="#ef4444" />

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* BAR CHART */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

              <h2 className="text-2xl font-bold mb-8">
                Categories
              </h2>

              <div className="w-full h-[320px] min-w-0">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={categoryData}>

                    <XAxis dataKey="category" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#000000"
                      radius={[10, 10, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* MONTHLY ISSUES CHART */}
          <div className="mt-16 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-8">
              Monthly Book Issues
            </h2>

            <div className="w-full h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={monthlyIssuesData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="issues"
                    stroke="#000000"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* OVERDUE */}
          {overdueCount > 0 && (

            <div className="mt-16 bg-red-50 border border-red-200 rounded-3xl p-8">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold text-red-600">
                    Overdue Alerts
                  </h2>

                  <p className="text-red-500 mt-2">
                    These books are overdue.
                  </p>

                </div>

                <div className="bg-red-600 text-white px-5 py-3 rounded-2xl font-bold text-xl">

                  {overdueCount}

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {overdueIssues.map((issue) => (

                  <div
                    key={issue._id}
                    className="bg-white border border-red-100 rounded-2xl p-6"
                  >

                    <h3 className="text-2xl font-bold">
                      {issue.book?.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {issue.book?.author}
                    </p>

                    <p className="text-red-500 mt-4 font-medium">

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

          {/* RECENT BOOKS */}
          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-8">
              Recent Books
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {books.slice(0, 3).map((book) => (

                <div
                  key={book._id}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  <img
                    src={book.image}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/300x400?text=No+Image'
                    }}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-2xl font-bold">
                      {book.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      by {book.author}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </>

      )}

    </div>

  )
}

export default Dashboard