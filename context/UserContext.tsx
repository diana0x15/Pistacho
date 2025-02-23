import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      const name = await AsyncStorage.getItem("username");
      setName(name || "");
    };
    loadName();
  }, []);

  const setUserName = async (name: string) => {
    await AsyncStorage.setItem("username", name);
    setName(name);
  };

  return (
    <UserContext.Provider value={{ name, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
