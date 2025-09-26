import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Validation
    if (!fullName || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res
        .status(201)
        .json({ success: true, message: "Signup successfully", newUser });
    } else {
      res.status(400).json({ success: false, message: "Signup error" });
    }
  } catch (error) {
    console.error("Error in signup controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
