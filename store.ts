import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemsCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) => {
                if (item.product._id === product._id) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              }),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (product) =>
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
    }),
    {
      name: "basket-store",
    }
  )
);