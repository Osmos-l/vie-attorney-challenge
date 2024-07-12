import mongoose from 'mongoose'

const ViolationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Violation', ViolationSchema)
