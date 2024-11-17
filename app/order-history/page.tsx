"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

export default function OrderHistoryPage() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    redirect("/signin");
  }

  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orderHistory");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
        <Link
          href="/menu"
          className="text-orange-500 hover:text-orange-600 mr-4"
        >
          <ChevronLeft className="inline-block mr-1" />
          Back to Menu
        </Link>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-xl text-gray-600 mb-4">
              You haven't placed any orders yet.
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/menu">Start Ordering</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div key={Math.random()} className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order #{order.id}</span>
                  {/* <span className="text-sm font-normal text-gray-600">
                    {new Date(order.date).toLocaleString()}
                  </span> */}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={order.id}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>
                          ${(order.price * order.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
                <div className="mt-4 text-right">
                  <span className="font-bold">Total: ${order.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
