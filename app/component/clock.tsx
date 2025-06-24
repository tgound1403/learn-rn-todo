import React, {useEffect, useState} from "react";
import { Text } from "react-native";

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return <Text className="font-bold text-center mt-2 text-2xl">Now is {time}</Text>;
  };

  export default Clock;