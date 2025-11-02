import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, gender, address, role, password } =
      req.body;

    // Validation
    if (!fullName || !email || !phone || !gender || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      fullName,
      email,
      phone,
      gender,
      address,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
