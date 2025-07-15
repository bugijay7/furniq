import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Register User
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert new user
    const [newUser] = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, email, is_admin
    `;

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Send token + user details (excluding password)
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Logout (client handles token removal)
export const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
