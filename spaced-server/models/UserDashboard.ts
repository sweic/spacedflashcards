import mongoose from "mongoose";
const { Schema } = mongoose;

const DashboardSchema = new Schema({
  username: String,
  lastUpdated: Date,
  decks: [{ id: String, rrule: String, completion: Number, count: Number }],
});

const UserDashboard = mongoose.model("userdashboard", DashboardSchema);
export default UserDashboard;
