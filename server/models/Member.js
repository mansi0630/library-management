import mongoose from 'mongoose'

const memberSchema = mongoose.Schema(

  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    borrowedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },

  {
    timestamps: true,
  }
)

const Member = mongoose.model(
  'Member',
  memberSchema
)

export default Member