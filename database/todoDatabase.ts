import { Todo } from "../../store/todoSlice";
import  db  from "./appDatabase";

export const initDB = () => {
  db.execSync(
    `
    CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT, createdAt STRING, isDone INT);
    `
  );
};

const dropDB = () => {
  db.execSync("");
};

export const getTodos = (): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    try {
      db.getAllAsync("SELECT * FROM todos;")
        .then((result) => {
          resolve(result as Todo[]);
        })
        .catch((error) => reject(error));
    } catch (e) {
      console.log(e);
    }
  });
};

export const insertTodo = async (title: string, desc: string): Promise<void> => {
  try {
    const statement = await db.prepareAsync(
      "INSERT INTO todos (title, desc, createdAt, isDone) VALUES ($title, $desc, $createdAt, $isDone)"
    );
    await statement.executeAsync({
      $title: title,
      $desc: desc,
      $createdAt: Date.now(),
      $isDone: 0,
    });
  } catch (e) {
    console.log("Error inserting todo:", e);
    throw e;
  }
};

export const updateTodoStatus = async (id: number, isDone: number): Promise<void> => {
  try {
    const statement = await db.prepareAsync("UPDATE todos SET isDone = $isDone WHERE id = $id;");
    await statement.executeAsync({$isDone: isDone, $id: id});
  } catch (e) {
    console.log("Error updating todo status:", e);
    throw e;
  }
};

export const updateTodoContent = async (
  id: number,
  title: string,
  desc: string
): Promise<void> => {
  try {
    const statement = await db.prepareAsync(
      "UPDATE todos SET title = $title, desc = $desc WHERE id = $id;"
    );
    await statement.executeAsync({$title: title, $desc: desc, $id: id});
  } catch (e) {
    console.log("Error updating todo content:", e);
    throw e;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await db.runAsync("DELETE FROM todos WHERE id = ?;", id);
  } catch (e) {
    console.log("Error deleting todo:", e);
    throw e;
  }
};

export default {}