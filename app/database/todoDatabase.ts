import { Todo } from "../store/todoSlice";
import  db  from "./appDatabase";

export const initDB = () => {
  db.execSync(
    `
    CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT, createdAt STRING, isDone INT);
    CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone STRING);
    `
  );
  console.log(db.databasePath);
};

export const dropDB = () => {
  db.execSync("");
};

export const getTodosFromDB = (): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    try {
      db.getAllAsync("SELECT * FROM todos;")
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    } catch (e) {
      console.log(e);
    }
  });
};

export const insertTodo = async (title: string, desc: string) => {
  try {
    const statement = await db.prepareAsync(
      "INSERT INTO todos (title, desc, createdAt, isDone) VALUES ($title, $desc, $createdAt, $isDone)"
    );
    let result = await statement.executeAsync({
      $title: title,
      $desc: desc,
      $createdAt: Date.now(),
      $isDone: 0,
    });
    console.log(
      `${title} insert result: `,
      result.lastInsertRowId,
      result.changes
    );
  } catch (e) {
    console.log(e);
  }
};

export const updateTodoStatus = (title: string, isDone: number) => {
  try {
    db.runAsync("UPDATE todos SET isDone = ? WHERE title = ?;", [
      isDone,
      title,
    ]);
  } catch (e) {
    console.log(e);
  }
};

export const updateTodoContent = (oldTitle: string, title: string, desc: string) => {
  try {
    db.runAsync("UPDATE todos SET title = ? AND desc = ? WHERE title = ?;", [
      title,
      desc,
      oldTitle,
    ]);
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodoFromDB = (title: string) => {
  try {
    db.runAsync("DELETE FROM todos WHERE id = ?;", [title]);
  } catch (e) {
    console.log(e);
  }
};