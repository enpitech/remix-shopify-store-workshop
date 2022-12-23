import { useState, useEffect } from "react";
import { getCollections } from "~/models/collection.client";

export function useCollections(amount: number) {
  const [collections, setCollections] = useState<[] | undefined>();

  useEffect(() => {
    async function getCollectionData() {
      const data = await getCollections(amount);
      setCollections(data);
    }
    getCollectionData();
  }, [amount]);

  return collections;
}
