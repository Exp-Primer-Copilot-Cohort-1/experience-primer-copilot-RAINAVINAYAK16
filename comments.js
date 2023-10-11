// Create web server

// require modules
const express = require('express')
const router = express.Router()
const Comment = require('../../models/comment')

// create new comment
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.body.restaurantId
  const comment = req.body.text

  return Comment.create({
    userId,
    restaurantId,
    comment
  })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

// delete comment
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const commentId = req.params.id

  return Comment.findOne({ _id: commentId, userId })
    .then(comment => comment.remove())
    .then(() => res.redirect('back'))
    .catch(error => console.log(error))
})

// export router
module.exports = router