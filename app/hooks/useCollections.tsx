import { useState, useEffect } from "react";
import { getCollections } from "~/models/collection.client";

export function useCollections(quantity: number) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function getCollectionData() {
      const data = await getCollections(quantity);
      setCollections(data);
    }
    getCollectionData();
  }, [quantity]);

  return collections;
}
