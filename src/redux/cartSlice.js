import { createSlice } from '@reduxjs/toolkit'

// Load initial cart state from localStorage if available
const loadInitialCart = () => {
  try {
    const saved = localStorage.getItem('restaurant_cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('restaurant_cart', JSON.stringify(items))
  } catch {
    // Ignore storage errors
  }
}

const initialState = {
  items: loadInitialCart(),
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plat = action.payload
      const existing = state.items.find((item) => String(item.id) === String(plat.id))

      if (existing) {
        existing.quantity += action.payload.quantity || 1
      } else {
        state.items.push({
          id: plat.id,
          nom: plat.nom,
          prix: Number(plat.prix),
          image: plat.image,
          categorie: plat.categorie,
          quantity: action.payload.quantity || 1,
        })
      }
      saveCartToStorage(state.items)
    },

    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => String(item.id) !== String(id))
      saveCartToStorage(state.items)
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => String(i.id) === String(id))

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => String(i.id) !== String(id))
        } else {
          item.quantity = quantity
        }
      }
      saveCartToStorage(state.items)
    },

    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

// Hada selector ki-hseb l-total d l-panier b reduce (prix * quantite)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.prix * item.quantity, 0)

export default cartSlice.reducer
