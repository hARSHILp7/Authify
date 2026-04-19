import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type:       String,
            required:   [true, "Name is required"],
            trim:       true,
            minlength:  [2, "Name must be at least 2 characters"],
        },
        username: {
            type:       String,
            required:   [true, "Username is required"],
            unique:     true,
            trim:       true,
            minlength:  [3, "Username must be at least 3 characters"],
            match: [
                /^[a-zA-Z0-9_]+$/,
                'Username can only contain letters, numbers, and underscores',
            ],
        },
        email: {
            type:       String,
            required:   [true, "Email is required"],
            unique:     true,
            trim:       true,
            lowercase:  true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type:       String,
            required:   [true, "Password is required"],
            minlength:  [6, "Password must be at least 6 characters"],
        },
    },
    {
        timestamps: true,       // adds createdAt and updatedAt automatically
    }
)

const User = mongoose.model("User", userSchema)

export default User