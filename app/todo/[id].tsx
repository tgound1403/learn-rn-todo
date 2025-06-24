import React, { useState } from "react";
import { SafeAreaView, Text, View, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateTodo } from '../todoSlice';
import { DetailScreenProp } from "../_layout";

const DetailScreen = ({ route, navigation } : DetailScreenProp) => {
  const { title } = route.params;

  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) =>state.todos.todos.find((t) => t.title === title));
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
        oldTitle: todo.title,
        newTodo: { title: newTitle, desc: newDesc, isDone: done, createdAt: todo.createdAt },
      })
    );
    setEditMode(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-100 to-blue-300 justify-center items-center p-6">
      <Pressable
        className="absolute top-12 left-4 z-10 flex-row items-center"
        onPress={() => navigation.goBack()}
        hitSlop={16}
      >
        <Ionicons name="arrow-back" size={28} color="#2563eb" />
        <Text className="ml-2 text-lg text-blue-700 font-semibold">
          Quay lại
        </Text>
      </Pressable>
      <View className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl items-center">
        <View className="flex-row items-center">
          {editMode ? (
            <TextInput
              className="text-3xl font-extrabold text-blue-700 mr-3 border-b border-blue-300 w-48 text-center"
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Tiêu đề"
            />
          ) : (
            <Text className="text-3xl font-extrabold text-blue-700 mr-3">
              {todo.title}
            </Text>
          )}
        </View>
        <View className="flex-row items-center justify-center mb-4">
          <Text className="text-base font-semibold text-gray-600 mr-2"> 
            Trạng thái:
          </Text>
          <Text
            className={`text-base font-bold ${done ? "text-green-600" : "text-orange-500"}`}
          >
            {done ? "Done" : "Not completed"}
          </Text>
        </View>
        {editMode ? (
          <TextInput
            className="text-lg text-gray-700 mb-6 text-center border-b border-blue-200 w-full"
            value={newDesc}
            onChangeText={setNewDesc}
            placeholder="Description"
            multiline
          />
        ) : (
          <Text className="text-lg text-gray-700 mb-6 text-center whitespace-pre-line">
            {todo.desc}
          </Text>
        )}
        <View className="flex-row items-center justify-center mt-4 gap-4">
          <Pressable
            className="px-4 py-2 bg-blue-500 rounded-lg"
            onPress={() => setEditMode(!editMode)}
          >
            <Text className="text-white font-semibold">
              {editMode ? "Cancel" : "Edit"}
            </Text>
          </Pressable>
          {editMode && (
            <Pressable
              className="px-4 py-2 bg-green-500 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white font-semibold">Save</Text>
            </Pressable>
          )}
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;