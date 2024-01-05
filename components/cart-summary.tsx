"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { seedOrdersData } from "@/lib/seedOrders";
import { useToast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/utils/context";
import { SanityProduct } from "@/config/inventory";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


interface Orders {
  product: string,
  quantity: number,
  _key: string
}
interface Product {
  product: SanityProduct
}

export function CartSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState(0)
  const { toast } = useToast();
  const { cartItems, setCartItems } = useGlobalContext()
  const [totalPrice, setTotalPrice] = useState(0)
  const [subTotalPrice, setSubTotalPrice] = useState(0)

  useEffect(() => {
    let total: number = 0
    cartItems.forEach(item => {
      total += item.price * item.quantity
    });
    setTotalPrice(total)
    setSubTotalPrice(total + 400)
  }, [cartItems])

  const submitHandler = async () => {
    let orders: Orders[] = []
    cartItems.forEach((item: Product["product"]) => {
      orders.push({
        product: item.slug,
        quantity: item.quantity,
        _key: item.sku
      })
    });

    let order = {
      phone, email, lastname, address, firstname, orders
    }
    try {
      await seedOrdersData(order)
      toast({
        title: `Checked-out ✓`,
        description: "Succefully checked-out your orders",
        action: (
          <Link href="/">
            <Button variant="link" className="gap-x-2 whitespace-nowrap">
              <span>Return to home</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        )
      });
      setCartItems([])
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{totalPrice} {"DZD"}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            400 DZD
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {subTotalPrice} {"DZD"}
          </dd>
        </div>
      </dl>

      <Dialog>
        <DialogTrigger className="mt-6" asChild>
          <Button onClick={() => setIsLoading(true)} className="w-full" disabled={isLoading}>
            Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogDescription>
              Fill sensively this form
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input id="firstName" placeholder="Younes" className="col-span-3" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Last Name
              </Label>
              <Input id="lastName" placeholder="Ferradji" className="col-span-3" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Input id="Email" placeholder="younesf@xyz.com" className="col-span-3" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="Phone" placeholder="055XXXXXXX" className="col-span-3" onChange={(e) => setPhone(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input id="Address" placeholder="15 rue Khelifa Boukhalfa" className="col-span-3" onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={email === "" || phone === 0 || firstname === "" || lastname === "" || address === ""} onClick={() => submitHandler()
            }>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section >
  );
}
