import express from 'express'

import Member from '../models/Member.js'

const router = express.Router()

// GET ALL MEMBERS
router.get('/', async (req, res) => {

  try {

    const members = await Member.find().sort({
      createdAt: -1,
    })

    res.status(200).json(members)

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// ADD MEMBER
router.post('/', async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
    } = req.body

    // VALIDATION
    if (
      !name ||
      !email ||
      !phone
    ) {

      return res.status(400).json({
        success: false,
        message: 'Please fill all fields',
      })

    }

    // CHECK EXISTING MEMBER
    const existingMember =
      await Member.findOne({ email })

    if (existingMember) {

      return res.status(400).json({
        success: false,
        message: 'Member already exists',
      })

    }

    // CREATE MEMBER
    const member = new Member({
      name,
      email,
      phone,
    })

    const createdMember =
      await member.save()

    res.status(201).json({
      success: true,
      message: 'Member added successfully',
      member: createdMember,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// DELETE MEMBER
router.delete('/:id', async (req, res) => {

  try {

    const member = await Member.findById(
      req.params.id
    )

    if (!member) {

      return res.status(404).json({
        success: false,
        message: 'Member not found',
      })

    }

    await member.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Member deleted successfully',
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})

export default router