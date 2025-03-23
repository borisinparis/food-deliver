import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import FoodMenu from "./_foodMenu/page";

interface Category {
  id: number;
  categoryName: string;
}

interface Food {
  id: number;
  name: string;
  categoryId: number;
}

export const Section = () => {
  const [getCategoriesDataBe, setGetCategoriesBe] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  const getCategoriesData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/category`);
      console.log(response);
      setGetCategoriesBe(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getDataFoods = async () => {
    try {
      const response = await axios.get("http://localhost:4000/foods");
      setFoods(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    getCategoriesData();
    getDataFoods();
  }, []);

  return (
    <>
      <div>
        <div className="relative w-full h-auto">
          <Image
            src="/BG.png"
            alt="Background Image"
            layout="responsive"
            width={2000}
            height={1000}
          />
        </div>

        <div className="bg-gray-800 px-5 py-4">
          <h1 className="text-xl text-white">Categories</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {getCategoriesDataBe.map((el, index) => (
              <button
                className={`flex items-center justify-center gap-2 bg-white rounded-3xl px-4 py-2 border ${
                  el.categoryName === "All Dishes"
                    ? "border-red-500 text-white"
                    : "border-gray-00 text-black hover:bg-gray-500"
                }`}
                key={index}
              >
                <span>{el.categoryName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <FoodMenu foods={foods} />
    </>
  );
};

export default Section;
