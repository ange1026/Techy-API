// import dependencies
const mongoose = require ('./connection')

// import user model for populate
const  { Schema } = mongoose

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

// export model
module.exports = commentSchema