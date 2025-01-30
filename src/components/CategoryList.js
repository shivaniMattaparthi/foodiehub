import React from "react";
import { Link } from "react-router-dom";
import veg from "./veg.jpeg";
import nonveg from "./nonveg.jpg";
import breakfast from "./breakfast.jpg";
import side from "./side.jpg";
import seafood from "./seafood.jpeg";
import pasta from "./pasta.jpeg";

const categories = [
  { name: "Vegetarian", image: veg },
  { name: "Beef", image: nonveg },
  { name: "Breakfast", image: breakfast },
  { name: "Dessert", image: side },
  { name: "Seafood", image: seafood },
  { name: "Pasta", image: pasta },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-100 to-purple-100 categories grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {categories.map((category, index) => (
        <Link
          key={index}
          to={`/category/${category.name.toLowerCase()}`}
          className="bg-white group border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg h-40">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Text Section */}
          <h2 className="text-xl font-semibold text-center mt-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
