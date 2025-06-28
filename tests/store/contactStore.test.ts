import { useContactsStore } from '../../store/contactStore';
import { getContacts } from '../../database/contactDatabase';

jest.mock('../../database/contactDatabase');

describe('Contact Store', () => {
  beforeEach(() => {
    useContactsStore.setState({ contacts: [], loading: false });
    jest.clearAllMocks();
  });

  test('fetchContacts sets loading state correctly', async () => {
    const mockContacts = [{ id: 1, name: 'Test' }];
    (getContacts as jest.Mock).mockResolvedValue(mockContacts);

    await useContactsStore.getState().fetchContacts();

    expect(useContactsStore.getState().contacts).toEqual(mockContacts);
    expect(useContactsStore.getState().loading).toBe(false);
  });
});