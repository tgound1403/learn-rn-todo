// Mock for expo-sqlite to avoid ES module issues in Jest

export interface SQLiteDatabase {
  execAsync: (sql: string, args?: any[]) => Promise<void>;
  getAllAsync: (sql: string, args?: any[]) => Promise<any[]>;
  getFirstAsync: (sql: string, args?: any[]) => Promise<any>;
  runAsync: (sql: string, args?: any[]) => Promise<{ lastInsertRowId: number; changes: number }>;
  closeAsync: () => Promise<void>;
}

export interface SQLiteProvider {
  openDatabaseAsync: (name: string) => Promise<SQLiteDatabase>;
  deleteDatabaseAsync: (name: string) => Promise<void>;
}

// Mock database instance
const mockDatabase: SQLiteDatabase = {
  execAsync: jest.fn().mockResolvedValue(undefined),
  getAllAsync: jest.fn().mockResolvedValue([]),
  getFirstAsync: jest.fn().mockResolvedValue(null),
  runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
  closeAsync: jest.fn().mockResolvedValue(undefined),
};

// Mock provider
const mockProvider: SQLiteProvider = {
  openDatabaseAsync: jest.fn().mockResolvedValue(mockDatabase),
  deleteDatabaseAsync: jest.fn().mockResolvedValue(undefined),
};

// Export the functions that are used in the codebase
export const openDatabaseSync = jest.fn().mockReturnValue(mockDatabase);
export const openDatabaseAsync = jest.fn().mockResolvedValue(mockDatabase);
export const deleteDatabaseAsync = jest.fn().mockResolvedValue(undefined);

// Export the provider
export const SQLiteProvider = mockProvider;

// Default export
export default {
  openDatabaseSync,
  openDatabaseAsync,
  deleteDatabaseAsync,
  SQLiteProvider,
}; 