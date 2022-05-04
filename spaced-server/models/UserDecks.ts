import mongoose from 'mongoose'
const {Schema} = mongoose

const userDeckSchema = new Schema({
    username: String,
    total: Number,
    decks: []

})

const UserDeck = mongoose.model('userdeck', userDeckSchema)
export default UserDeck