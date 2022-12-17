import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
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
    key: string;
    name: string;
    imgSrc: string;
    altTxt: string | undefined;
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

  export type Lines = [{quantity: number, merchandiseId: string}];
