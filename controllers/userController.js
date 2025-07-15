import { sql } from "../config/db.js";

// Get logged-in user's own profile
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const [user] = await sql`SELECT id, name, email, is_admin, created_at FROM users WHERE id = ${userId}`;
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await sql`SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC`;
    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await sql`SELECT id, name, email, is_admin, created_at FROM users WHERE id = ${id}`;
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a user (admin only)
export const createUser = async (req, res) => {
  const { name, email, password, is_admin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const [user] = await sql`
      INSERT INTO users (name, email, password, is_admin)
      VALUES (${name}, ${email}, ${password}, ${is_admin || false})
      RETURNING id, name, email, is_admin, created_at
    `;
    res.status(201).json(user);
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, is_admin } = req.body;

  try {
    const [existing] = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (!existing) return res.status(404).json({ message: "User not found" });

    const [updated] = await sql`
      UPDATE users
      SET name = ${name || existing.name},
          email = ${email || existing.email},
          password = ${password || existing.password},
          is_admin = ${is_admin !== undefined ? is_admin : existing.is_admin}
      WHERE id = ${id}
      RETURNING id, name, email, is_admin, created_at
    `;

    res.json(updated);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [deleted] = await sql`DELETE FROM users WHERE id = ${id} RETURNING *`;
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
