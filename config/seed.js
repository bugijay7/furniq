import { sql } from "../config/db.js";

const livingRoomCategories = [
  { id: 1, name: "Sofa" },
  { id: 2, name: "TV Unit" },
  { id: 3, name: "Coffee Table" },
  { id: 4, name: "Bookshelf" },
];

const kitchenCategories = [
  { id: 5, name: "Cabinet" },
  { id: 6, name: "Stool" },
  { id: 7, name: "Table" },
  { id: 8, name: "Island" },
];

const bedroomCategories = [
  { id: 9, name: "Bed" },
  { id: 10, name: "Wardrobe" },
  { id: 11, name: "Nightstand" },
  { id: 12, name: "Dresser" },
];

// Helper to seed room products
const seedProducts = async (roomName, categories, imagePrefix) => {
  for (const category of categories) {
    for (let i = 1; i <= 15; i++) {
      const name = `${roomName} ${category.name} ${i}`;
      const description = `High quality ${category.name.toLowerCase()} for your ${roomName.toLowerCase()}.`;
      
     
const basePrice = 50000 + Math.random() * 90000;


const roundedPrice = Math.round(basePrice / 1000) * 1000;


const price = Number(roundedPrice);

      const image = `${imagePrefix}_${category.name.toLowerCase()}_${i}.jpeg`;

      await sql`
        INSERT INTO products (name, description, price, image, category, is_featured, category_id)
        VALUES (${name}, ${description}, ${price}, ${image}, ${category.name}, false, ${category.id})
      `;
    }
  }
};

const seed = async () => {
  try {
    console.log("🌱 Seeding products...");

    await seedProducts("Living Room", livingRoomCategories, "livingroom");
    await seedProducts("Kitchen", kitchenCategories, "kitchen");
    await seedProducts("Bedroom", bedroomCategories, "bedroom");

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seed();
