## Nir: What is Remix (Technical and Philosophy)

## I'm talking and showing:

- Setup Remix indie stack skeleton.
  Nir showing (pre-made) - 2 minutes:
- Create a UI skeleton for our store using tailwind UI (header, footer, menu)
- Talk about Routing in Remix

# React version

## Nir demo client + server:

- Create a home page for our store (UI only)
  Connect Shopify API and fetch the home catalog products
  client:
  (snippets - useCollections, useTrendingProducts, product.client, collection.client)
  server:
  (snippets product.server, collection.server)

## Exercise (server only):

- Instructions: render the subroute /product/$productId, use the params,
  implement the loader and implement the product.server
- Create the product page end to end (without add to cart)
  (snippets: product.server, productPage UI, loader)

## Nir Demo (server only):

- ErrorBoundary/CatchBoundry - https://remix.run/docs/en/v1/route/error-boundary
- Product page - add the "add to cart" button
  (snippets - action, cart.server, cart UI)

## Exercise

- Create the cart page end to end
- Render the form - Form
- Implement the loader
- Differentiate between submit and delete using intent
- Action - Collect the data from the form using object.enteries
- Add error boundary
  (snippets - loader, Form, action, cart.server, errorboundary)

# Demo/Exercise - Implement checkout page and use validation: client/server

- Exercise - Implement the checkout Form and TRY TO ADD CLIENT VALIDATION (give them the validations snippet)
- Demo - add client validation with Formik
  (snippets - checkout page, client validation in the checkout page)
- Exercise - add server validation
  (snippets - server validation)
