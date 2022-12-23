import { useState, useEffect } from "react";
import { createCart } from "~/models/cart.client";

export function useCartId() {
  const [cartId, setCartId] = useState<any>();

  useEffect(() => {
    // async function getLocalCartId() {
    //   //check if localCartId exists
    //   const ExistingCart = localStorage.getItem("cartId");
    //   // return the localCartId
    //   if (ExistingCart && ExistingCart != "undefined" && ExistingCart != "") {
    //     setCartId(ExistingCart);
    //     return cartId;
    //   }
    //   // if not exists => create new localcartId and return
    //   const response = await createCart();
    //   const newCartId = response.cartCreate.cart.id;
    //   localStorage.setItem("cartId", newCartId);
    //   setCartId(newCartId);
    // }
    // getLocalCartId();
  });

  return cartId;
}
