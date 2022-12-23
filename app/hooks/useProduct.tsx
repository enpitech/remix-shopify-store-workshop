import { useState, useEffect } from "react";
import { getProductById } from "~/models/product.client";

export function useProduct(productId: string) {
  const [product, setProduct] = useState<[] | undefined>();

  useEffect(() => {
    async function getProductData() {
      const data = await getProductById(productId);
      setProduct(data.product);
    }
    getProductData();
  }, []);

  return product;
}
