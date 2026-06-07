import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCartCount,
} from "../services/cartService";

const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {

  const [cartCount,
    setCartCount] =
      useState(0);

  const refreshCartCount =
    async () => {

      try {

        const data =
          await getCartCount();

        setCartCount(
          data.count
        );

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    refreshCartCount();

  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart =
  () =>
    useContext(
      CartContext
    );