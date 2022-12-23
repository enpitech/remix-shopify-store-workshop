import { useState, useEffect } from "react";
import { getCart } from "~/models/cart.client";
import { createCart } from "~/models/cart.client";

export function useCart() {
  const [cartId, setCartId] = useState<any>();
  const [products, setProducts] = useState<[] | undefined>();
  const [total, setTotal] = useState<[] | undefined>();

  useEffect(() => {
    //Check for localCartId
    async function checkLocalStorage() {
      //check if localCartId exists
      const ExistingCart = localStorage.getItem("cartId");

      // return the localCartId
      if (ExistingCart && ExistingCart != "undefined" && ExistingCart != "") {
        setCartId(ExistingCart);
        return;
      } else {
        // if not exists => create new localcartId and return
        const response = await createCart();
        const newCartId = response.cartCreate.cart.id;
        localStorage.setItem("cartId", newCartId);
        setCartId(newCartId);
        return;
      }
    }
    //Get Data from cart
    async function getCartData() {
      const data = await getCart(cartId);
      setProducts(data.cart.lines.edges);
      setTotal(data.cart.estimatedCost.subtotalAmount.amount);
    }
    checkLocalStorage();
    getCartData();
  }, [total, cartId]);

  return [cartId, products, total];
}
