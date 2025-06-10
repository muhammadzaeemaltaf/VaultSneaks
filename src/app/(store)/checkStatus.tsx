"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useUserStore, useWishlistStore } from "../../../store";

export default function CheckStatus() {
  const cookieName = 'vaultSneak_token';
  const clearUser = useUserStore((state) => state.clearUser);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  useEffect(() => {
    const token = Cookies.get(cookieName);
    if (!token ) {
      clearUser();    
      clearWishlist();      
    }
  }, []);

  return (
    ""
  );
}
