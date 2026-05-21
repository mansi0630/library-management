import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import AddMemberModal from '../components/AddMemberModal'
import EditMemberModal from '../components/EditMemberModal'

const Members = () => {

  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  // EDIT STATES
  const [isEditOpen, setIsEditOpen] =
    useState(false)

  const [selectedMember, setSelectedMember] =
    useState(null)

  const [issues, setIssues] = useState([])

  // FETCH MEMBERS & ISSUES
  const fetchMembers = async () => {

    try {

      setLoading(true)

      const [membersRes, issuesRes] = await Promise.all([
        axios.get(`${API_URL}/api/members`),
        axios.get(`${API_URL}/api/issues`)
      ])

      setMembers(membersRes.data)
      setIssues(issuesRes.data)

    } catch (error) {

      console.log(error)

      toast.error('Failed to fetch library data')

    } finally {

      setLoading(false)

    }
  }

  // DELETE MEMBER
  const deleteMember = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/api/members/${id}`
      )

      toast.success('Member deleted')

      fetchMembers()

    } catch (error) {

      console.log(error)

      toast.error('Failed to delete member')

    }
  }

  useEffect(() => {

    fetchMembers()

  }, [])

  // SEARCH FILTER
  const filteredMembers = members.filter(
    (member) =>
      member.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      member.email
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-4xl sm:text-5xl font-bold">
            Members
          </h1>

          <p className="text-gray-500 mt-2 text-base sm:text-lg">
            Manage library members.
          </p>

        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all w-full md:w-auto"
        >
          Add Member
        </button>

      </div>

      {/* SEARCH */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl outline-none focus:border-black transition-all"
        />

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            Loading Members...
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Please wait a moment.
          </p>

        </div>

      ) : (

        <>
          {/* MEMBERS GRID */}
          {filteredMembers.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredMembers.map((member) => (

                <div
                  key={member._id}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* AVATAR */}
                  <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold mb-6">

                    {member.name.charAt(0)}

                  </div>

                  {/* NAME */}
                  <h2 className="text-3xl font-bold">
                    {member.name}
                  </h2>

                  {/* EMAIL */}
                  <p className="text-gray-500 mt-4 break-all">
                    {member.email}
                  </p>

                  {/* PHONE */}
                  <p className="text-gray-500 mt-2">
                    {member.phone}
                  </p>

                  {/* MEMBER FINES STATUS */}
                  {(() => {
                    const memberIssues = issues.filter(issue => issue.member?._id === member._id)
                    const outstanding = memberIssues
                      .filter(issue => !issue.returned)
                      .reduce((sum, issue) => sum + (issue.fine || 0), 0)
                    const settled = memberIssues
                      .filter(issue => issue.returned)
                      .reduce((sum, issue) => sum + (issue.fine || 0), 0)

                    return (
                      <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between text-sm">
                        <div>
                          <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">Outstanding</p>
                          <p className={`font-bold mt-1 text-lg ${outstanding > 0 ? 'text-red-500' : 'text-gray-700'}`}>
                            ₹{outstanding}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">Fines Settled</p>
                          <p className="text-gray-700 font-bold mt-1 text-lg">
                            ₹{settled}
                          </p>
                        </div>
                      </div>
                    )
                  })()}

                  {/* MEMBER ID */}
                  <p className="text-sm text-gray-400 mt-4">
                    Member ID: {member._id.slice(-6)}
                  </p>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => {

                      setSelectedMember(member)

                      setIsEditOpen(true)

                    }}
                    className="w-full mt-8 border border-black text-black py-3 rounded-2xl hover:bg-black hover:text-white transition-all"
                  >
                    Edit Member
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() =>
                      deleteMember(member._id)
                    }
                    className="w-full mt-4 border border-red-500 text-red-500 py-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    Delete Member
                  </button>

                </div>

              ))}

            </div>

          ) : (

            <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">

              <h2 className="text-3xl font-bold">
                No Members Found
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Try another search or add members.
              </p>

            </div>

          )}
        </>

      )}

      {/* ADD MEMBER MODAL */}
      <AddMemberModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fetchMembers={fetchMembers}
      />

      {/* EDIT MEMBER MODAL */}
      <EditMemberModal
        isOpen={isEditOpen}
        onClose={() =>
          setIsEditOpen(false)
        }
        member={selectedMember}
        fetchMembers={fetchMembers}
      />

    </div>

  )
}

export default Members