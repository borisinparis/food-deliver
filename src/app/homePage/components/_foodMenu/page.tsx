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

  const addToCart = (food: Food) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.food.id === food.id);
      if (itemIndex > -1) {
        return prevCart;
      }
      return [...prevCart, { food, quantity: 1 }];
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {error && <div className="error">{error}</div>}
      {getCategories.map((category) => (
        <div key={category._id}>
          <h2>{category.categoryName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getFoods
              .filter((food) => food.category === category._id)
              .map((food) => (
                <Dialog key={food.id}>
                  <DialogTrigger asChild>
                    <Button
                      className="pt-3 w-[371px] h-full bg-white rounded-lg shadow-lg"
                      variant="outline"
                    >
                      <div className="pt-3">
                        <img
                          className="w-full h-64 object-cover overflow-hidden"
                          src={food.image}
                          alt={food.foodName}
                        />
                        <div className="flex justify-between p-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {food.foodName}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-red-700 font-semibold">{`$${food.price}`}</span>
                          </div>
                        </div>
                        <span className="p-4 text-gray-600 text-sm">
                          {food.ingredients}
                        </span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <div className="flex gap-4 py-4">
                      <img
                        className="w-full h-64 object-cover"
                        src={food.image}
                        alt={food.foodName}
                      />
                      <div>
                        <h2 className="text-[#EF4444]">{food.foodName}</h2>
                        <p>{food.ingredients}</p>
                        <div className="flex justify-between mt-4">
                          <div>
                            <p>Total price</p>
                            <p>
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
                              className="text-xl px-2 py-1 border rounded"
                            >
                              -
                            </button>
                            <p>
                              {cart.find((item) => item.food.id === food.id)
                                ?.quantity || 1}
                            </p>
                            <button
                              onClick={() =>
                                handleQuantityChange(food.id, "increase")
                              }
                              className="text-xl px-2 py-1 border rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => addToCart(food)} type="button">
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
