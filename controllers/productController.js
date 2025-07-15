import { sql } from "../config/db.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    res.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await sql`
      SELECT * FROM products WHERE LOWER(category) = LOWER(${category})
    `;
    res.json(products);
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products WHERE is_featured = true ORDER BY created_at DESC
    `;
    res.json(products);
  } catch (error) {
    console.error("Get featured products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get latest products (e.g., latest 8)
export const getLatestProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products ORDER BY created_at DESC LIMIT 8
    `;
    res.json(products);
  } catch (error) {
    console.error("Get latest products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search products by name
export const searchProducts = async (req, res) => {
  const { q } = req.query;
  try {
    const products = await sql`
      SELECT * FROM products WHERE name ILIKE '%' || ${q} || '%'
    `;
    res.json(products);
  } catch (error) {
    console.error("Search products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create product
export const createProduct = async (req, res) => {
  const { name, description, price, image, category, is_featured } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [product] = await sql`
      INSERT INTO products (name, description, price, image, category, is_featured)
      VALUES (${name}, ${description}, ${price}, ${image}, ${category}, ${is_featured})
      RETURNING *
    `;
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, is_featured } = req.body;

  try {
    const [product] = await sql`
      UPDATE products
      SET name = ${name},
          description = ${description},
          price = ${price},
          image = ${image},
          category = ${category},
          is_featured = ${is_featured}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [deleted] = await sql`DELETE FROM products WHERE id = ${id} RETURNING *`;

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
