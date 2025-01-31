import React from "react";
import { useTheme } from "./Themecontext";

const ThemeSelector = () => {
  const { theme, changeTheme, themes } = useTheme();

  const themeColors = {
    default: "#f3f4f6",
    dark: "#1a202c",
  };

  return (
    <div className="theme-selector flex justify-center space-x-4 mt-4 p-4 pl-3 rounded-lg">
      {themes.map((themeName) => (
        <button
          key={themeName}
          onClick={() => changeTheme(themeName)}
          className={`w-6 h-6 rounded-full focus:outline-none transition-all duration-300 ${
            theme === themeName ? "ring-2 ring-yellow-600 scale-110" : ""
          }`}
          style={{
            backgroundColor: themeColors[themeName] || "#ccc",
          }}
        ></button>
      ))}
    </div>
  );
};

export default ThemeSelector;
