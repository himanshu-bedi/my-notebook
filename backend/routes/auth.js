
const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AnkitIsaDeveloper"
const fetchuser=require('../middleware/fetchuser')
//Route1:create a user using post /api/auth .Does not require Auth
router.post('/createUser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 })
  ], async (req, res) => {
    let success=false;
    // console.log(req.body)
    // const user=User(req.body);

    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
     
      //check whether email already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry a user with this email already exist" })
      }

      //user creation
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })

      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:"Please enter a unique value for email",message:err.message})})
      const data = {
        id: user.id
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      success=true;
      console.log(authtoken);
      res.json({success,authtoken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
  })

//Route2:authenticate a user using get /api/auth/login
router.post('/login',
  [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body
    try {
      let user =await User.findOne({ email });
      let success=false;
      if (!user) {
        return res.status(400).json({success, error: "Enter valid crediantials" });
      }
      const passwordCompare =await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        return res.status(400).json({success, error: "Enter valid crediantials" });
      }
      const data = {
        id: user.id
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      console.log(authtoken);
      success=true;
      res.json({success,authtoken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error occured")
    }

  })

//Route3:Get logined user details
router.post('/getuser',fetchuser,async (req, res) => {
    
   
    try {
      const userId=req.user.id
      console.log(userId)
     const user =await User.findOne({userId}).select("-password")
      res.send(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error occured")
    }

  })

module.exports = router