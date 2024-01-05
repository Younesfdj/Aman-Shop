"use client"
import React, { useContext, useState, useEffect } from "react";
import { SanityProduct } from "@/config/inventory";

interface ContextType {
    cartItems: SanityProduct[];
    setCartItems: React.Dispatch<React.SetStateAction<SanityProduct[]>>;
    handleAddToCart: (item: SanityProduct) => void;
    handleRemoveCartItem: (item: SanityProduct) => void;
}

const AppContext = React.createContext<ContextType>({
    cartItems: [],
    setCartItems: () => { },
    handleAddToCart: () => { },
    handleRemoveCartItem: () => { },
});

interface RootLayoutProps {
    children: React.ReactNode;
}

const AppProvider = ({ children }: RootLayoutProps) => {
    let localCartItems
    if (typeof window !== "undefined") {
        localCartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]")
    }
    const [cartItems, setCartItems] = useState<SanityProduct[]>(localCartItems || []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])


    const handleAddToCart = (item: SanityProduct) => {
        let itemExists: boolean = false;
        let neuCartItems: SanityProduct[];
        neuCartItems = cartItems.map((cartItem: SanityProduct) => {
            if (cartItem._id === item._id) {
                cartItem.quantity += 1;
                itemExists = true;
            }
            return cartItem;
        });
        if (!itemExists) {
            neuCartItems = [
                ...cartItems,
                {
                    ...item,
                    quantity: 1,
                },
            ];
        }
        console.log(neuCartItems);

        setCartItems(neuCartItems);
    };

    const handleRemoveCartItem = (item: SanityProduct) => {
        const neuCartItems = cartItems.filter((itm: SanityProduct) => itm._id !== item._id);
        setCartItems(neuCartItems);
    };

    return (
        <AppContext.Provider
            value={{
                cartItems,
                setCartItems,
                handleAddToCart,
                handleRemoveCartItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = (): ContextType => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };