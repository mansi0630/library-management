import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Members from './pages/Members'
import Issues from './pages/Issues'
import Settings from './pages/Settings'
import GlobalSearch from './pages/GlobalSearch'

import Login from './pages/Login'
import Register from './pages/Register'

import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import AdminRoute from './components/AdminRoute'

import DashboardLayout from './layouts/DashboardLayout'

import SystemUsers from './pages/admin/SystemUsers'

const App = () => {

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Books />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Members />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Issues />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GlobalSearch />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/system-users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <DashboardLayout>
                  <SystemUsers />
                </DashboardLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App