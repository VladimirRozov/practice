const express = require('express')
const controller = require('../controllers/working_program')
const passport = require('passport')

const router = express.Router()

router.get('/',passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:educationId',passport.authenticate('jwt', {session: false}), controller.getByEducationId)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.remove)//заменить в ВКР
router.post('/',passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id',passport.authenticate('jwt', {session: false}), controller.patch)//заменить в ВКР

module.exports = router
