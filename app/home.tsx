import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from 'expo-checkbox';
import "./global.css";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { addTodo, updateTodo, toggleTodo } from './todoSlice';
import type { Todo } from './todoSlice';

function Item({ todo, onToggle }: { todo: Todo, onToggle: (v: boolean) => void }) {
  return (
    <View className="flex flex-row bg-slate-900 gap-4 p-4 text-white mb-4 rounded-lg justify-start items-start">
      <Checkbox value={todo.isDone} onValueChange={onToggle} />
      <Link
        href={{
          pathname: "/todo/[id]",
          params: {
            id: todo.title,
            desc: todo.desc,
            isDone: todo.isDone ? "1" : "0"
          }
        }}
      >
        <View className="flex flex-col gap-2 items-start justify-start">
          <Text className="text-3xl font-bold text-white">{todo.title}</Text>
          <Text className="font-light text-lg text-white line-clamp-2 text-ellipsis">{todo.desc}</Text>
        </View>
        <AntDesign title="caretright" size={24} color="white" />
      </Link>
    </View>
  );
}

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text className="font-bold text-2xl">Now is {time}</Text>;
};

const App = () => {
  // Component state
  const [modalVisibility, setModalVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);
  const [description, setDescription] = useState("");
  const descRef = useRef(null);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

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

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
        <Clock />
        <FlatList
          className="p-4 mb-8 w-full"
          data={todos}
          renderItem={({ item, index }) => (
            <Item
              todo={item}
              onToggle={(v) => dispatch(toggleTodo({ index, value: v }))}
            />
          )}
        />
        <Pressable
          className="border-2 bg-slate-400 border-slate-600 rounded-full p-4"
          onPress={() => setModalVisibility(!modalVisibility)}
        >
          <View className="flex flex-row items-center gap-4">
            <Text className="font-bold text-xl">Add new todo</Text>
            <Ionicons name="add" size={24} color="black" />
          </View>
        </Pressable>
      </SafeAreaView>
      <Modal visible={modalVisibility} transparent={true} animationType="slide">
        <View className="bg-slate-300 flex flex-1 items-center justify-center">
          <View
            style={styles.modalView}
            className="gap-4 p-4 rounded-lg flex items-center justify-center w-4/5"
          >
            <Text className="font-bold text-3xl mb-4">Add new todo</Text>
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

export default App;
