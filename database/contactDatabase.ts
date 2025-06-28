import db from "./appDatabase";

export type Contact = {
  id: number;
  name: string;
  phone: string;
};

export const initContactDB = () => {
  try {db.execSync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone STRING
    );
  `);} catch (e) {
    console.log("Error initializing contact database:", e);
  }
};

export const dropContactDB = () => {
  db.execSync("DROP TABLE IF EXISTS contacts;");
};

export const getContacts = (): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    try {
      db.getAllAsync("SELECT * FROM contacts;")
        .then((result) => {
          resolve(result as Contact[]);
        })
        .catch((error) => reject(error));
    } catch (e) {
      console.log(e);
    }
  });
};

export const insertContact = async (contacts: Contact[]): Promise<void> => {
  const statement = await db.prepareAsync(
    "INSERT INTO contacts (name, phone) VALUES ($name, $phone)"
  );
  try {
    await db.execAsync('BEGIN TRANSACTION');
    for (const contact of contacts) {
      await statement.executeAsync({
        $name: contact.name,
        $phone: contact.phone,
      });
    }
    await db.execAsync('COMMIT');
    console.log("Contacts inserted successfully");
  } catch (e) {
    await db.execAsync('ROLLBACK');
    console.log("Error inserting contact:", e);
    throw e;
  } finally {
    await statement.finalizeAsync();
  }
};

export default {};
