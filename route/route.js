import express from 'express';
import { createUser, findAndUpdate, findById, finddelete, findOne, findUser, updatemany } from '../controller/controller.js';
import { upload } from '../middleware/multer.js'
const router=express.Router()



router.post('/newuser',upload.single('pic') ,createUser)
router.get('/user/:name',findUser)
router.get('/user/find/:name',findOne)
router.get('/user/id/:id',findById)
router.patch('/user/update/:id',findAndUpdate )
router.patch('/users/age/:age',updatemany)
router.delete('/user/delete/:id',finddelete)
export default router;