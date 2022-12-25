import type { ReactNode } from "react";

//Collections types

export type CollectionsArray = [] | undefined;
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

//React props
export interface Props {
  children: ReactNode;
}

//Products types
export interface ProductById {
  title: string | undefined;
  id: string | undefined;
  priceRange: {
    minVariantPrice: {
      amount: string | undefined;
      currencyCode: string;
    };
  };
  description: string | undefined;
  featuredImage: {
    altText: string | undefined;
    src: string | undefined;
  };
  variants: {
    edges: [
      {
        node: {
          id: string | undefined;
        };
      }
    ];
  };
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

export interface ProductObj {
  name?: string | undefined;
  imageSrc?: string | undefined;
  variantId?: string | undefined;
  key?: string | undefined;
  altTxt?: string | undefined;
  description?: string | undefined;
  price?: string | undefined;
}

//Global function interface
export interface PostToShopifyParams {
  query: string;
  variables?: {};
}

//Layout component props
// export interface LayoutProps {
//   open: boolean;
//   setOpen: any;
// }
