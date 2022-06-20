import express from 'express'
import controller from '../controllers/grades'

const router = express.Router()

router.get('/', controller.list)
router.post('/sso', controller.sso)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)


export = router