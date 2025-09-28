import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

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
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res
        .status(201)
        .json({ success: true, message: "Signup successfully", savedUser });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.log("Faile to send welcome email: ", error);
      }
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password)
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    generateToken(user._id, res);

    const userObject = user.toObject();

    const { password: _, ...userWithoutPassword } = userObject;

    res.status(200).json({
      sucess: true,
      message: "Login Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in login controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ success: true, message: "Logged out successfulyy" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic)
      return res
        .status(400)
        .json({ success: false, message: "Profile picture is required" });

    const userId = req.user._id;

    const folderPath = `${ENV.CLOUDNARY_FOLDER_PATH}/user/${userId}`;

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: folderPath,
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: uploadResponse.secure_url,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile Image updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
