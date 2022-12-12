export const testQuery = () => {
  // Shop specific setup constants
  const shopUrl = "https://wearjs.myshopify.com";
  const accessToken = "41d163286cd756551cd06df943018bb1";

  // Simple GraphQL with no variables
  const query1 = `query FirstProduct {
    products(first:1) {
        edges {
            node {
                id
                title
                description
                variants(first:1) {
                    edges {
                        node {
                            title
                            id
                            priceV2 {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            }
        }
    }
}`;

  // Search GraphQL with one typed variable
  const query2 = `query SpecificProduct($id: ID!) {
    node(id: $id) {
        id
        ... on Product {
            title
            description
            id
            handle
        }
    }
}`;

  const getCollectionByIdQuery = `query getCollectionById($id: ID!) {
    collection(id: $id) {
      title
      products(first:10) {
        edges {
            node {
                id
                title
                description
                variants(first:1) {
                    edges {
                        node {
                            title
                            id
                            priceV2 {
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
  `;

  const fetchQuery1 = async () => {
    // Define options for first query with no variables and body is string and not a json object
    const optionsQuery1 = {
      method: "post",
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: query1,
    };
    console.log("here");
    // Fetch data and remember product id
    const response = await fetch(shopUrl + `/api/graphql`, optionsQuery1);
    const data = await response.json();
    console.log(data);
    const productId = data.products.edges[0].node.id;
    console.log("=============== Fetch First Product ===============");
    console.log(JSON.stringify(response, null, 4));
    fetchQuery2(productId);
  };

  // Fetch a specific product with example of json body with both query and variables
  const fetchQuery2 = (productId: any) => {
    const params = {
      query: query2,
      variables: { id: productId },
    };
    const optionsQuery2 = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify(params),
    };
  };

  const fetchCollectionByIdQuery = (collectionId: string) => {
    const params = {
      query: getCollectionByIdQuery,
      variables: { id: collectionId },
    };
    const optionsCollectionByIdQuery = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify(params),
    };

    fetch(shopUrl + `/api/graphql`, optionsCollectionByIdQuery)
      .then((res) => res.json())
      .then((response) => {
        console.log(
          "=============== Fetch Home Collection Products ==============="
        );
        console.log(JSON.stringify(response, null, 4));
      });
  };

  // fetchQuery1();
  fetchCollectionByIdQuery("gid://shopify/Collection/216731549859");
};
