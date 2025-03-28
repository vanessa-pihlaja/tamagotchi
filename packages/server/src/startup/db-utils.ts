import { Database } from 'sqlite3';

export const createTables = (db: Database) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS character (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER,
      description TEXT,
      hunger INTEGER DEFAULT 70,
      happiness INTEGER DEFAULT 70,
      energy INTEGER DEFAULT 70
    )
  `;
  return new Promise((resolve, reject) => {
    return db.run(sql, (result: unknown, err: any) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export const seedDatabase = (db: Database) => {
  const porcu = {
    id: 1,
    name: 'Porcu',
    age: 0,
    description: 'Wild beast',
    hunger: 70,
    happiness: 70,
    energy: 70,
  };

  return new Promise((resolve, reject) =>
    db.run(
      `INSERT INTO character (id, name, age, description, hunger, happiness, energy) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      Object.values(porcu),
      (result: unknown, err: any) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    ),
  );
};
