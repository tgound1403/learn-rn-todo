import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteTodo,
  getTodos,
  insertTodo,
  updateTodoContent,
  updateTodoStatus,
} from "../database/todoDatabase";

export type Todo = {
  id: number;
  title: string;
  desc: string;
  isDone: boolean;
  createdAt: number;
  asignedTo: string;
};

interface TodosState {
  data: Todo[];
  loading: boolean;
}

export const initialState: TodosState = {
  data: [],
  loading: false
};

export const loadTodosThunk = createAsyncThunk('todos/load', getTodos);

type AddTodoPayload = {title: string; desc: string};

export const addTodoThunk = createAsyncThunk(
  'todos/add',
  async (payload: AddTodoPayload) => {
    try {
      await insertTodo(payload.title, payload.desc);
      return await getTodos(); 
    } catch (error) {
      console.error('Error in addTodoThunk:', error);
      throw error;
    }
  }
);

type ToggleTodoPayload = {id: number, isDone: boolean};
export const toggleTodoThunk = createAsyncThunk(
  'todos/toggle',
  async (payload: ToggleTodoPayload, { getState }) => {
    try {
      const newStatus = payload.isDone ? 1 : 0;
      await updateTodoStatus(payload.id, newStatus);
      return await getTodos();
    } catch (error) {
      console.error('Error in toggleTodoThunk:', error);
      throw error;
    }
  }
);

type UpdateTodoPayload = {id: number, todo: Todo};
export const updateTodoThunk = createAsyncThunk(
  'todos/update',
  async (payload: UpdateTodoPayload, { getState }) => {
    try {
      await updateTodoContent(payload.id, payload.todo);
      return await getTodos();
    } catch (error) {
      console.error('Error in updateTodoThunk:', error);
      throw error;
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/delete',
  async (id: number) => {
    try {
      await deleteTodo(id);
      return await getTodos();
    } catch (error) {
      console.error('Error in deleteTodoThunk:', error);
      throw error;
    }
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
    // updateTodo: (
    //   state: TodosState,
    //   action: PayloadAction<{ id: number; newTodo: Todo }>
    // ) => {

    //     updateTodoContent(
    //       action.payload.id
    //       action.payload.newTodo.title,
    //       action.payload.newTodo.desc,
    //     );    
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(loadTodosThunk.pending, state => {
        state.loading = true;
      })
      .addCase(loadTodosThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(loadTodosThunk.rejected, state => {
        state.loading = false;
      });
      
    [addTodoThunk, toggleTodoThunk, updateTodoThunk, deleteTodoThunk].forEach(thunk => {
      builder
        .addCase(thunk.fulfilled, (state, action) => {
          state.data = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          console.error(`Action ${thunk.typePrefix} rejected:`, action.error);
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

export default todoSlice.reducer;
