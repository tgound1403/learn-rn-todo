import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { Todo } from "../todoSlice";

export default function Item({ todo, onToggle }: { todo: Todo, onToggle: (v: boolean) => void }) {
    return (
      <View className="flex flex-row bg-white shadow-lg rounded-xl p-4 mb-3 mx-2 items-center border border-gray-100">
        <Checkbox 
          value={todo.isDone} 
          onValueChange={onToggle}
          className="mr-3"
        />
        <View className="flex flex-col gap-1 flex-1 mr-3">
          <Text className={`text-lg font-semibold ${todo.isDone ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.title}
          </Text>
          <Text className={`text-sm text-gray-600 line-clamp-2 ${todo.isDone ? 'line-through' : ''}`}>
            {todo.desc}
          </Text>
        </View>
        <Link
          href={{
            pathname: "/todo/[id]",
            params: {
              id: todo.title,
              desc: todo.desc,
              isDone: todo.isDone ? "1" : "0"
            }
          }}
          className="p-2"
        >
          <AntDesign name="right" size={16} color="#6b7280" />
        </Link>
      </View>
    );
  }