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
  description: string;
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  variantId: string;
  key: string;
  altTxt: string;
}

export interface Product {
  node: {
    id: string;
    title: string;
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

export interface PostToShopifyParams {
  query: string;
  variables?: {};
}

export interface HeaderProps {
  open: boolean;
  setOpen: any;
}
