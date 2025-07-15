import { sql } from './db.js';

const categories = [
  { id: 1, name: 'Sofa' },
  { id: 2, name: 'TV Unit' },
  { id: 3, name: 'Coffee Table' },
  { id: 4, name: 'Bookshelf' },
  { id: 5, name: 'Cabinet' },
  { id: 6, name: 'Stool' },
  { id: 7, name: 'Table' },
  { id: 8, name: 'Island' },
  { id: 9, name: 'Bed' },
  { id: 10, name: 'Wardrobe' },
  { id: 11, name: 'Nightstand' },
  { id: 12, name: 'Dresser' },
];

const seedCategories = async () => {
  try {
    console.log('🌱 Seeding categories...');
    for (const category of categories) {
      await sql`
        INSERT INTO categories (id, name)
        VALUES (${category.id}, ${category.name})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.log('✅ Categories seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed categories:', err);
    process.exit(1);
  }
};

seedCategories();
