import AsyncStorage from '@react-native-async-storage/async-storage';

const CONTACTS_IMPORTED_KEY = 'contacts_imported';

export const shouldImportContacts = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(CONTACTS_IMPORTED_KEY);
  return value !== 'true';
};

export const markContactsImported = async () => {
  await AsyncStorage.setItem(CONTACTS_IMPORTED_KEY, 'true');
};

export default {
  shouldImportContacts,
  markContactsImported,
};
