import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import FeatureCard from '../components/FeatureCard'
import StatsCard from '../components/StatsCard'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <Navbar />

      {/* Hero Section */}
      <section className="px-6 sm:px-8 md:px-16 py-16 md:py-24">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left Content */}
          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-gray-100 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              Smart Library Management
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight mt-6"
            >
              Manage Your
              <br />
              Library Smarter
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-base sm:text-lg mt-6 max-w-xl leading-relaxed"
            >
              A modern and intuitive library management platform
              designed to simplify book tracking, member handling,
              and borrowing experience.
            </motion.p>

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
            >
                
                <Link to="/books">
                
                <button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-7 py-3 rounded-2xl transition-all duration-300">
                    Explore Books
                    </button>
                    
                    </Link>
                    <Link to="/dashboard">
                    
                    <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 px-7 py-3 rounded-2xl transition-all duration-300">
                        Learn More
                        </button>
                        
                        </Link>
                        
                        </motion.div>

          </div>

          {/* Right Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm w-full"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl sm:text-2xl font-semibold">
                Dashboard
              </h2>

              <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
                A
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              <div className="border border-gray-200 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Total Books
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                  1,248
                </h3>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Members
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                  532
                </h3>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Issued
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                  156
                </h3>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Overdue
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                  23
                </h3>
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* Features Section */}
      <section className="px-6 sm:px-8 md:px-16 py-20 md:py-24">

        <div className="text-center">

          <p className="text-gray-500 font-medium">
            FEATURES
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
            Everything You Need
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-sm sm:text-base">
            Powerful tools to manage books, users,
            analytics, and borrowing workflows efficiently.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <FeatureCard
            title="Book Management"
            description="Add, update, organize, and track books effortlessly."
          />

          <FeatureCard
            title="Issue & Return"
            description="Manage borrowing records and due dates seamlessly."
          />

          <FeatureCard
            title="Analytics Dashboard"
            description="Get insights into usage, overdue books, and activity."
          />

        </div>

      </section>

      {/* Stats Section */}
      <section className="px-6 sm:px-8 md:px-16 pb-20 md:pb-24">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          <StatsCard
            title="Books"
            value="1.2K+"
          />

          <StatsCard
            title="Members"
            value="500+"
          />

          <StatsCard
            title="Books Issued"
            value="15K+"
          />

          <StatsCard
            title="Libraries"
            value="20+"
          />

        </div>

      </section>

    </div>
  )
}

export default Home