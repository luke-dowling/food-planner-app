import React, { createContext, useState, useEffect } from "react";
import { DateTime } from "luxon";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  //setting the datetime for the pages
  const [dateTime, setDatTime] = useState(DateTime.local());

  useEffect(() => {
    setDatTime(DateTime.local());
    console.log("The hour has changed", DateTime.local().hour);
  }, [DateTime.local().hour]);

  const value = {
    dateTime,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
