import AsyncStorage from '@react-native-async-storage/async-storage';

const CONTACTS_IMPORTED_KEY = 'contacts_imported';

const ID_TOKEN = 'idToken';

export const shouldImportContacts = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(CONTACTS_IMPORTED_KEY);
  return value !== 'true';
};

export const markContactsImported = async () => {
  await AsyncStorage.setItem(CONTACTS_IMPORTED_KEY, 'true');
};

export const getIdToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(ID_TOKEN);
};

export const setIdToken = async (token: string) => {
  await AsyncStorage.setItem(ID_TOKEN, token); 
}

export default {
  shouldImportContacts,
  markContactsImported,
};
