const express = require('express')
const controller = require('../controllers/educational_program')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.get('/:qualification',  controller.getByQualification)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}),upload.single('document'),controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}),upload.single('document'),controller.patch)


module.exports = router
