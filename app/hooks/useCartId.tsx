import { useState, useEffect } from "react";
import { createCart } from "~/models/cart.client";

export function useCartId() {
  const [cartId, setCartId] = useState<any>();

  useEffect(() => {
    async function getLocalCartId() {
      const ExistingCart = localStorage.getItem("cartId");
      if (ExistingCart && ExistingCart != "undefined" && ExistingCart != "") {
        setCartId(ExistingCart);
        return cartId;
      }
      const response = await createCart();
      const newCartId = response.cartCreate.cart.id;
      localStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
    }
    getLocalCartId();
  }, [cartId]);

  return cartId;
}
