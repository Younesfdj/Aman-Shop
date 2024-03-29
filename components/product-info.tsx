"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SanityProduct } from "@/config/inventory";
import { getSizeName } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGlobalContext } from "@/utils/context";

interface Props {
  product: SanityProduct;
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const incrementItem = (id: string) => { return id }
  // @ts-ignore
  const { handleAddToCart } = useGlobalContext()
  const { toast } = useToast();
  // const isInCart = !!cartDetails?.[product._id];
  function addToCart() {
    const item = {
      ...product,
      product_data: {
        size: selectedSize,
      },
    };
    handleAddToCart(item)
    let isInCart
    // isInCart ? incrementItem(item._id) : handleAddToCart(item);
    toast({
      title: `${item.name} (${getSizeName(selectedSize)})`,
      description: "Product added to cart",
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open cart</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    });

  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          productPrice
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectedSize)}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
            onClick={() => setSelectedSize(size)}
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            onClick={addToCart}
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}
