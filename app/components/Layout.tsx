import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { navigation } from "mocks/DUMMY_DATA";
import type { CollectionObj } from "~/types";
import type { Collection } from "~/types";

export default function Layout({ collections, children, localCartId }: any) {
  const [headerStatus, setHeaderStatus] = useState(false);

  return (
    <>
      <Header
        open={headerStatus}
        setOpen={setHeaderStatus}
        collections={collections}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}

interface HeaderProps {
  open: boolean;
  setOpen: any;
  collections: CollectionObj;
}

function Header({ open, setOpen, collections, localCartId }: HeaderProps) {
  // Header Elements
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  function NavBar() {
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
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "text-indigo-600"
                                    : "text-gray-700 hover:text-gray-800",
                                  "relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out"
                                )}
                              >
                                {category.name}
                                <span
                                  className={classNames(
                                    open ? "bg-indigo-600" : "",
                                    "absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out"
                                  )}
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 top-1/2 bg-white shadow"
                                  aria-hidden="true"
                                />
                                {/* Fake border when menu is open */}
                                <div
                                  className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                  aria-hidden="true"
                                >
                                  <div
                                    className={classNames(
                                      open ? "bg-gray-200" : "bg-transparent",
                                      "h-px w-full transition-colors duration-200 ease-out"
                                    )}
                                  />
                                </div>

                                <div className="relative">
                                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative"
                                        >
                                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-4 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
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
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  function MobileMenu() {
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
                  {collections?.map((collection: Collection) => (
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

  function Cart() {
    return (
      <div className="ml-4 flow-root lg:ml-8">
        <a href={"/cart"} className="group -m-2 flex items-center p-2">
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

  return (
    <>
      <header className="relative">
        <MobileMenu />
        <NavBar />
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer>
      <img
        src="https://media.licdn.com/dms/image/C4D1BAQGKMh1Xw_Lbfg/company-background_10000/0/1637829460479?e=1671778800&v=beta&t=8WQG2Q0Hox7iZrr7RPsVjbkp2ebTwjpfYWUhD30s4RU"
        alt=""
      />
    </footer>
  );
}
