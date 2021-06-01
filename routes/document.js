const express = require('express')
const controller = require('../controllers/document')
const upload = require('../middleware/upload')
const passport = require('passport')
const router = express.Router()

router.get('/:chapterId', controller.getByChapter)
router.get('/:id', controller.getById)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/',passport.authenticate('jwt', {session: false}),upload.single('document'), controller.create)

module.exports = router