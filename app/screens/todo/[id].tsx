import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodoThunk, updateTodo } from "../../store/todoSlice";
import store, { RootState } from "@/app/store/store";
import { DetailScreenProp } from "../../_layout";

// To typecheck our screens, we need to annotate the navigation and the route props received by a screen.
// The navigator packages in React Navigation export generic types to define types for both the navigation
// and route props from the corresponding navigator.
const DetailScreen = ({ route, navigation }: DetailScreenProp) => {
  const { title } = route.params;

  const dispatch = useDispatch();

  const todo = useSelector((state: RootState) =>
    state.todos.data.find((t) => t.title === title)
  );

  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo?.title || "");
  const [newDesc, setNewDesc] = useState(todo?.desc || "");

  const done = !!todo?.isDone;

  if (!todo)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Không tìm thấy todo!</Text>
      </SafeAreaView>
    );

  const handleSave = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        newTodo: {
          id: todo.id,
          title: newTitle,
          desc: newDesc,
          isDone: done,
          createdAt: todo.createdAt,
        },
      })
    );
    setEditMode(false);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      className="h-full flex flex-col justify-between pt-12 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable
        className="absolute top-12 left-4 z-10 flex-row items-center"
        onPress={() => navigation.goBack()}
        hitSlop={16}
      >
        <Ionicons name="arrow-back" size={28} color="#2563eb" />
      </Pressable>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-5 w-full max-w-xl items-start">
          <View className="flex-row items-start mt-8">
            {editMode ? (
              <TextInput
                className="text-3xl font-extrabold text-blue-700 border-b border-blue-300"
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Tiêu đề"
              />
            ) : (
              <Text className="text-3xl font-extrabold text-blue-700">
                {todo.title}
              </Text>
            )}
          </View>
          <View className="flex-row items-center justify-center my-2">
            <Text
              className={` text-white font-bold ${done ? "bg-green-600" : "bg-orange-500"} py-1 px-4 rounded-full`}
            >
              {done ? "Done" : "To do"}
            </Text>
          </View>
          {editMode ? (
            <TextInput
              className="text-lg text-gray-700 border-b border-blue-200 w-full mt-4"
              value={newDesc}
              onChangeText={setNewDesc}
              placeholder="Description"
              multiline
            />
          ) : (
            <Text className="text-lg text-gray-700 mt-4">{todo.desc}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View className="flex-row items-center justify-center mb-8 gap-4 px-6">
        <Pressable
          className="p-4 bg-blue-500 rounded-lg w-1/2"
          onPress={() => setEditMode(!editMode)}
        >
          <Text className="text-white text-center font-semibold">
            {editMode ? "Cancel" : "Edit"}
          </Text>
        </Pressable>
        {editMode && (
          <Pressable
            className="p-4 w-1/2 bg-green-500 rounded-lg"
            onPress={handleSave}
          >
            <Text className="text-white text-center font-semibold">Save</Text>
          </Pressable>
        )}
        {!editMode && (
          <Pressable
            className="p-4 bg-red-500 w-1/2 rounded-lg"
            onPress={() => {
              store.dispatch(deleteTodoThunk(todo.id));
              navigation.goBack();
            }}
          >
            <Text className="text-white text-center font-semibold">Delete</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default DetailScreen;
