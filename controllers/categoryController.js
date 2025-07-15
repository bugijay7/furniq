import { sql } from "../config/db.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name`;
    res.json(categories);
  } catch (error) {
    console.error("Get all categories error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [category] = await sql`SELECT * FROM categories WHERE id = ${id}`;
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Get category by ID error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products in a category
export const getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await sql`
      SELECT p.*
      FROM products p
      WHERE p.category_id = ${id}
    `;
    res.json(products);
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const [existing] = await sql`SELECT * FROM categories WHERE LOWER(name) = LOWER(${name})`;
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const [newCategory] = await sql`
      INSERT INTO categories (name, description)
      VALUES (${name}, ${description})
      RETURNING *
    `;
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const [existing] = await sql`SELECT * FROM categories WHERE id = ${id}`;
    if (!existing) return res.status(404).json({ message: "Category not found" });

    const [updated] = await sql`
      UPDATE categories
      SET name = ${name || existing.name},
          description = ${description || existing.description}
      WHERE id = ${id}
      RETURNING *
    `;
    res.json(updated);
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const [deleted] = await sql`DELETE FROM categories WHERE id = ${id} RETURNING *`;
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
