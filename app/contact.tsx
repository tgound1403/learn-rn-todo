import React, { useEffect } from "react";
import useContactsStore from "../store/contactStore";
import getContactsNative from "../bridges/contactModule";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, RefreshControl } from "react-native";

const ContactScreen = () => {
  const { contacts, loading, fetchContacts, syncContacts } = useContactsStore();

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRefresh = async () => {
    const newDeviceContacts = await getContactsNative();
    await syncContacts(newDeviceContacts);
  };

  if (!contacts) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Không tìm thấy danh bạ!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <SafeAreaProvider>
        <View className="flex-1 justify-center items-center bg-white p-4">
          <Text className="">Contacts</Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="p-4 border-b border-gray-200">
                  <Text>{item.name}</Text>
                  <Text>{item.phone}</Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={handleRefresh}
                />
              }
            />
          )}
        </View>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default ContactScreen;
