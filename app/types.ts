import type { ReactNode } from "react";

//Collections types

export type CollectionsArray = [] | undefined;
export interface Collection {
  key: string;
  name: string;
  imgSrc: string;
  altTxt?: string;
}

export interface ShopifyCollection {
  node: {
    title: string;
    products: {
      edges: [
        {
          node: {
            id: string;
            images: {
              edges: [
                {
                  node: {
                    altText?: string;
                    src: string;
                  };
                }
              ];
            };
          };
        }
      ];
    };
  };
}

//React props
export interface Props {
  children: ReactNode;
}

//Products types
export interface Product {
  title?: string;
  id?: string;
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
  description?: string;
  featuredImage?: {
    altText?: string;
    src?: string;
  };
  variants?: {
    edges?: [
      {
        node?: {
          id?: string;
        };
      }
    ];
  };
}

export interface CartProduct {
  node?: {
    id?: string;
    quantity?: number | string;
    merchandise?: {
      id?: string;
      image?: {
        altText?: null;
        src?: string;
      };
      title?: string;
      product?: {
        id?: string;
        description?: string;
        title?: string;
        priceRange?: {
          minVariantPrice?: {
            amount?: string | number;
            currencyCode?: string;
          };
        };
      };
    };
  };
}

export interface TrendingProduct {
  node: {
    id: string;
    title: string;
    variants: {
      edges: [
        {
          node: {
            id: string;
          };
        }
      ];
    };
    images: {
      edges: [
        {
          node: {
            altText: null;
            src: string;
          };
        }
      ];
    };
  };
}

export interface ProductObj {
  name?: string;
  imageSrc?: string;
  variantId?: string;
  key?: string;
  altTxt?: string;
  description?: string;
  price?: string;
}

//Global function interface
export interface PostToShopifyParams {
  query: string;
  variables?: {};
}
