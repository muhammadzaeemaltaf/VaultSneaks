"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CartIcon,
  HeaderLinks,
  HeartIcon,
  SearchIcon,
} from "@/app/data";
import Link from "next/link";
import { searchProducts } from "@/sanity/products/searchProducts";
import Image from "next/image";
import {
  useBasketStore,
  useWishlistStore,
  useUserStore,
} from "../../../../store";
import { CircleX, LogOut, ShoppingBasket, Star, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { productName: string; imageUrl: string }[]
  >([]);
  const [categoryResults, setCategoryResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const itemCount = useBasketStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu") && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest(".nav-menu") && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen, isMenuOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    console.log(term);
    if (term.length > 2) {
      setLoading(true);
      setNoResults(false);
      const { productDetail, categoryDetail } = await searchProducts(term);
      setLoading(false);
      if (productDetail.length === 0 && categoryDetail.length === 0) {
        setNoResults(true);
      } else {
        setSearchResults(
          productDetail.filter(
            (product) => product.productName && product.imageUrl
          ) as { productName: string; imageUrl: string }[]
        );
        setCategoryResults(categoryDetail as string[]);
      }
    } else {
      setSearchResults([]);
      setCategoryResults([]);
      setNoResults(false);
    }
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, index) => (
          <span
            key={index}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? "bg-yellow-200"
                : ""
            }
          >
            {part}
          </span>
        ))}
      </>
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.get("/api/logout");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="text-white font-extrabold">Logging out...</div>
        </div>
      )}
      <nav className="bg-themeGray">
        <div className="h-9 container  md:px-[40px]">
          <div className="flex justify-end items-center h-full">
            <div className="flex divide-x-[1px] divide-black text-[11px] h-[26px] items-center  md:w-[272.81px] justify-between">
              <Link
                href={"/products"}
                className="flex-1 text-center px-2 md:px-3 whitespace-nowrap"
              >
                Store
              </Link>
              <Link
                href={"/contact"}
                className="flex-1 text-center px-2 md:px-3 whitespace-nowrap"
              >
                Help
              </Link>
              {user ? (
                <>
                  <Link
                    href={"/account"}
                    className="flex-1 text-center px-2 md:px-3 whitespace-nowrap"
                  >
                    Account
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex-1 pl-3 whitespace-nowrap"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={"/joinus"}
                    className="flex-1 text-center px-2 md:px-3 whitespace-nowrap"
                  >
                    Join Us
                  </Link>

                  <Link
                    href={"/login"}
                    className="flex-1 pl-3 whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <header
        className="relative py-3"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container h-[60px] flex justify-between items-center  md:px-[40px]">
          <div className="logo scale-75 md:scale-100 -ml-2 md:ml-0">
            <Link href={"/"} onClick={() => setIsMenuOpen(false)}>
              <Image
                src={"/VaultSneak_Logo-01.png"}
                alt="Logo"
                height={1000}
                width={1000}
                className="w-20"
              />
            </Link>
          </div>
          <div className="hidden lg:flex ml-40">
            <ul className="flex text-base gap-5">
              {HeaderLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={link.link}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex gap-6">
              <div className="relative">
                <span className="absolute top-1/2 -translate-y-1/2 left-3 ">
                  {SearchIcon}
                </span>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="bg-themeGray h-[40px] w-[180px] rounded-full p-2 pl-10"
                />
                {loading && (
                  <ul className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg">
                    {Array.from({ length: 6 }, (_, index) => (
                      <li key={index} className="p-2 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-sm animate-pulse"></div>
                        <div className="flex-1 h-4 bg-gray-300 rounded-sm animate-pulse"></div>
                      </li>
                    ))}
                  </ul>
                )}
                {!loading && noResults && (
                  <ul className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg">
                    <li className="p-2 text-center text-sm">
                      No products found
                    </li>
                  </ul>
                )}
                {!loading &&
                  (searchResults.length > 0 || categoryResults.length > 0) && (
                    <ul className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg">
                      {searchResults.length > 0 && (
                        <>
                          {searchResults.map((result, index) => (
                            <li
                              key={index}
                              className="p-2 hover:bg-gray-200 flex items-center gap-2"
                            >
                              <Image
                                src={result.imageUrl}
                                alt={result.productName}
                                height={1000}
                                width={1000}
                                className="w-8 h-8 object-cover rounded-sm"
                              />
                              <Link
                                href={`/products/${result.productName}`}
                                className="text-xs line-clamp-1"
                                onClick={() => {
                                  setSearchResults([]);
                                  handleSearch("");
                                }}
                              >
                                {highlightText(result.productName, searchTerm)}
                              </Link>
                            </li>
                          ))}
                        </>
                      )}
                      {categoryResults.length > 0 && (
                        <>
                          <li className="p-2 text-start font-semibold">
                            Categories
                          </li>
                          {categoryResults.map((category, index) => (
                            <li
                              key={index}
                              className="p-2 hover:bg-gray-200 text-sm"
                            >
                              <Link
                                href={`/categories/${category}`}
                                className="line-clamp-1"
                                onClick={() => {
                                  setSearchResults([]);
                                  handleSearch("");
                                }}
                              >
                                {highlightText(category, searchTerm)}{" "}
                              </Link>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  )}
              </div>
            </div>
            <Link href={"/wishlist"} className="relative">
              {HeartIcon}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            </Link>
            <Link href={"/cart"} className="relative">
              {CartIcon}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            </Link>
            <div className="relative user-menu">
              {user ? (
                <div
                  className="flex items-center gap-2"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <Image
                    src={urlFor(user.profilePicture).url()}
                    alt="Profile Picture"
                    height={30}
                    width={30}
                    className="rounded-full cursor-pointer"
                  />

                  {isUserMenuOpen && (
                    <div
                      className={`absolute top-full right-0 bg-white shadow-lg rounded-md mt-2 w-48`}
                    >
                      <Link
                        href={"/account"}
                        className="flex items-center  gap-2 px-4 py-2 text-sm hover:bg-gray-500/20"
                      >
                        <User className="scale-75 -ml-1.5" />
                        Manage My Account
                      </Link>
                      <Link
                        href={"#"}
                        className="flex items-center  gap-2 px-4 py-2 text-sm hover:bg-gray-500/20"
                      >
                        <ShoppingBasket className="scale-75 -ml-1.5" />
                        My Order
                      </Link>
                      <Link
                        href={"#"}
                        className="flex items-center  gap-2 px-4 py-2 text-sm hover:bg-gray-500/20"
                      >
                        <CircleX className="scale-75 -ml-1.5" />
                        My Cancellation
                      </Link>
                      <Link
                        href={"#"}
                        className="flex items-center  gap-2 px-4 py-2 text-sm hover:bg-gray-500/20"
                      >
                        <Star className="scale-75 -ml-1.5" />
                        My Review
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-500/20"
                      >
                        <LogOut className="scale-75 -ml-1.5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`rounded-full p-1 transition-all duration-150 cursor-pointer ${
                    isUserMenuOpen
                      ? "bg-zinc-500 text-white"
                      : "hover:bg-zinc-500 hover:text-white "
                  }`}
                >
                  <Link href={"/login"}>
                    <User className="h-6 w-6" />
                  </Link>
                </div>
              )}
            </div>
            <button className="lg:hidden" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full z-10 bg-white shadow-lg transition-transform duration-300 ease-in-out transform">
            <div className="relative p-4">
              <span className="absolute top-1/2 -translate-y-1/2 left-7 ">
                {SearchIcon}
              </span>
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-themeGray h-[40px] w-full rounded-full p-2 pl-10"
              />
              {loading && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-[95%] rounded-md shadow-lg top-15 left-1/2 -translate-x-1/2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <li key={index} className="p-2 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-sm animate-pulse"></div>
                      <div className="flex-1 h-4 bg-gray-300 rounded-sm animate-pulse"></div>
                    </li>
                  ))}
                </ul>
              )}
              {!loading && noResults && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-[95%] rounded-md shadow-lg top-15 left-1/2 -translate-x-1/2">
                  <li className="p-2 text-center text-sm">No products found</li>
                </ul>
              )}
              {!loading &&
                (searchResults.length > 0 || categoryResults.length > 0) && (
                  <ul className="absolute bg-white border border-gray-300 mt-1 w-[95%] rounded-md shadow-lg top-15 left-1/2 -translate-x-1/2">
                    {searchResults.length > 0 && (
                      <>
                        {searchResults.map((result, index) => (
                          <li
                            key={index}
                            className="p-2 hover:bg-gray-200 flex items-center gap-2"
                          >
                            <Image
                              src={result.imageUrl}
                              alt={result.productName}
                              height={1000}
                              width={1000}
                              className="w-8 h-8 object-cover rounded-sm"
                            />
                            <Link
                              href={`/products/${result.productName}`}
                              className="text-xs line-clamp-1 flex-1"
                              onClick={() => {
                                setSearchResults([]);
                                handleSearch("");
                              }}
                            >
                              {highlightText(result.productName, searchTerm)}
                            </Link>
                          </li>
                        ))}
                      </>
                    )}
                    {categoryResults.length > 0 && (
                      <>
                        <li className="p-2 text-start font-semibold">
                          Categories
                        </li>
                        {categoryResults.map((category, index) => (
                          <li
                            key={index}
                            className="p-2 hover:bg-gray-200 text-sm"
                          >
                            <Link
                              href={`/categories/${category}`}
                              className="line-clamp-1 flex-1"
                              onClick={() => {
                                setSearchResults([]);
                                handleSearch("");
                              }}
                            >
                              {highlightText(category, searchTerm)}{" "}
                            </Link>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                )}
            </div>

            <ul className="flex flex-col text-base gap-2 p-4">
              {HeaderLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={link.link} onClick={() => setIsMenuOpen(false)}>
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
