import User from "../schema/userSchema.js";





//create user
export const createUser = async (req, res, next)=>{

    try {
        const { name, phone } = req.body;

        const userCreate = new User({ name: "liya", phone: 20 , age:20})
        await userCreate.save()
        
        res.status(200).json({ message: `${ userCreate.name } is created`, data: userCreate });


    }   catch(error) {
        
        next(new Error("Error creating user: " + error.message));
        res.status(500).json({ message:`Internal server error!` })
    }

}



//find() user


export const findUser = async( req, res, next) =>{

    try {
        const { name } =req.params
        const user = await User.find({ name:name });
        res.status(200).json({ message:`${ findUser.name } is found` , data :user})
        console.log( typeof(user));
       
    }   catch (error) {
        next( new Error("Error find user: " + error.message));
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
        next(new Error("Error find user: " + error.message));

        res.status(500).json({ message:`Internal server error!` })
    }

}



//findOneAddUpdate


export const findAndUpdate = async (req, res, next) =>{


    
    try {
        const { id } = req.params;
        const data ={ ...req.body } ;
        
      console.log(req.body)
        const updateUser = await User.findOneAndUpdate (
            { _id: id },
            { $set: data },
            { new: true, runValidators: true }
        );

        console.log( req.body)

        if(!updateUser){

            res.status(400).json({ message:`user not found` })
        }else{

            res.status(200).json({ message:`user updated` , data : updateUser })
        }

    }   catch (error) {
        next(new Error("Error : " + error.message));

        res.status(500).json({ message:`Internal server error!` })
    }
}




//updqte many

export const updatemany = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const { age } = req.query;

    const manyUpdate = await User.updatemany(
      { age: { $gte: age } },
      { name, phone }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No users found to update" });
    }
    res
      .status(200)
      .json({ message: `${result.matchedCount} users updated`, data: result });
  } catch (error) {
    next(new Error("Error updating users: " + error.message));
  }
};