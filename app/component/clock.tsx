import React, {useEffect, useState} from "react";
import { Text } from "react-native";

const Clock = ({isDarkMode}: {isDarkMode: boolean}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return <Text className={`font-bold text-center text-2xl ${isDarkMode ? "text-white" : "text-black"}`} >Now is {time}</Text>;
  };

  export default Clock;