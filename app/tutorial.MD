Put link to the repo in Frontendistim

## Introduction - 40 minutes

@nir:
https://www.figma.com/proto/tc6hv0MlTMw57uG8s1C0u2/Enpitech?node-id=357%3A44&scaling=scale-down&page-id=348%3A1702&starting-point-node-id=357%3A44
https://www.figma.com/file/tc6hv0MlTMw57uG8s1C0u2/Enpitech?node-id=348%3A1702&t=9O4vny2q4Ee0Q1Fu-0

- What are we going to learn - Remix (philosopfy, technical)
- Who are we
- What is Remix

  - Philosophy
  - Technical
  - Stacks

- @nir:
- How are we going to do it:
  We are going to rebuild wearjs.com using shopify api (storefront), Remix and GraphQL
  https://shopify.dev/api/storefront
- show wearjs.com, show shopify storefront api, show tailwind, show remix (who knows? how much? who have experince? next? react?)

- @rotem:
- Go through the stack code (and cli)
- Explain about Remix data flow + routing (+$ sign)

## Workshop - 30 minutes

- Our target: remixing CSR & SSR
- @nir Demo: Working branch in CSR (talk about the CSR way)
  -- UI (root, layout, home, collections, products)
  -- shoppify util (post to shopify)
  -- collections.client, products. client
  -- hooks
- Our challenge - turn all _.client to _.server

- @rotem Demo: moving to SSR
- talk about product.server, collections.server
- talk about the loaders + implement
- talk about the useLoaderData hook

## Exercise turn Product page from CSR to SSR (without add to cart): - 1 hour

- @nir: Instructions: render the subroute /product/$productId, use the params,
  implement the loader and implement the product.server
  (snippets: product.server, productPage UI, loader)
- @nir: show the solution and Talk about tiny-invariant

## Exercise: - 1 hour

- @rotem: Introduce the action function
- Instructions: implement the add to cart logic

- @nir: Break: people will probably struggle with the form, lets talk about Remix's Form

- Product page - add the "add to cart" button
  (snippets - action, cart.server)
- User will need to create a new cart, they can use the "useCart()" hook to do that
  it will create one and store the id in the localstorage.

## Exercise - Implement the Cart page - 1 hour

- Instructions: Turn the Cart page to SSR using Remix architecture (loader, action, UI, cart.client -> cart.server)
- Implement the loader
- Render Form
- Implement the action (collect the data from the form using object.enteries) -
  // const body = await request.formData();
  // const { cartId, lineNumber } = Object.fromEntries(body);
- Differentiate between submit and delete using intent

- Add a link (Link) from the product page.
- The users will have a problem retriveing the cart because we need to presist it in localstorage (use the hook useCart)

- @nir: Discuss about the challenge of using the cart id
  Posibble solutions:

1.  use Outlet context
2.  hidden input
3.  put it in the params
4.  make a GET request to /cart
5.  just use the hook and dont use SSR

# Talk about Outlet

# Demo - Implement checkout page and use validation: client/server - 30 minutes

- @rotem - talk about validations (client + server) and show client validation with Formik
- @rotem Demo
- add server validation
  (snippets - server validation)

# Demo - Optimistic UI - 15 minutes

- Implement optimistic UI to the checkout form

# Demo - Add error handling - 15 minutes

- @rotem: Intorduce ErrorBoundary/CatchBoundry - https://remix.run/docs/en/v1/route/error-boundary
- exercise: Add error boundary to the root and to the cart?

# Demo - Talk about prefetching
