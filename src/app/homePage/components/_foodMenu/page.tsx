import axios from "axios";
import { useEffect, useState } from "react";

interface FoodMenuProps {
  foods?: any[];
}

interface Category {
  _id: string;
  categoryName: string;
}

interface Food {
  id: number;
  foodName: string;
  category: string;
}

export const FoodMenu = ({ foods }: FoodMenuProps) => {
  const [getFoods, setGetFoods] = useState<Food[]>(foods || []);
  const [getCategories, setGetCategories] = useState<Category[]>([]);

  const getCategoriesData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/category");
      setGetCategories(response.data);
      console.log(response);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const getDataFoods = async () => {
    try {
      const response = await axios.get("http://localhost:4000/foods");
      setGetFoods(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching foods:", error);
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
      <div>
        {getCategories.map((category) => (
          <div key={category._id}>
            <h2>{category.categoryName}</h2>
            {getFoods
              .filter((food) => food.category === category._id)
              .map((food) => (
                <div key={food.id}>
                  <p>{food.foodName}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodMenu;
