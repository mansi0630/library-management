import mongoose from 'mongoose'

const issueSchema = mongoose.Schema(

  {
    book: {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'Book',

      required: true,

    },

    member: {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'Member',

      required: true,

    },

    issueDate: {

      type: Date,

      default: Date.now,

    },

    dueDate: {

      type: Date,

      required: true,

    },

    // ISSUE DURATION
    issueDays: {

      type: Number,

      required: true,

    },

    returnDate: {

      type: Date,

    },

    returned: {

      type: Boolean,

      default: false,

    },

    fine: {

      type: Number,

      default: 0,

    },

  },

  {
    timestamps: true,
  }

)

const Issue = mongoose.model(
  'Issue',
  issueSchema
)

export default Issue