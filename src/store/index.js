/**
 * Global state management using Zustand
 * Centralized store for closet, outfits, user preferences, etc.
 */

import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Closet state
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  updateItem: (updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),

  // Closet filtering
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Outfit suggestions
  currentOutfits: [],
  setCurrentOutfits: (outfits) => set({ currentOutfits: outfits }),

  // User preferences
  user: {
    temperatureBias: 'neutral', // 'hot', 'cold', 'neutral'
    preferences: {}
  },
  setUser: (user) => set({ user }),
  updateTemperatureBias: (bias) =>
    set((state) => ({
      user: { ...state.user, temperatureBias: bias }
    })),

  // Feedback
  feedbackHistory: [],
  addFeedback: (feedback) =>
    set((state) => ({
      feedbackHistory: [feedback, ...state.feedbackHistory]
    })),

  // UI state
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error })
}));
