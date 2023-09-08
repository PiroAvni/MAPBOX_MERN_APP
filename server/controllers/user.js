import bcrypt from "bcrypt";
import User from '../models/User.js';
import tryCatch from "./utils/tryCatch.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /register'
// @access  Public

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: 'User already exists!' });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });

  const { _id: id, photoURL } = user;
  // const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
  //   expiresIn: '1h',
    
  // });
const token = generateToken( id, name, photoURL)

  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, photoURL, token },
  });
});


// @desc    login
// @route   POST /login'
// @access  Public

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: 'User does not exist!' });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: 'Invalid credentials' });

  const { _id: id, name, photoURL } = existedUser;
  // const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
  //   expiresIn: '1h',
  // });
  const token = generateToken( id, name, photoURL)


  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, token },
  });
});


// @desc    uPDATE
// @route   POST /update'
// @access  Public

// UPDATE PROFILE 
export const updateProfile = tryCatch(async (req,res) =>{
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body,{new:true})
  const {_id:id, name, photoURL } = updatedUser

  // To DO: Update all the Office records added by this user
  const token = generateToken( id, name, photoURL)
res.status(200).json({success:true, result:{name, photoURL, token}})

})