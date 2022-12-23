import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  collections: [];
}

export interface CollectionObj {
  key: string;
  name: string;
  imgSrc: string;
  altTxt: string | undefined;
}

export interface Collection {
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
                    altText: string | undefined;
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

export interface ProductObj {
  name?: string;
  imageSrc?: string;
  variantId?: string | undefined;
  key?: string;
  altTxt?: string | undefined | null;
  description?: string;
  price?: string;
}

export interface Product {
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

export interface PostToShopifyParams {
  query: string;
  variables?: {};
}

export interface HeaderProps {
  open: boolean;
  setOpen: any;
}
