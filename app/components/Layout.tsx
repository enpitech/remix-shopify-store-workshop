import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { ShopifyCollection, CollectionsArray, Props } from "~/types";
import { useCartId } from "~/hooks/useCartId";
import { getCollections } from "~/models/collection.server";
import { json } from "@remix-run/node";

export const loader = async () => {
  const collections = await getCollections(3);
  return json({ collections });
};

interface CollectionProps extends Props {
  collections: [];
}

export default function Layout({ children, collections }: CollectionProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <header className="relative">
        <NavBar collections={collections} setOpen={setOpen} />
        <MobileMenu setOpen={setOpen} open={open} collections={collections} />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}

function NavBar({
  collections,
  setOpen,
}: {
  collections: CollectionsArray;
  setOpen: any;
}) {
  return (
    <nav aria-label="Top">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo (lg+) */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center">
              <a href="/">
                <span className="sr-only">WearJS</span>
                <img className="h-32 w-auto" src="/logo.png" alt="" />
              </a>
            </div>
            <div className="hidden h-full lg:flex">
              {/* Flyout menus */}
              <Popover.Group className="inset-x-0 bottom-0 px-4">
                <div className="flex h-full justify-center space-x-8">
                  {collections
                    ?.slice(0, 5)
                    .map((collection: ShopifyCollection) => {
                      return (
                        <a
                          key={collection?.node.title}
                          href={"/"}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {collection?.node.title}
                        </a>
                      );
                    })}
                </div>
              </Popover.Group>
            </div>

            {/* Mobile menu and search (lg-) */}
            <div className="flex flex-1 items-center lg:hidden">
              <button
                type="button"
                className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Search */}
              <a
                href="/"
                className="ml-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            {/* Logo (lg-) */}
            <a href="/" className="lg:hidden">
              <span className="sr-only">WearJS</span>
              <img src="/logo.png" alt="" className="h-16 w-auto" />
            </a>

            <div className="flex flex-1 items-center justify-end">
              <a
                href="/"
                className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
              >
                Search
              </a>

              <div className="flex items-center lg:ml-8">
                {/* Help */}
                <a
                  href="/"
                  className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                >
                  <span className="sr-only">Help</span>
                  <QuestionMarkCircleIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="/"
                  className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                >
                  Help
                </a>
                <CartButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({
  open,
  setOpen,
  collections,
}: {
  open: boolean;
  setOpen: any;
  collections: CollectionsArray;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Links */}
              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {collections?.map((collection: ShopifyCollection) => (
                  <div key={collection.node.title} className="flow-root">
                    <a
                      href={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {collection.node.title}
                    </a>
                  </div>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function CartButton() {
  const cartId = useCartId();

  return (
    <div className="ml-4 flow-root lg:ml-8">
      <a
        href={cartId ? `/cart/${cartId}` : "/"}
        className="group -m-2 flex items-center p-2"
      >
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <img
            src="https://media.licdn.com/dms/image/C4D1BAQGKMh1Xw_Lbfg/company-background_10000/0/1637829460479?e=1672394400&v=beta&t=97XC8nVjmK8dHQFzeLIjlNo0vISreP0afrzFzL5VNpY"
            alt=""
          />
        </div>
        <div className="mt-8 md:order-1 md:mt-0"></div>
      </div>
    </footer>
  );
}
