import { useState, useEffect } from "react";
import { getTrendingProducts } from "~/models/product.client";

export function useTrendingProducts(quantity: number) {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const data = await getTrendingProducts(quantity);
      setTrendingProducts(data);
    }
    getProducts();
  }, [quantity]);

  return trendingProducts;
}
