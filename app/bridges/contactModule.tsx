import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { ContactsModule } = NativeModules;

export async function requestContactPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contact Permission',
        message: 'This app needs access to your contacts',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export async function getContacts(): Promise<{ name: string; phone: string }[]> {
  const granted = await requestContactPermission();
  if (!granted) throw new Error('Permission denied');
  return ContactsModule.getContacts();
}
