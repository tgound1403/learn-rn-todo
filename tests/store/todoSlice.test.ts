// __tests__/store/todoSlice.test.ts
import todoReducer, { loadTodosThunk, addTodoThunk } from '../../store/todoSlice';
import { getTodos, insertTodo } from '../../database/todoDatabase';

jest.mock('../../database/todoDatabase');

describe('Todo Slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should handle loadTodosThunk.pending', () => {
    const initialState = { data: [], loading: false };
    const action = { type: loadTodosThunk.pending.type };
    const newState = todoReducer(initialState, action);
    
    expect(newState.loading).toBe(true);
  });

  test('should handle loadTodosThunk.fulfilled', () => {
    const initialState = { data: [], loading: true };
    const mockTodos = [{ id: 1, title: 'Test', desc: 'Test', isDone: false, createdAt: 123, asignedTo: '' }];
    const action = { type: loadTodosThunk.fulfilled.type, payload: mockTodos };
    const newState = todoReducer(initialState, action);
    
    expect(newState.data).toEqual(mockTodos);
    expect(newState.loading).toBe(false);
  });
});