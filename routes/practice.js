const express = require('express')
const controller = require('../controllers/practice')
const upload = require('../middleware/upload')
const passport = require('passport')
const router = express.Router()

router.get('/:workingId',passport.authenticate('jwt', {session: false}), controller.getByWorkingId)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/',passport.authenticate('jwt', {session: false}),upload.single('document'), controller.create)
router.patch('/:id',passport.authenticate('jwt', {session: false}),upload.single('document'), controller.patch)

module.exports = router
