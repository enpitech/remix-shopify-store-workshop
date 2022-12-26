//GraphQL queries object

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
