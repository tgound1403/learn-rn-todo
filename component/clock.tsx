import React, {useEffect, useState} from "react";
import { Text } from "react-native";

const Clock = ({isDarkMode}: {isDarkMode: boolean}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleString());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return <Text className={`font-semibold text-center text-xl ${isDarkMode ? "text-white" : "text-black"}`} >{time}</Text>;
  };

  export default Clock;