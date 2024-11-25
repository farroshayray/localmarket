// src/context/MyContext.js
import React, { createContext, useState, useContext } from 'react';

// Membuat Context
const MyContext = createContext();

// Membuat Provider
export const MyProvider = ({ children }) => {
    const [state, setState] = useState({ user: null });

    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook untuk menggunakan context
export const useMyContext = () => {
    return useContext(MyContext);
};
