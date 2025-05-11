const router = require("express").Router();
const User = require("../Modals/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECERT = "suhailisagoodboy";

// route for  signup
router.post(
  "/sign-up",
  [
    body("username", "please enter a valid name ").isLength({ min: 5 }).notEmpty(),
    body("email", "please enter a valid email").isEmail(),
    body("password", "please enter a valid password ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
  
try {
    const salt =  await  bcrypt.genSalt(10)
    const secPass = await  bcrypt.hash(req.body.password,salt)
     // Chech wheather the with this email exists already
    let email = await User.findOne({ email: req.body.email });
    let user = await User.findOne({ username: req.body.username });
    if (user) {
    return  res
        .status(409)
        .json({
          success,
          errors: " Sorry a user with this email  already exists  "
        });
    } else if(email) {
       
       return res
        .status(409)
        .json({
          success,
          errors: " Sorry a user with this  username already exists  "
        });
    }
    user = await  User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email
      })

      
    const data = {
        user : {
          id: user.id
        }
      }
      success = true
     const authToken = jwt.sign(data.user,JWT_SECERT)
     console.log(authToken)
     return res.json({authToken, data,success})
    
} catch (error) {
    console.error(error.message)
   return res.status(500).send(" Some external error ocurred")
}
      
    }


);

// route for login
router.post(
    "/login",
    [
     
      body("username", "please enter a valid username").notEmpty(),
      body("password", "password can not be blank").exists()
      
    ],
    async (req, res) => {
      let  success = false; 
  // If their are errors return a bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let {username , password} = req.body
  
  
  try{
  
    let user = await User.findOne({ username });
    if (!user) {
      // success= false
     return res
        .status(400)
        .json({
          
          errors: "please try to login with correct credentials email  "
        });
  
    }
  
    const passwordCompare =  await bcrypt.compare(password,user.password)
    if (!passwordCompare) {
      
     return res
        .status(400)
        .json({
         success , errors: "please try to login with correct password  "
        });
      }
      const data = {
        user : {
          id: user.id
        }
      }
     const authToken = jwt.sign({data},JWT_SECERT)
     success =true;
   return    res.json({  success,id:user.id, authToken,message:"Logged Successfully"})
  
  }  catch(error){
    console.error(error.message)
    return res.status(500).send(" Some external error ocurred")
  }
  
    }); 


module.exports = router;
