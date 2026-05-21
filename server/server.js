import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import bookRoutes from './routes/bookRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import issueRoutes from './routes/issueRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

// DATABASE
connectDB()

// MIDDLEWARE
app.use(cors())

app.use(express.json())

// ROUTES
app.use('/api/books', bookRoutes)

app.use('/api/members', memberRoutes)

app.use('/api/issues', issueRoutes)

// NEW USER ROUTES
app.use('/api/users', userRoutes)

// TEST ROUTE
app.get('/', (req, res) => {

  res.send('Library API Running ')

})

// 404 HANDLER
app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: 'Route not found',
  })

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  )

})