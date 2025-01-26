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
    <div className="categories grid grid-cols-2 gap-4 p-4">
      {categories.map((category, index) => (
        <Link
          key={index}
          to={`/category/${category.name.toLowerCase()}`}
          className="category-card border rounded-lg p-4 shadow-lg hover:shadow-xl"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold text-center mt-2">
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
