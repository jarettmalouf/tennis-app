import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

// Extend User document type to include methods
interface UserDocument extends Document, IUser {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const user = new User({
      username,
      passwordHash: password, // Will be hashed by the pre-save middleware
      name,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("Login request received:", req.body);
    const { username, password } = req.body;

    // Find user
    console.log("Looking for user:", username);
    const user = (await User.findOne({ username })) as UserDocument | null;
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    console.log("Checking password for user:", username);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password mismatch for user:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    console.log("Generating token for user:", username);
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    console.log("Login successful for user:", username);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
