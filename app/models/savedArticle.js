const mongoose = require ('mongoose')

const savedArticlesSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            unique: true,
        }
    }
)

module.exports = savedArticlesSchema