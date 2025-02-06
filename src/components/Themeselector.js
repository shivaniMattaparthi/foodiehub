import React from "react";
import { useTheme } from "./Themecontext";

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    changeTheme(theme === "default" ? "dark" : "default");
  };

  return (
    <div className="theme-selector flex justify-center ">
      <button
        onClick={toggleTheme}
        className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all duration-300 ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default ThemeSelector;
