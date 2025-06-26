import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
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
  Alert,
  NativeModules
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { addTodo, toggleTodo } from "./todoSlice";
import type { Todo } from "./todoSlice";
import Item from "./component/item";
import Clock from "./component/clock";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemeContext } from "./provider/themeProvider";
import { getContacts } from "./bridges/contactModule";

const HomeScreen = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const initialFormState: FormState = {
    title: "",
    desc: "",
  };

  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_DESC":
        return { ...state, desc: action.payload };
      case "RESET":
        return initialFormState;
      default:
        return state;
    }
  }

  // Overkill for this usecase (2 useState is fine or useState with form object), just use for understanding
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  // In redux
  // get data a part of state with useSelector
  const todos: Todo[] = useSelector((state: RootState) => state.todos.data);
  // dispatch from useDispatch use to start an action
  const dispatch = useDispatch();

  // useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.isDone),
    [todos]
  );

  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.isDone),
    [todos]
  );

  /*
  useEffect() is like componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  | Class Component        | Functional Component (Hook)          |
  | ---------------------- | ------------------------------------ |
  | `componentDidMount`    | `useEffect(() => {}, [])`            |
  | `componentDidUpdate`   | `useEffect(() => {}, [deps])`        |
  | `componentWillUnmount` | `return () => {}` inside `useEffect` |
  */

  
  useEffect(() => {
    getContacts().then((contacts) => console.log(contacts))
  .catch((e) => console.error(e));
  }, []);

  const renderTodoItem = ({ item }: { item: Todo; index: number }) => {
    const actualIndex = todos.findIndex((todo) => todo.title === item.title);
    return (
      <Item
        todo={item}
        onToggle={(v) => dispatch(toggleTodo({ index: actualIndex, value: v }))}
      />
    );
  };

  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  const handleSubmit = useCallback(() => {
    if (!formState.title.trim()) {
      Alert.alert("Title is required", "Please input todo title to add");
      titleRef.current?.focus();
      return;
    }
    dispatch(addTodo({ title: formState.title, desc: formState.desc }));
    formDispatch({ type: "RESET" });
    setModalVisibility(!modalVisibility);
  }, [formState.title, formState.desc, dispatch, modalVisibility]);

  const handleCancel= () => {
    formDispatch({ type: "RESET" });
    setModalVisibility(!modalVisibility);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-col bg-gray-50 dark:bg-gray-700 p-4">
        <View
          className={`flex flex-row justify-between items-center py-2 px-3 ${!isDarkMode ? "bg-white" : "bg-black"} rounded-md elevation-sm`}
        >
          <Clock isDarkMode={isDarkMode} />
          <Pressable onPress={toggleTheme}>
            {isDarkMode ? (
              <MaterialIcons name="dark-mode" size={24} color="white" />
            ) : (
              <Entypo name="light-up" size={24} color="black" />
            )}
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="h-5/6">
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
            <Text className="font-bold text-xl mb-4">
              What do you have to do?
            </Text>
            <TextInput
              placeholder="Todo title"
              ref={titleRef}
              value={formState.title}
              onChangeText={(text) =>
                formDispatch({ type: "SET_TITLE", payload: text })
              }
              className="border-2 border-slate-500 focus:border-blue-500 rounded-lg p-3 w-full"
            />

            <TextInput
              placeholder="Todo detail"
              multiline={true}
              ref={descRef}
              value={formState.desc}
              onChangeText={(text) =>
                formDispatch({ type: "SET_DESC", payload: text })
              }
              className="border-2 border-slate-500 focus:border-blue-500 rounded-lg p-3 w-full"
            />
            <View className="flex flex-row gap-4 justify-center items-cente">
              <Pressable
                className="flex-1"
                onPress={handleCancel}
              >
                <Text className="bg-red-500 rounded-lg text-white p-4 text-center">
                  Cancel
                </Text>
              </Pressable>
              <Pressable className="flex-1" onPress={handleSubmit}>
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

type FormState = {
  title: string;
  desc: string;
};

type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "RESET" };

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
