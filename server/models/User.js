import mongoose from 'mongoose'

const userSchema = mongoose.Schema(

  {

    firebaseUID: {

      type: String,

      required: true,

      unique: true,

    },

    name: {

      type: String,

      required: true,

    },

    email: {

      type: String,

      required: true,

      unique: true,

    },

    role: {

      type: String,

      enum: ['admin', 'staff', 'user'],

      default: 'user',

    },

  },

  {
    timestamps: true,
  }

)

const User = mongoose.model(
  'User',
  userSchema
)

export default User