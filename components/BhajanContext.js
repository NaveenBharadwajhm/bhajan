// BhajanContext.js
import React, { createContext, useState } from 'react';

export const BhajanContext = createContext();

export const BhajanProvider = ({ children }) => {
  const [bhajan, setBhajan] = useState(null);

  return (
    <BhajanContext.Provider value={{ bhajan, setBhajan }}>
      {children}
    </BhajanContext.Provider>
  );
};
