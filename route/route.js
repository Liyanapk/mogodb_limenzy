import express from 'express';
import { createUser, findAndUpdate, findById, findOne, findUser, updatemany } from '../controller/controller.js';

const router=express.Router()



router.post('/newuser' ,createUser)
router.get('/user/:name',findUser)
router.get('/user/find/:name',findOne)
router.get('/user/id/:id',findById)
router.patch('/user/update/:id',findAndUpdate )
router.patch('/users?age=',updatemany)
export default router;