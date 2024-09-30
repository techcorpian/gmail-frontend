import React, { createContext, useState } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  const toggleDrawer = () => {
    setIsManualOpen(!isManualOpen);
    setIsOpen(!isManualOpen);
};

const handleMouseEnter = () => {
    if (!isManualOpen) {
        setIsOpen(true);
    }
};

const handleMouseLeave = () => {
    if (!isManualOpen) {
        setIsOpen(false);
    }
};

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer, handleMouseEnter, handleMouseLeave, isManualOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
