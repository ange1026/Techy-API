
const mongoose = require ('mongoose')

const articlesSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
    timestamps: true
    }
)

module.exports = articlesSchema