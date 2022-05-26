import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    address: String,
    addressNumber: String,
    phoneNumber: String,
});

const Users = mongoose.model("users", UserSchema);

export { Users }
