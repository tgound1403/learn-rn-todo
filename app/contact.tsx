import React, { useEffect } from "react";
import { useContactsStore } from "../store/contactStore";
import getContactsNative from "../bridges/contactModule";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import { ContactScreenProp } from "./_layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateTodoThunk } from "../store/todoSlice";

const ContactScreen = ({route, navigation}: ContactScreenProp) => {
  let { contacts, loading, fetchContacts } = useContactsStore();
  const dispatch = useDispatch<AppDispatch>();

  const {todo} = route.params;

  useEffect(() => {
    fetchContacts();
    console.log("Contacts fetched:", contacts);
  }, []);

  const handleRefresh = async () => {
    const newDeviceContacts = await getContactsNative();
  };

  if (!contacts || contacts.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Không tìm thấy danh bạ!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 flex-col h-screen bg-white px-4">
      <FlatList
      className="w-full"
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              console.log("Selected contact:", item)
              navigation.popTo("Detail", {id: todo.id});
              dispatch(updateTodoThunk({
                id: todo.id,
                todo: {
                  id: todo.id,
                  title: todo.title,
                  desc: todo.desc,
                  isDone: false,
                  createdAt: todo.createdAt,
                  asignedTo: item.name
                }}));
              navigation.goBack();
            }}
            className="mb-4"
          >
            <View className="p-4 border-2 rounded-lg border-gray-200 w-full">
            <Text className="font-bold text-xl">{item.name}</Text>
            <Text>{item.phone}</Text>
          </View>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default ContactScreen;
