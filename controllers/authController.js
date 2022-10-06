const { Auth } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//add user
const register = async (req, res, next) => {
  try {
    const { email,  password, verifypassword } = req.body;
    if (!email || !password || !verifypassword) {
      res
        .status(400)
        .json({ errorMessage: "please enter all required fields" })
       
      next;
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: "Password should be at least 6 characters" })
      
    }
    if (password != verifypassword) {
      return res
        .status(400)
        .json({ errorMessage: "Password does not match verified Password" });
    }
    const existingUser = await Auth.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "Account with this email already exist" });
    }
  
    //hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save new user
    const isAdmin = false;
    // const newUser = new Auth();
    const saveuser = await Auth.create({
      email: email,
      passwordharsh: passwordHash,
      isAdmin: isAdmin,
    });
    const savedUser = await Auth.findOne({ where: { email: email } });

    //sign the token
    const token = jwt.sign(
      {
        user: saveuser.id,
      },
      process.env.JWT_SECRET
    );
    const userPayload = { userD: savedUser, token: token };

    //use cookies

    return res.status(200).json(userPayload);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const allusers = await Auth.findAll();
    return res.status(200).json({ msg: "success", data: allusers });
  } catch (err) {
    return res.status(500).send();
  }
};
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await Auth.destroy({ where: { id: id } });
    return res.send(id + "deleted");
  } catch (err) {
    return res.status(500).send();
  }
};

//login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ errorMessage: "please enter all required fields" })
        
    }
  
      var existinguser = await Auth.findOne({
        where: {
          email: email,
        },
      });

      if (!existinguser) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong Email or Password" })
          
      }

      // verify if password is correct
      const passwordcorrect = await bcrypt.compare(
        password,
        existinguser.passwordharsh
      );

      if (!passwordcorrect) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong Email or Password" })
         
      }

      //sign token
      const token = jwt.sign(
        {
          user: existinguser._id,
        },
        process.env.JWT_SECRET,
        {
          //expiresIn: "10h" // it will be expired after 10 hours
          //expiresIn: "20d" // it will be expired after 20 days
          //expiresIn: 120 // it will be expired after 120ms
          //expiresIn: "120s", // it will be expired after 120s
        }
      );
      // create reusable transporter object using the default SMTP transport

      const userPayload = { userD: existinguser, token: token };

      //use cookies
      return res.send(userPayload);
    
      
   
  } catch (err) {
    console.error(err);
    console.log(err);
    return res.status(500).send();
  }
};
const updatePassword = async (req, res) => {
  try {
    const { email, password }= req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const emailValue = await Auth.update(
      { passwordharsh: passwordHash },
      { where: { email: email } }
    );
    return res.status(200).json({"msg":"Password Updated successfully"});
    
  } catch (error) {
    return res.status(500).send(error);
  }

}

const getUserbyAuthId = async (req, res) => {
  try {
    const { id }= req.params;
    

    const user = await Auth.findOne(
    
      { where: { id: id } }
    );
    return res.status(200).json({"msg":"Password Updated successfully", data: user});
    
  } catch (error) {
    return res.status(500).send(error);
  }

}
module.exports = { register, deleteAccount, login, getAllUsers, updatePassword, getUserbyAuthId };
