import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";
import { toast } from "react-toastify"; // Import toast

export interface BasketItem {
  product: Product;
  quantity: number;
  selectedColor: string; // New property for selected color
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product, color: string) => void;
  removeItem: (product: Product) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemsCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  showToast: (message: string) => void; // New method to show toast
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, color) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id && item.selectedColor === color
          );
          if (existingItem) {
            return {
              items: state.items.map((item) => {
                if (item.product._id === product._id && item.selectedColor === color) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              }),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1, selectedColor: color }] };
          }
        });
        
      },
      removeItem: (product) => {
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === product._id) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        }));
        
      },
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product.price ?? 0) * item.quantity;
        }, 0);
      },
      getItemsCount: (productId) => {
        const items = get().items.find(
          (item) => item.product._id === productId
        );
        return items?.quantity ?? 0;
      },
      getGroupedItems: () => get().items,
      increaseQuantity: (product) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (product) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === product._id) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),
      showToast: (message) => {
        toast(message); // Implement toast method
      },
    }),
    {
      name: "basket-store",
    })
);

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  getItems: () => Product[];
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      getItems: () => get().items,
    }),
    {
      name: "wishlist-store",
    }
  )
);