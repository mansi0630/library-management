import express from 'express'

import Book from '../models/Book.js'

const router = express.Router()

// GET ALL BOOKS
router.get('/', async (req, res) => {

  try {

    const books = await Book.find().sort({
      createdAt: -1,
    })

    res.status(200).json(books)

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// ADD BOOK
router.post('/', async (req, res) => {

  try {

    const {
      title,
      author,
      category,
      image,
      description,
      quantity,
      publishedYear,
    } = req.body

    // VALIDATION
    if (
      !title ||
      !author ||
      !category ||
      !image
    ) {

      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      })

    }

    // CREATE BOOK
    const book = new Book({
      title,
      author,
      category,
      image,
      description,
      quantity,
      publishedYear,
    })

    const createdBook = await book.save()

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      book: createdBook,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// DELETE BOOK
router.delete('/:id', async (req, res) => {

  try {

    const book = await Book.findById(
      req.params.id
    )

    if (!book) {

      return res.status(404).json({
        success: false,
        message: 'Book not found',
      })

    }

    await book.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// UPDATE BOOK
router.put('/:id', async (req, res) => {

  try {

    const {
      title,
      author,
      category,
      image,
      description,
      available,
      quantity,
      publishedYear,
    } = req.body

    const book = await Book.findById(
      req.params.id
    )

    if (!book) {

      return res.status(404).json({
        success: false,
        message: 'Book not found',
      })

    }

    // UPDATE FIELDS
    book.title = title || book.title
    book.author = author || book.author
    book.category = category || book.category
    book.image = image || book.image
    book.description =
      description || book.description

    book.available =
      available ?? book.available

    book.quantity =
      quantity || book.quantity

    book.publishedYear =
      publishedYear || book.publishedYear

    const updatedBook = await book.save()

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      book: updatedBook,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// BORROW BOOK
router.put('/borrow/:id', async (req, res) => {

  try {

    const { memberName } = req.body

    if (!memberName) {

      return res.status(400).json({
        success: false,
        message: 'Member name required',
      })

    }

    const book = await Book.findById(
      req.params.id
    )

    if (!book) {

      return res.status(404).json({
        success: false,
        message: 'Book not found',
      })

    }

    if (!book.available) {

      return res.status(400).json({
        success: false,
        message: 'Book already borrowed',
      })

    }

    // BORROW LOGIC
    book.available = false
    book.borrowedBy = memberName

    await book.save()

    res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      book,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})


// RETURN BOOK
router.put('/return/:id', async (req, res) => {

  try {

    const book = await Book.findById(
      req.params.id
    )

    if (!book) {

      return res.status(404).json({
        success: false,
        message: 'Book not found',
      })

    }

    // RETURN LOGIC
    book.available = true
    book.borrowedBy = ''

    await book.save()

    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      book,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
})

export default router