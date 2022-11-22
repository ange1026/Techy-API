const mongoose = require ('mongoose')
const commentSchema = require('./comments')

const newsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        comments: [commentSchema]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model ('News', newsSchema)