import mongoose from 'mongoose'
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    token: {id: String, expiry: Date},
    firstName: String,
    lastName: String,
})

const User = mongoose.model('users', userSchema)

export default User
