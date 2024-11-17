
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Header() {
  const [currUser, setCurrUser] = useState(localStorage.getItem("currentUser"));
  useEffect(() => {
    setCurrUser(localStorage.getItem("currentUser"));
  }, []);
  const handleClick = () => {
    localStorage.setItem("currentUser", "");
    localStorage.setItem("cart", "");
    setCurrUser("");
    redirect("/signin")
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FoodieExpress
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/menu" className="text-gray-600 hover:text-orange-500">
            Menu
          </Link>
          {currUser && (
            <Link
              href="/order-history"
              className="text-gray-600 hover:text-orange-500"
            >
              Order History
            </Link>
          )}
          {currUser ? (
            <Button onClick={handleClick} className="bg-orange-500">
              Logout
            </Button>
          ) : (
            <Link
              href="/signin"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
