import express from 'express'

import Issue from '../models/Issue.js'
import Book from '../models/Book.js'

const router = express.Router()

// GET ALL ISSUES
router.get('/', async (req, res) => {

  try {

    const issues = await Issue.find()

      .populate(
        'book',
        'title author image category'
      )

      .populate(
        'member',
        'name email phone'
      )

      .sort({
        createdAt: -1,
      })

    // DYNAMIC REAL-TIME FINE CALCULATION FOR ACTIVE ISSUES
    const today = new Date()
    const updatedIssues = issues.map((issue) => {
      const issueObj = issue.toObject()
      
      if (!issueObj.returned && today > new Date(issueObj.dueDate)) {
        const lateDays = Math.ceil(
          (today - new Date(issueObj.dueDate)) /
          (1000 * 60 * 60 * 24)
        )
        issueObj.fine = lateDays * 10
      }
      return issueObj
    })

    res.status(200).json(updatedIssues)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})

// CREATE ISSUE
router.post('/', async (req, res) => {

  try {

    const {
      bookId,
      memberId,
      issueDays,
    } = req.body

    // CHECK BOOK
    const book = await Book.findById(
      bookId
    )

    if (!book) {

      return res.status(404).json({
        message: 'Book not found',
      })

    }

    // CHECK AVAILABILITY
    if (!book.available) {

      return res.status(400).json({
        message: 'Book already issued',
      })

    }

    // VALIDATION
    if (!issueDays || issueDays <= 0) {

      return res.status(400).json({
        message: 'Invalid issue duration',
      })

    }

    // DUE DATE
    const dueDate = new Date()

    dueDate.setDate(
      dueDate.getDate() + Number(issueDays)
    )

    // CREATE ISSUE
    const issue = await Issue.create({

      book: bookId,

      member: memberId,

      dueDate,

      issueDays,

    })

    // UPDATE BOOK
    book.available = false

    await book.save()

    res.status(201).json({
      success: true,
      message: 'Book issued successfully',
      issue,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})

// RETURN BOOK
router.put('/return/:id', async (req, res) => {

  try {

    const issue = await Issue.findById(
      req.params.id
    )

    if (!issue) {

      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      })

    }

    // ALREADY RETURNED
    if (issue.returned) {

      return res.status(400).json({
        success: false,
        message: 'Book already returned',
      })

    }

    // FIX OLD ISSUES
    if (!issue.issueDays) {

      issue.issueDays = 7

    }

    // MARK RETURNED
    issue.returned = true

    issue.returnDate = new Date()

    // CALCULATE FINE
    const today = new Date()

    if (today > issue.dueDate) {

      const lateDays = Math.ceil(
        (today - issue.dueDate) /
        (1000 * 60 * 60 * 24)
      )

      issue.fine = lateDays * 10

    }

    await issue.save()

    // UPDATE BOOK
    const book = await Book.findById(
      issue.book
    )

    if (book) {

      book.available = true

      await book.save()

    }

    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      issue,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})

// PAY OR WAIVE FINE
router.put('/pay-fine/:id', async (req, res) => {

  try {

    const issue = await Issue.findById(
      req.params.id
    )

    if (!issue) {

      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      })

    }

    // SET FINE TO ZERO
    issue.fine = 0

    await issue.save()

    res.status(200).json({
      success: true,
      message: 'Fine settled successfully',
      issue,
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