import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTodoFromDB,
  getTodosFromDB,
  insertTodo,
  updateTodoContent,
  updateTodoStatus,
} from "../database/todoDatabase";
import { RootState } from "./store";
export type Todo = {
  id: number;
  title: string;
  desc: string;
  isDone: boolean;
  createdAt: number;
};

interface TodosState {
  data: Todo[];
  loading: boolean;
}

export const initialState: TodosState = {
  data: [],
  loading: false
};

export const loadTodos = createAsyncThunk('todos/load', getTodosFromDB);

type AddTodoPayload = {title: string; desc: string};

export const addTodoThunk = createAsyncThunk(
  'todos/add',
  async (payload: AddTodoPayload) => {
    await insertTodo(payload.title, payload.desc);
    return await getTodosFromDB(); 
  }
);

export const toggleTodoThunk = createAsyncThunk(
  'todos/toggle',
  async (id: number, { getState }) => {
    const state = getState() as RootState;
    const todo = state.todos.data.find(t => t.id === id);
    if (!todo) return [];
    const newStatus = todo.isDone ? 0 : 1;
    await updateTodoStatus(id, newStatus);
    return await getTodosFromDB();
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/delete',
  async (id: number) => {
    deleteTodoFromDB(id);
    return await getTodosFromDB();
  }
);

// A modular piece of state + reducer + actions in one place (from Redux Toolkit)
// automatically create actions and reducers
// state ~ State
// action ~ Event
// reducer: A pure function that takes the current state and an action, and returns the new state. ~ BLoC
const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    updateTodo: (
      state: TodosState,
      action: PayloadAction<{ id: number; newTodo: Todo }>
    ) => {

        updateTodoContent(
          action.payload.newTodo.title,
          action.payload.newTodo.desc,
          action.payload.id
        );
    
    },
    toggleTodo: (
      state: TodosState,
      action: PayloadAction<{ id: number; value: boolean }>
    ) => {
      if (state.data[action.payload.id]) {
        updateTodoStatus(
          action.payload.id,
          action.payload.value ? 1 : 0
        );
      }
    },
    deleteTodo: (state: TodosState, action: PayloadAction<{ id: number }>) => {
      deleteTodoFromDB(action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTodos.pending, state => {
        state.loading = true;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(loadTodos.rejected, state => {
        state.loading = false;
      });
      [addTodoThunk, toggleTodoThunk, deleteTodoThunk].forEach(thunk => {
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.data = action.payload;
      });
    });
  },
});

// Sample without slice
// Action
// const action = { type: 'ADD_TODO', payload: 'Buy milk' };
//
// Reducer
// function todoReducer(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [...state, { text: action.payload, done: false }];
//     default:
//       return state;
//   }
// }

export const {updateTodo, toggleTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
