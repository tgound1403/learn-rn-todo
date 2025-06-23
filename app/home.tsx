import React, { useState } from "react";
import "./global.css";
import { Button, FlatList, Text, View, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

class Car {
  constructor(name: string, year: number) {
    this.name = name;
    this.year = year;
  }

  name: string;
  year: number;
}

function Item(car: Car) {
  return (
    <View className="flex flex-col items-start justify-center bg-slate-500 p-4 text-white mb-4 rounded-lg">
      <Text className="text-3xl font-bold text-white">{car.name}</Text>
      <Text className="font-light text-lg text-white">{car.year}</Text>
    </View>
  );
}

export default function App() {
  let [isShow, setIsShow] = useState(false);
  let cars: Car[] = [
    new Car("Ferrari", 2000),
    new Car("Lamborghini", 2000),
    new Car("Ford", 2000),
    new Car("BMW", 2000),
    new Car("Mercesdez", 2000),
  ];

  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
        <Text className="font-bold text-2xl">Today is {Date()}</Text>
        <FlatList
          className="p-4 mb-8 w-full"
          data={cars}
          renderItem={({ item }) => <Item name={item.name} year={item.year} />}
        />
        <Link href="/todo/abc">Go to todo</Link>
        <Button
          title={"Add new todo"}
          onPress={() => {
            setIsShow(true);
          }}
        ></Button>
      </SafeAreaView>
      {isShow ? (
        <Modal
          transparent={true}
          animationType="slide"
          className="flex items-center justify-center"
        >
          <View className="bg-slate-300 gap-4 p-4 rounded-lg flex items-center justify-center">
            <Text className="font-bold text-3xl mb-4">Add new todo</Text>
            <TextInput
              placeholder="Todo title"
              className="border-2 rounded-lg w-2/3"
            />
            <TextInput
              placeholder="Todo detail"
              className="border-2 rounded-lg w-2/3"
            />
            <Button
              title="X"
              onPress={() => {
                setIsShow(false);
              }}
            />
          </View>
        </Modal>
      ) : null}
    </>
  );
}
