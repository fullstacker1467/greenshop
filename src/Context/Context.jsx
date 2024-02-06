import React, { createContext } from "react";
export const ContexData = createContext();
export const Context = ({ children }) => {
  return <ContexData.Provider value={{}}>{children}</ContexData.Provider>;
};
