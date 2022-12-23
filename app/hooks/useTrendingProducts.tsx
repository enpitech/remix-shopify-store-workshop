import { useState, useEffect } from "react";
import { getTrendingProducts } from "~/models/product.client";

export function useTrendingProducts(amount: number) {
  const [trendingProducts, setTrendingProducts] = useState<[] | undefined>();

  useEffect(() => {
    async function getProducts() {
      const data = await getTrendingProducts(amount);
      setTrendingProducts(data);
    }
    getProducts();
  }, [amount]);

  return trendingProducts;
}
