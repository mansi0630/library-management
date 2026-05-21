import express from 'express'

import User from '../models/User.js'

const router = express.Router()

// CREATE USER
router.post('/', async (req, res) => {

  try {

    const {
      firebaseUID,
      name,
      email,
    } = req.body

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email })

    if (existingUser) {

      return res.status(200).json(
        existingUser
      )

    }

    // CREATE USER
    const user = await User.create({

      firebaseUID,

      name,

      email,

      role: 'user',

    })

    res.status(201).json(user)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: error.message,

    })

  }
})

// GET ALL USERS
router.get('/', async (req, res) => {

  try {

    const users = await User.find()

    res.status(200).json(users)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: error.message,

    })

  }
})

// GET SINGLE USER
router.get('/:id', async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    )

    if (!user) {

      return res.status(404).json({

        message: 'User not found',

      })

    }

    res.status(200).json(user)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: error.message,

    })

  }
})

// UPDATE USER ROLE (ADMIN ONLY)
router.put('/:id', async (req, res) => {

  try {

    const {
      role,
      currentUserEmail,
    } = req.body

    // FIND CURRENT USER
    const currentUser =
      await User.findOne({

        email: currentUserEmail,

      })

    // SECURITY CHECK
    if (
      !currentUser ||
      currentUser.role !== 'admin'
    ) {

      return res.status(403).json({

        success: false,

        message:
          'Access denied. Admin only.',

      })

    }

    // UPDATE TARGET USER
    const user =
      await User.findByIdAndUpdate(

        req.params.id,

        { role },

        { new: true }

      )

    if (!user) {

      return res.status(404).json({

        message: 'User not found',

      })

    }

    res.status(200).json(user)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: error.message,

    })

  }
})

// DELETE USER
router.delete('/:id', async (req, res) => {

  try {

    const user =
      await User.findByIdAndDelete(
        req.params.id
      )

    if (!user) {

      return res.status(404).json({

        message: 'User not found',

      })

    }

    res.status(200).json({

      success: true,

      message: 'User deleted',

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: error.message,

    })

  }
})

export default router