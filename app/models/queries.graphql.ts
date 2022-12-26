//GraphQL cart queries

export const getCartQuery = `query getCart($id: ID!) {
    cart(id: $id) {
      estimatedCost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                image {
                  altText
                  src
                }
                title
                product {
                  id
                  description
                  title
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

export const removeItemFromCartQuery = `mutation removeItemFromCart($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        priceV2 {
                          amount
                          currencyCode
                        }
                        product {
                          title
                          handle
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `;

export const cartLinesUpdateQuery = `mutation MyMutation($cartId: ID!, $lineId: ID!, $merchandiseId: ID!, $quantity: Int!) {
          cartLinesUpdate(
            cartId: $cartId
            lines: {id: $lineId, quantity: $quantity, merchandiseId: $merchandiseId}
          ) {
            cart {
              checkoutUrl
            }
          }
        }`;

export const createCartQuery = `mutation createCart {
        cartCreate {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;

export const addItemToCartQuery = `mutation MyMutation($cartId: ID!, $lines: [CartLineInput!] = {merchandiseId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNTU1NjQwNjEwMDEzMQ==", quantity: 1}) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      priceV2 {
                        amount
                      }
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

//GraphQL product queries

export const getTrendsProductsQuery = `query getProducts($first: Int = 10) {
    products(first: $first) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                altText
                src
              }
            }
          }
        }
      }
    }
  }
  `;

export const getProductByIdQuery = `query getProductById($id: ID!) {
    product(id: $id) {
      title
      id
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      description
      featuredImage {
        altText
        src
      }
      variants(first: 5) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `;

//GraphQL collection queries

export const getCollectionsQuery = `query getCollections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          title
          products(first: 1) {
            edges {
              node {
                id
                images(first: 1) {
                  edges {
                    node {
                      altText
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 `;
