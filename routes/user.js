const express = require('express')
const controller = require('../controllers/user')
const passport = require('passport')
const router = express.Router()

router.get('/',passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id',passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.remove)
router.patch('/:id',passport.authenticate('jwt', {session: false}), controller.patch)

module.exports = router
