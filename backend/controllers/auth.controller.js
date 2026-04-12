import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Assign admin role based on email
    const role = email === "admin@revyse.com" ? "admin" : "user";

    const user = new User({
      name,
      email,
      password, // model will hash this
      role,
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Special admin login - completely separate from regular user logic
    if (email === "admin@gmail.com" && password === "admin") {
      try {
        // Generate admin token directly without database operations
        const token = jwt.sign(
          { 
            id: "admin-user-id", 
            role: "admin",
            email: "admin@gmail.com",
            name: "Admin"
          },
          process.env.JWT_SECRET || "fallback-secret",
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          message: "Admin login successful",
          token,
          user: {
            id: "admin-user-id",
            name: "Admin",
            email: "admin@gmail.com",
            role: "admin",
          },
        });
      } catch (tokenError) {
        console.error("Token generation error:", tokenError);
        return res.status(500).json({ message: "Token generation failed" });
      }
    }

    // Regular user login
    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (userError) {
      console.error("User login error:", userError);
      return res.status(500).json({ message: "Login failed" });
    }

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: error.message });
  }
};