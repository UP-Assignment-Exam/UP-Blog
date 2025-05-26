const { db, mongoose } = require("./settings/connection")
const validator = require("validator")

// Employee account
const UserSchema = mongoose.Schema(
    {
        isDeleted: { type: Boolean, default: false },
        username: {
            type: String,
            required: [true, "Username must not be null"],
            trim: true,
        },
        password: { type: String, trim: true },
        email: {
            type: String,
            required: [true, "Email must not be null"],
            trim: true,
            validate: {
                validator: (v) => validator.isEmail(v),
                message: "Invalid email format",
            },
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
)

module.exports = db.model("authors", UserSchema)
