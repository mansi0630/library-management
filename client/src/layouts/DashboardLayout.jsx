import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">

        <Topbar />

        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout