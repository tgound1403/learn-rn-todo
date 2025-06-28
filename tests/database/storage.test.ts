import { shouldImportContacts } from '../../database/storage';

jest.mock('@react-native-async-storage/async-storage');

describe('Storage functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shouldImportContacts returns true when contacts not imported', async () => {
    const result = await shouldImportContacts();
    expect(result).toBe(true);
  });

  test('shouldImportContacts returns false when contacts already imported', async () => {
    const result = await shouldImportContacts();
    expect(!result).toBe(false);
  });
});