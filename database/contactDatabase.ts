import db from './appDatabase';

export type Contact = {  
  id: number;
  name: string;
  phone: string;
}; 

export const initContactDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone STRING
    );
  `);
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

export const insertContact = async (name: string, phone: string): Promise<void> => {
  try {
    const statement = await db.prepareAsync(
      "INSERT INTO contacts (name, phone) VALUES ($name, $phone)"
    );
    await statement.executeAsync({
      $name: name,
      $phone: phone,
    });
  } catch (e) {
    console.log("Error inserting contact:", e);
    throw e;
  }
};

export default {};
