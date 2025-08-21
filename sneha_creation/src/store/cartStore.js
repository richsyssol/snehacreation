// stores/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) return;
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        }));
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      get cartTotal() {
        return this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      get itemCount() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // name for localStorage
      getStorage: () => localStorage, // or sessionStorage
    }
  )
);
