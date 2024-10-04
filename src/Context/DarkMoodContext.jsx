import React, { Children, createContext, useEffect, useState } from "react";

export const moodChangeContext = createContext();

const DarkMoodContext = ({ children }) => {
  const [changeMood, setChangeMood] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", changeMood);
  }, [changeMood]);

  const handleChangeMood = () => {
    setChangeMood((mood) => (mood === "light" ? "dark" : "light"));
  };

  return (
    <moodChangeContext.Provider value={{ changeMood, handleChangeMood }}>
      {children}
    </moodChangeContext.Provider>
  );
};

export default DarkMoodContext;
