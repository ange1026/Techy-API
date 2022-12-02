// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Example = require('../models/example')
const comments =require('../models/comments')
const News =require('../models/news')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// POST -> only loggedIn users can post comments
router.post('/:newsId', (req, res) => {
    const newsId = req.params.newsId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
     
    News.findById(newsId)
        .then(news => {
            news.comments.push(req.body)
            return news.save()
        })
        .then(news => {
            res.redirect(`/news/${news.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE -> only th author of the comment can delete it.
router.delete('/delete/:newsId/:commId', (req, res) => {
    const newsId = req.params.newsId
    const commId = req.params.commId

    News.findById(newsId)
        .then(news => {
            console.log('news', news)
            const theComment = news.comments.id(commId)
            // console.log('comment found', theComment)

            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    news.save()
                    res.redirect(`/news/${news.id}`)
                }else {
                    const err = 'you%20are%20not%authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                } 
                } else {
                    const err = 'you%20are%20not%authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


module.exports = router 