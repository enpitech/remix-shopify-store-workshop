# Intro
- Who are we
- What are we going to learn
- How are we going to do: rebuilding wearjs.com using shopify api (storefront), Remix and GraphQL

## Lecture: What is Remix 
@nir:
- Philosophy
- Technical
- Stacks
@rotem
- Remix data flow + routing (+$ sign)

## Workshop
- Our target: remixing CSR & SSR 
- @nir Demo: Working branch in CSR (talk about the CSR way)
-- UI (root, layout, home, collections, products)
-- shoppify util (post to shopify)
-- collections.client, products. client
-- hooks
- Our challenge - turn all *.client to *.server

- @rotem Demo: moving to SSR
- talk about product.server, collections.server
- talk about the loaders + implement
- talk about the useLoaderData hook

## Exercise turn Product page from CSR to SSR (without add to cart):
- @nir: Instructions: render the subroute /product/$productId, use the params,
  implement the loader and implement the product.server
  (snippets: product.server, productPage UI, loader)
- @nir: show the solution and Talk about tiny-invariant

## Exercise:
- @rotem: Introdue the action function
- Instructions: implement the add to cart logic

- @nir: Break: people will probably struggle with the form, lets talk about Remix's Form

- Product page - add the "add to cart" button
  (snippets - action, cart.server)
- User will need to create a new cart, they can use the "useCart()" hook to do that
it will create one and store the id in the localstorage.


## Exercise - Implement the Cart page
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
 1. use Outlet context
 2. put it in the params
 3. make a GET request to /cart
 4. just use the hook and dont use SSR


# Exercise - Implement checkout page and use validation: client/server
- @rotem - talk about validations (client + server)
- Exercise - Implement the checkout Form and TRY TO ADD CLIENT VALIDATION (give them the validations snippet)
- @rotem Demo - add client validation with Formik
  (snippets - checkout page, client validation in the checkout page)
- Exercise - add server validation
  (snippets - server validation)

OPTIONAL:
# Exercise - Implement loading skeleton
- @nir: Introduce the transition hook
- add it wherever you like

# Exercise - Add error handling 
- @rotem: Intorduce ErrorBoundary/CatchBoundry - https://remix.run/docs/en/v1/route/error-boundary
- exercise: Add error boundary to the root and to the cart?

# Demo - Optimistic UI
- Implement optimistic UI to the checkout form