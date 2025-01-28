import React, { useState, useEffect } from "react";

const TimeZoneGreeting = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [greeting, setGreeting] = useState("");

  // Function to get current time of day and adjust greeting
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    // Set timeOfDay based on the user's current time
    if (hours >= 5 && hours < 12) {
      setTimeOfDay("morning");
      setGreeting(
        "A sunny hello! Ready for a fresh start and a fresh bite? 🌞🍳"
      );
    } else if (hours >= 12 && hours < 17) {
      setTimeOfDay("afternoon");
      setGreeting("Refuel your afternoon with something delicious 🥗✨");
    } else if (hours >= 17 && hours < 20) {
      setTimeOfDay("evening");
      setGreeting("The sun’s setting, and the table’s calling! 🍲✨ ");
    } else {
      setTimeOfDay("night");
      setGreeting("The stars are out, and so are the snacks. Hungry? 🌟🍔");
    }
  }, []);
  return (
    <h1 className="text-4xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-500 animate-pulse drop-shadow-lg mb-8">
      {greeting}
    </h1>
  );
  
};

export default TimeZoneGreeting;
