import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { Todo } from "../todoSlice";

/// { todo, onToggle }: { todo: Todo, onToggle: (v: boolean) => void } : props with typecheck
export default function Item({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: (v: boolean) => void;
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Detail", { title: todo.title });
      }}
    >
      <View className="flex flex-row bg-white shadow-lg rounded-xl py-2 px-3 mb-3 mx-1 items-center border border-gray-100">
        <View className="flex flex-col gap-1 flex-1 mr-3">
          <Text
            className={`text-lg font-semibold ${todo.isDone ? "line-through text-gray-500" : "text-gray-800"}`}
          >
            {todo.title}
          </Text>
          {todo.desc !== "" ? (
            <Text
              className={`text-sm text-gray-600 line-clamp-2 ${todo.isDone ? "line-through" : ""}`}
            >
              {todo.desc}
            </Text>
          ) : null}
        </View>
        <Pressable onPress={() => onToggle(!todo.isDone)}>
          {todo.isDone ? (
            <Ionicons name="checkmark-circle" size={32} color={"#22c55e"} />
          ) : (
            <Ionicons name="ellipse-outline" size={32} color="#cbd5e1" />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}
