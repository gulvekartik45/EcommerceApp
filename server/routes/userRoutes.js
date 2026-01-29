import { Router } from 'express';
import { getUserDetails , getAllUsers, updateUser, deleteUser } from '../controller/userController.js'


const userRouter = Router();




userRouter.get('/' , (req,res)=>{
    res.send("User route is working");
})

userRouter.get('/user/:id', getUserDetails);

userRouter.get('/users', getAllUsers);

userRouter.put('/user/:id', updateUser);

userRouter.delete('/user/:id', deleteUser );

export default userRouter;