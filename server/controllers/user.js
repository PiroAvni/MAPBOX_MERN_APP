import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import Office from '../models/Office.js';



// @desc    Auth user & get token
// @route   POST /api/users/auth
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
    const { _id: id, photoURL, role, active } = user;
    const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({
      success: true,
      result: { id, name, email: user.email, photoURL, token, role, active },
    });
  });