import React, { useEffect, useRef, useState } from "react";
import "./global.css";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { addTodo, toggleTodo } from "./todoSlice";
import type { Todo } from "./todoSlice";
import Item from "./component/item";
import Clock from "./component/clock";

const HomeScreen = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);
  const [description, setDescription] = useState("");
  const descRef = useRef(null);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const activeTodos = todos.filter((todo) => !todo.isDone);
  const completedTodos = todos.filter((todo) => todo.isDone);

  /*
  useEffect() is like componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  | Class Component        | Functional Component (Hook)          |
  | ---------------------- | ------------------------------------ |
  | `componentDidMount`    | `useEffect(() => {}, [])`            |
  | `componentDidUpdate`   | `useEffect(() => {}, [deps])`        |
  | `componentWillUnmount` | `return () => {}` inside `useEffect` |
  */
  useEffect(() => {
    // console.log("Modal visibility is:", modalVisibility);
  }, [modalVisibility]);

  const renderTodoItem = ({ item }: { item: Todo; index: number }) => {
    const actualIndex = todos.findIndex((todo) => todo.title === item.title);
    return (
      <Item
        todo={item}
        onToggle={(v) => dispatch(toggleTodo({ index: actualIndex, value: v }))}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-col bg-gray-50 p-4">
        <Clock />

        <ScrollView className="h-5/6">
          <View className="my-6">
            <Text className="text-xl font-bold text-gray-800 mb-3 ml-2">
              Not completed ({activeTodos.length})
            </Text>
            <FlatList
              data={activeTodos}
              renderItem={renderTodoItem}
              keyExtractor={(item) => item.title}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {completedTodos.length > 0 && (
            <View className="mb-6">
              <Text className="text-xl font-bold text-gray-600 mb-3 ml-2">
                Done ({completedTodos.length})
              </Text>
              <FlatList
                data={completedTodos}
                renderItem={renderTodoItem}
                keyExtractor={(item) => item.title}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </ScrollView>

        <View className="flex relative mx-auto my-8 flex-row justify-center items-center">
          <Pressable
            className="border-2 bg-white w-52 elevation-md border-slate-500 rounded-full py-2 px-4"
            onPress={() => setModalVisibility(!modalVisibility)}
          >
            <View className="flex flex-row items-center gap-4">
              <Text className="font-bold text-xl text-slate-800">
                Add new task
              </Text>
              <Ionicons name="add" size={24} color="black" />

            </View>
          </Pressable>
        </View>
      </SafeAreaView>
      <Modal visible={modalVisibility} transparent={true} animationType="fade">
        <View className="flex flex-1 items-center justify-center">
          <View
            style={styles.modalView}
            className="gap-4 p-4 rounded-lg flex items-center justify-center w-4/5"
          >
            <Text className="font-bold text-xl mb-4">What are you had to done?</Text>
            <TextInput
              placeholder="Todo title"
              ref={titleRef}
              value={title}
              onChangeText={setTitle}
              className="border-2 border-slate-500 focus:border-blue-500 rounded-lg p-3 w-full"
            />

            <TextInput
              placeholder="Todo detail"
              ref={descRef}
              value={description}
              onChangeText={setDescription}
              className="border-2 border-slate-500 focus:border-blue-500 rounded-lg p-3 w-full"
            />
            <View className="flex flex-row gap-4 justify-center items-cente">
              <Pressable
                className="flex-1"
                onPress={() => setModalVisibility(!modalVisibility)}
              >
                <Text className="bg-red-500 rounded-lg text-white p-4 text-center">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="flex-1"
                onPress={() => {
                  dispatch(addTodo({ title, desc: description }));
                  setTitle("");
                  setDescription("");
                  setModalVisibility(!modalVisibility);
                }}
              >
                <Text className="bg-blue-500 rounded-lg text-white p-4 text-center">
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen;
