import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMeals = () => {
  const { tourId } = useParams();
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch meals when component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/meal/${tourId}`);
        setMeals(res.data?.meals || []);
        // console.log("Fetched meals:", res.data?.meals || []);
      } catch (err) {
        console.error("Error fetching meals", err);
      }
    };
  
    if (tourId) fetchMeals();
  }, [tourId]);
  
  // useEffect(() => {
  //   console.log("Updated meals state:", meals);
  // }, [meals]);

  // Add Meal Handler
  const handleAddMeal = async () => {
    if (!mealName || !mealDescription) {
      alert("Please enter both Meal Name and Description.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/meal/${tourId}`, {
        name: mealName,
        description: mealDescription,
      });

      setMeals(res.data.meals); // update meals from backend
      setMealName("");
      setMealDescription("");
    } catch (err) {
      console.error("Error adding meal", err);
      alert("Failed to add meal");
    } finally {
      setLoading(false);
    }
  };

  // Delete Meal Handler
  const handleDeleteMeal = async (index) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER}/api/meal/${tourId}/${index}`);
      setMeals(res.data.meals);
    } catch (err) {
      console.error("Error deleting meal", err);
      alert("Failed to delete meal");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-600 text-center">Update Meals</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Meal Name</label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter meal name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Meal Description</label>
          <textarea
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter meal description"
          ></textarea>
        </div>

        <button
          onClick={handleAddMeal}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Meal"}
        </button>
      </div>

      {/* Meals Table */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-700">All Tour Meals</h3>

        {meals.length > 0 ? (
          <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-200 text-gray-700 font-medium p-2">
              <div className="text-center">Meal Name</div>
              <div className="text-center">Meal Description</div>
              <div className="text-center">Action</div>
            </div>

            {meals.map((meal) => (
              <div key={meal._id} className="grid grid-cols-3 border-t p-2 items-center bg-gray-50">
                <div className="text-center">{meal.name}</div>
                <div className="text-center">{meal.description}</div>
                <div className="text-center">
                  <button
                    onClick={() => handleDeleteMeal(meal._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No meals added yet.</p>
        )}
      </div>
    </div>
  );
};

export default UpdateMeals;
