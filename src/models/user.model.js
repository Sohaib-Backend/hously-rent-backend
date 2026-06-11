import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = newSchema({
    username: {
        trype: String,
        unique: true,
        required: true, lowercase: true, trim: true, index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    profilePicture: {
        type: String,
    },
    coverPicture: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },],
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
}
export default mongoose.model("User", userSchema)