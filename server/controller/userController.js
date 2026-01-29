
import User from '../model/userModel.js';
import {authentication, authorization} from '../middleware/authentication.js';

const getUserDetails = (req, res) => {
    try{
       
    }
    catch(err){
        res.status(500).send("Server error");
    }
}

const getAllUsers = async (req, res) =>{
    try{

        const authenticationResult = await authentication(req, res);
        if(!authenticationResult){
            res.status(401).send("User not authenticated");
        }

        const authorizationResult = await authorization(req, res);
        if(!authorizationResult){
            res.status(403).send("User not authorized");
        }

        const allUsers = await User.find();
        res.status(200).json(allUsers);
    }
    catch(err){
        res.status(500).send("Server error");
    }
}

const updateUser = (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const userIndex = users.findIndex(user => user.id == userId);

        if (userIndex === -1) {
            return res.status(404).send("User not found");
        }

        // Mutate the existing array instead of reassigning
        users[userIndex] = { ...users[userIndex], ...updateData };

        res.status(200).json({ message: "User updated successfully", user: users[userIndex] });
    }
    catch (err) {
        res.status(500).send("Server error");
    }
}

const deleteUser = (req, res) => {
    try{
        const userId = req.params.id;
        const initialLength = users.length;
        const updatedUsers = users.filter(user => user.id != userId);

        // if(users.length == initialLength){
        //     return res.status(404).send("User not found");
        // }

        res.status(200).send(updatedUsers);
    }
    catch(err){
        res.status(500).send("Server error");
    }
}




export {
    getUserDetails,
    getAllUsers,
    updateUser,
    deleteUser
}