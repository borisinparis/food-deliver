import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  image: string;
  price: number;
  ingredients: string;
}

interface CartItem {
  food: Food;
  quantity: number;
}

export const FoodMenu = ({ foods }: FoodMenuProps) => {
  const [getFoods, setGetFoods] = useState<Food[]>(foods || []);
  const [getCategories, setGetCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCategoriesData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/category");
      setGetCategories(response.data);
    } catch (error) {
      setError("Error fetching categories");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataFoods = async () => {
    try {
      const response = await axios.get("http://localhost:4000/foods");
      setGetFoods(response.data);
    } catch (error) {
      setError("Error fetching foods");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!foods) {
      getDataFoods();
    } else {
      setGetFoods(foods);
    }
    getCategoriesData();
    const storedCart = localStorage.getItem("foods");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [foods]);

  const handleQuantityChange = (
    foodId: number,
    action: "increase" | "decrease"
  ) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(
        (item) => item.food.id === foodId
      );

      if (itemIndex > -1) {
        const item = updatedCart[itemIndex];
        if (action === "increase") {
          item.quantity += 1;
        } else if (action === "decrease" && item.quantity > 1) {
          item.quantity -= 1;
        }
      } else {
        const food = getFoods.find((f) => f.id === foodId);
        if (food) {
          updatedCart.push({ food, quantity: 1 });
        }
      }
      return updatedCart;
    });
  };

  const addToCart = async (food: Food) => {
    try {
      const response = await axios.post("http://localhost:4000/food", {
        food,
        quantity: 1,
      });
    } catch (error) {
      console.log("Error items add", error);
    }

    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.food.id === food.id);
      console.log(itemIndex);

      if (itemIndex > 0) {
        return prevCart;
      }
      return [...prevCart, { food, quantity: 1 }];
    });
    localStorage.setItem(
      "foods",
      JSON.stringify([...cart, { food, quantity: 1 }])
    );
  };

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <>
      {error && <div className="text-center text-red-600">{error}</div>}
      {getCategories.map((category) => (
        <div key={category._id} className="mt-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {category.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {getFoods
              .filter((food) => food.category === category._id)
              .map((food) => (
                <Dialog key={food.id}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white w-[400px] h-[300px] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                      variant="outline"
                    >
                      <div className="w-full h-64 bg-gray-100 relative">
                        <img
                          className="w-full h-full object-cover"
                          src={food.image}
                          alt={food.foodName}
                        />
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                          <h3 className="text-xl font-semibold text-white">
                            {food.foodName}
                          </h3>
                          <p className="text-base text-white mb-1">
                            {food.ingredients}
                          </p>
                          <p className="text-sm text-red-500 mt-2">{`$${food.price}`}</p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] px-6 py-4 bg-white rounded-lg shadow-xl">
                    <div className="flex gap-6 py-4">
                      <img
                        className="w-48 h-48 object-cover rounded-lg shadow-md"
                        src={food.image}
                        alt={food.foodName}
                      />
                      <div className="flex-1">
                        <h2 className="text-[#EF4444] text-xl font-semibold">
                          {food.foodName}
                        </h2>
                        <p className="mt-2 text-gray-600">{food.ingredients}</p>
                        <div className="flex justify-between mt-4">
                          <div>
                            <p className="text-lg">Total price</p>
                            <p className="text-xl font-semibold text-gray-800">
                              $
                              {food.price *
                                (cart.find((item) => item.food.id === food.id)
                                  ?.quantity || 1)}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() =>
                                handleQuantityChange(food.id, "decrease")
                              }
                              className="text-xl px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                            >
                              -
                            </button>
                            <p className="text-lg">
                              {cart.find((item) => item.food.id === food.id)
                                ?.quantity || 1}
                            </p>
                            <button
                              onClick={() =>
                                handleQuantityChange(food.id, "increase")
                              }
                              className="text-xl px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="text-center">
                      <Button
                        onClick={() => addToCart(food)}
                        type="button"
                        className="w-full py-2 bg-red-700 text-white rounded-md"
                      >
                        Add to Cart
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FoodMenu;
