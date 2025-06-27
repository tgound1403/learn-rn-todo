import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTodoFromDB,
  getTodosFromDB,
  insertTodo,
  updateTodoContent,
  updateTodoStatus,
} from "../database/todoDatabase";
export type Todo = {
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

export const loadTodos = createAsyncThunk('todos/load', async () => {
  return await getTodosFromDB();
});

// A modular piece of state + reducer + actions in one place (from Redux Toolkit)
// automatically create actions and reducers
// state ~ State
// action ~ Event
// reducer: A pure function that takes the current state and an action, and returns the new state. ~ BLoC
const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    refreshData: (state: TodosState, _: PayloadAction<undefined>) => {
      getTodosFromDB().then((res)=>state.data = res)
    },
    addTodo: (
      state: TodosState,
      action: PayloadAction<{ title: string; desc: string }>
    ) => {
      insertTodo(action.payload.title, action.payload.desc);
      // state.data.push({
      //   ...action.payload,
      //   isDone: false,
      //   createdAt: Date.now(),
      // });
    },
    updateTodo: (
      state: TodosState,
      action: PayloadAction<{ oldTitle: string; newTodo: Todo }>
    ) => {
      const idx = state.data.findIndex(
        (t: Todo) => t.title === action.payload.oldTitle
      );
      if (idx !== -1) {
        // state.data[idx] = action.payload.newTodo;
        updateTodoContent(
          action.payload.newTodo.title,
          action.payload.newTodo.desc,
          action.payload.oldTitle
        );
      }
    },
    toggleTodo: (
      state: TodosState,
      action: PayloadAction<{ index: number; value: boolean }>
    ) => {
      if (state.data[action.payload.index]) {
        // state.data[action.payload.index].isDone = action.payload.value;
        updateTodoStatus(
          state.data[action.payload.index].title,
          action.payload.value ? 1 : 0
        );
      }
    },
    deleteTodo: (state: TodosState, action: PayloadAction<{ todo: Todo }>) => {
      const idx = state.data.findIndex(
        (t: Todo) => t.title === action.payload.todo.title
      );
      if (idx !== -1) {
        // state.data = state.data.filter(
        //   (v) => v.title !== action.payload.todo.title
        // );
        deleteTodoFromDB(action.payload.todo.title);
      }
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

export const {refreshData, addTodo, updateTodo, toggleTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
