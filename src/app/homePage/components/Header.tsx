import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
interface Food {
  foodName: string;
  ingredients: string;
  price: number;
  image: string;
}

interface TokenData {
  data: {
    email: string;
  };
}

export const Header = () => {
  const { push } = useRouter();
  const [foods, setFoods] = useState<Food[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("foods");
    push("/login");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFoods = JSON.parse(localStorage.getItem("foods") || "[]");
      if (!storedFoods) {
        const defaultFoods: Food[] = [];
        localStorage.setItem("foods", JSON.stringify(defaultFoods));
        setFoods(defaultFoods);
      } else {
        setFoods(storedFoods);
      }

      const token = localStorage.getItem("token") || "[]";
      const decodedToken = jwtDecode<TokenData>(token);
    }
  }, []);

  const getTotalPrice = () => {
    return foods.reduce((total, food) => total + parseInt(food.food.price), 0);
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [foods]);

  const token = localStorage.getItem("token") || "[]";
  const tokenData = jwtDecode<TokenData>(token);

  return (
    <div className="w-full px-5 flex items-center justify-between h-[68px] bg-black">
      <div className="flex">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <div>
          <div className="flex">
            <div className="text-white">Nom</div>
            <div className="text-red-700">Nom</div>
          </div>
          <div className="text-white">Swift delivery</div>
        </div>
      </div>
      <div className="flex gap-[5px] w-[348px] h-36px">
        <Button
          className="flex rounded-2xl w-[281px] h-[36px]"
          variant="outline"
        >
          <Image
            src="/Location icon.png"
            width={20}
            height={20}
            alt="Location icon"
          />
          <div className="text-red-700">Delivery address:</div>
          <div>Add Location</div>
          <Image
            src="/Vector (1).png"
            width={10}
            height={10}
            alt="Arrow icon"
          />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-[36px] bg-white rounded-2xl h-[36px]">
            {foods.length > 0 && (
              <div className="p-2 text-red-500">{`${foods.length}`}</div>
            )}
            <Image
              src="/Vector (2).png"
              width={30}
              height={30}
              alt="Another icon"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {foods.map((food, index) => (
              <div key={index}>
                <DropdownMenuItem>{food.food.foodName}</DropdownMenuItem>
                <div className="p-2 text-gray-500">{food.food.ingredients}</div>
                <img
                  src={food.food.image}
                  className="w-[124px] h-[120px]"
                  alt=""
                />
                <p className="text-red-500">${food.food.price}</p>
              </div>
            ))}
            <DropdownMenuItem>{`Total price: $${totalPrice}`}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Checkout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-[36px] h-[36px] rounded-2xl bg-red-700"></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{tokenData.data.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
