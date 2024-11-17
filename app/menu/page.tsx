"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { redirect } from "next/navigation";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato and mozzarella",
    price: 12.99,
    image: "/images/margarita.webp",
  },
  {
    id: 2,
    name: "Vegetarian Burger",
    description: "Plant-based patty with fresh veggies",
    price: 10.99,
    image: "/images/burger.jpg",
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing",
    price: 8.99,
    image: "/images/salad.jpg",
  },
  {
    id: 4,
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta",
    price: 14.99,
    image: "/images/spaghetti.jpg",
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce",
    price: 18.99,
    image: "/images/salmon.jpeg",
  },
  {
    id: 6,
    name: "Chocolate Brownie",
    description: "Rich and fudgy with vanilla ice cream",
    price: 6.99,
    image: "/images/brownie.jpeg",
  },
];

export default function MenuPage() {
  const currentUser = localStorage.getItem("currentUser");
  console.log(currentUser)
  if (!currentUser) {
    redirect("/signin");
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let newCart: CartItem[];

      if (existingItem) {
        newCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success(`${item.name} added to cart!`);
      return newCart;
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Menu</h1>
        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-600" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={500}
                className="w-full h-96 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{item.name}</CardTitle>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <p className="text-lg font-bold text-orange-500 mt-2">
                ${item.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => addToCart(item)}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
