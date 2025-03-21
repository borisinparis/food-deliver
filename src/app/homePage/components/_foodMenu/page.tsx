import axios from "axios";
import { useEffect, useState } from "react";

interface FoodMenuProps {
  foods?: Food[];
}

interface Category {
  _id: string;
  categoryName: string;
}

interface Food {
  id: number;
  foodName: string;
  category: string;
  img: string;
  price: number;
  ingredients: string; // Make sure price is a number
}

export const FoodMenu = ({ foods }: FoodMenuProps) => {
  const [getFoods, setGetFoods] = useState<Food[]>(foods || []);
  const [getCategories, setGetCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");

  const getCategoriesData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/category");
      setGetCategories(response.data);
    } catch (error) {
      setError("Error fetching categories");
      console.log(error);
    }
  };

  const getDataFoods = async () => {
    try {
      const response = await axios.get("http://localhost:4000/foods");
      setGetFoods(response.data);
    } catch (error) {
      setError("Error fetching foods");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!foods) {
      getDataFoods();
    } else {
      setGetFoods(foods); // If foods prop is passed, use it directly
    }
    getCategoriesData();
  }, [foods]);

  return (
    <>
      {error && <div className="error">{error}</div>} {/* Show error if any */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getCategories.map((category) => (
          <div key={category._id}>
            <h2>{category.categoryName}</h2>
            {getFoods
              .filter((food) => food.category === category._id)
              .map((food) => (
                <div key={food.id} className="pt-3">
                  <div>
                    <div className="w-[371px] h-full bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        className="w-full h-64 object-cover"
                        src={food.img}
                        alt={food.foodName}
                      />
                      <div className=" flex justify-between p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {food.foodName}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-red-700 font-semibold">{`$${food.price}`}</span>
                        </div>
                      </div>
                      <span className=" p-4 text-gray-600 text-sm">
                        {food.ingredients}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodMenu;
