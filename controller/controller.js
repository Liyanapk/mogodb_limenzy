import User from "../schema/userSchema.js";



//create user

export const createUser = async (req, res, next) => {

    try {
      const { name, phone, age } = req.body;
    
       const profilePicturePath = req.file.path;  
  
      try {
        const newUser = new User(
            { name, phone, age, profilePicture: profilePicturePath.slice(8)} 
         );
    
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: newUser });
        
      } catch (error) {
        console.log(error);
        
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  };



//find() user


export const findUser = async( req, res, next) =>{

    try {
        const { name } =req.params
        const user = await User.find({ name:name });

        res.status(200).json({ message:`${ findUser.name } is found` , data :user })
        console.log( typeof(user));
       
    }   catch (error) {
        next( new Error( "Error find user: " + error.message ));

        res.status(500).json({ message:`Internal server error!` })
    }

}


//findOne() user

export const findOne = async( req, res, next) =>{

    try {
        const { name } =req.params
        const user = await User.findOne ({ name:name });

        res.status(200).json({ message:`user is found` , data : user})
        
        console.log( typeof(user));
       
    }   catch (error) {
        next(new Error("Error find user: " + error.message));

        res.status(500).json({ message:`Internal server error!` })
    }

}




//find by id

export const findById = async( req, res, next) =>{

    try {
        const { id } =req.params;
        const user = await User.findById (id);

        res.status(200).json({ message:`user is found` , data : user})
        
        console.log( typeof(user));
       
    }   catch (error) {
        next(new Error( "Error find user: " + error.message ));

        res.status(500).json({ message:`Internal server error!` })
    }

}



//findOneAddUpdate


export const findAndUpdate = async (req, res, next) =>{


    
    try {
        const { id } = req.params;
        const UserData = {...req.body};
        
        if(req.file && req.file.path){
         UserData.profilePicture = req.file.path.slice(8)
        }



        console.log (req.body)
         const updateUser = await User.findOneAndUpdate (
            { _id: id },
            { $set: UserData },
            { new: true, runValidators: true }
        );

        console.log ( req.body)

        if (!updateUser) {

            res.status(400).json({ message:`user not found` })

        } else {

            res.status(200).json({ message:`user updated` , data : updateUser })
        }

    }   catch (error) {
        next( new Error("Error : " + error.message) );

        res.status(500).json({ message:`Internal server error!` })
    }
}




//update many

export const updatemany = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const { age } = req.params;

    const manyUpdate = await User.updateMany(
      { age: { $gte: age } },  //grater than //$ls less than
      { name, phone }
    );

    if (manyUpdate.matchedCount === 0) {
      return res.status(404).json( { message: "No users found to update" } );
    }
    res
      .status(200)
      .json( { message: `${manyUpdate.matchedCount} users updated`, data: manyUpdate } );
  } catch (error) {
    next(new Error( "Error updating users: " + error.message ));
  }
};


//findOneAndDelete



export const finddelete = async ( req, res, next)=>{
    try {
        const {id} = req.params;


        const deleteOneUser = await User.findOneAndDelete(
            { _id: id }
        )

        if ( !deleteOneUser ) {

            res.status(400).json({ message:`user not find`, data:deleteOneUser })
        }

        res.status(202).json({message:`user deleted successfully` ,data:deleteOneUser})

    }   catch (error) {
        next(new Error( "error deleting user :" + error.message ))
    }
}


//multer





 