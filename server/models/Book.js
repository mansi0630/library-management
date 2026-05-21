import mongoose from 'mongoose'

const bookSchema = mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: '',
    },

    available: {
      type: Boolean,
      default: true,
    },

    borrowedBy: {
      type: String,
      default: '',
    },

    quantity: {
      type: Number,
      default: 1,
    },

    publishedYear: {
      type: Number,
      default: null,
    },

  },

  {
    timestamps: true,
  }

)

const Book = mongoose.model(
  'Book',
  bookSchema
)

export default Book