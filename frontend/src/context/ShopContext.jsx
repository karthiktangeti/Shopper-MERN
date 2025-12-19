import React, { createContext, useEffect, useState } from "react";
import api from "../api";

export const ShopContext = createContext(null);

// 🔹 Default empty cart
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i <= 300; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // 🔥 FETCH PRODUCTS + CART (BACKEND CALLS)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/allproducts");
        setAll_Product(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    const fetchCart = async () => {
      if (localStorage.getItem("auth-token")) {
        try {
          const res = await api.post(
            "/getcart",
            {},
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );
          setCartItems(res.data);
        } catch (error) {
          console.log("Error fetching cart:", error);
        }
      }
    };

    fetchProducts(); // ✅ function call
    fetchCart(); // ✅ function call
  }, []);

  // 🔹 Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔹 Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      try {
        await api.post(
          "/addtocart",
          { itemId },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      } catch (error) {
        console.log("Add to cart error:", error);
      }
    }
  };

  // 🔹 Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));

    if (localStorage.getItem("auth-token")) {
      try {
        await api.post(
          "/removefromcart",
          { itemId },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      } catch (error) {
        console.log("Remove from cart error:", error);
      }
    }
  };

  // 🔹 Total price
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find((p) => p.id === Number(item));
        if (product) {
          totalAmount += product.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // 🔹 Total items count
  const gettotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    gettotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
