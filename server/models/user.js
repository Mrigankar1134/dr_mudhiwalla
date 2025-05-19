// server/models/user.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  phone:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin','professional'], required: true }
})

export default mongoose.model('User', userSchema)