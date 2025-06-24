import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  title: string;
  desc: string;
  isDone: boolean;
  createdAt: number;
};

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [
    {
      title: "TypeScript",
      desc: "1. JS Basics: Know ES6+ features and basic programming concepts. \n 2. React Native: Understand JSX, components, state, navigation, and Flexbox. \n 3. Setup: Install Node.js, VS Code, emulator/device, and use CLI or Expo.",
      isDone: true,
      createdAt: Date.now(),
    },
    {
      title: "React Components",
      desc: "1. FlatList: Efficiently renders scrollable lists with performance optimizations for large datasets. \n 2. Flex: Flexbox layout system used to align and distribute space in views (e.g., row/column layout). \n 3. Modal: Displays content in a popup overlay, commonly used for dialogs, forms, or alerts.",
      isDone: true,
      createdAt: Date.now(),
    },
    {
      title: "Lifecycle",
      desc: "Grasp how component lifecycle works: mounting, updating, and unmounting using hooks.",
      isDone: true,
      createdAt: Date.now(),
    },
    {
      title: "React Hook",
      desc: "1. Use state and lifecycle features in functional components. \n 2. Understand common hooks include useState, useEffect, useContext, useReducer, useRef, useMemo, useCallBack",
      isDone: false,
      createdAt: Date.now(),
    },
    {
      title: "Routing",
      desc: "Understand components and props, and be familiar with React Navigation basics.",
      isDone: false,
      createdAt: Date.now(),
    },
    {
      title: "State Management",
      desc: "Understand app-wide state flow, reducers, and state sharing between components.",
      isDone: false,
      createdAt: Date.now(),
    },
    {
      title: "Security",
      desc: "1. Security & Auth: Implement secure login using OAuth, SSO, or token-based auth (e.g., JWT). \n 2. Networking & Storage: Use secure APIs (Axios/Fetch), and safely store data via Secure Storage or AsyncStorage.",
      isDone: false,
      createdAt: Date.now(),
    },
    {
      title: "native event",
      desc: "Communication between native modules (Android/iOS) and React Native using bridges.",
      isDone: false,
      createdAt: Date.now(),
    },
    {
      title: "Unit testing",
      desc: "Checks individual components or functions in isolation using tools like Jest and React Native Testing Library.",
      isDone: false,
      createdAt: Date.now(),
    },
  ],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state: TodosState,
      action: PayloadAction<{ title: string; desc: string }>
    ) => {
      state.todos.push({ ...action.payload, isDone: false, createdAt: Date.now() });
    },
    updateTodo: (
      state: TodosState,
      action: PayloadAction<{ oldTitle: string; newTodo: Todo }>
    ) => {
      const idx = state.todos.findIndex(
        (t: Todo) => t.title === action.payload.oldTitle
      );
      if (idx !== -1) {
        state.todos[idx] = action.payload.newTodo;
      }
    },
    toggleTodo: (
      state: TodosState,
      action: PayloadAction<{ index: number; value: boolean }>
    ) => {
      if (state.todos[action.payload.index]) {
        state.todos[action.payload.index].isDone = action.payload.value;
      }
    },
  },
});

export const { addTodo, updateTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
