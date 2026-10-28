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

// [E. Redux Toolkit : createSlice] :
// createSlice kat-gérer lina l-état global dyal l-panier, kat-générer les actions w reducers auto
// bla ma n-diro l-code t-twil d Redux l-9dim (switch/case w action types).
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. addToCart : Ki-stqbel plat f action.payload
    // Ki-qelleb wach l-plat deja kayn f l-panier (find).
    // - Ila deja kayn : ki-zid ghir f la quantité dyalo
    // - Ila jdid : ki-poushih f tableau items avec quantité = 1
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

    // 2. removeFromCart : Ki-hayed un article par son ID avec .filter()
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => String(item.id) !== String(id))
      saveCartToStorage(state.items)
    },

    // 3. updateQuantity : Ki-modifier la quantité dyal un article précis (+ ou -)
    // Ila kant la nouvelle quantité <= 0, ki-ms7ou auto mn l-panier
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

    // 4. clearCart : Ki-vidé l-panier kamel mli la commande kat-valida b succès
    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
  },
})

// Export automatique d les actions créées par Redux Toolkit
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// [E. Selectors pour les valeurs dérivées] :
// Hado des fonctions pures li kan-3tiwhom l useSelector() bach n-jibo données pré-calculées:
export const selectCartItems = (state) => state.cart.items

// selectCartCount : Somme totale des quantités des articles dans le panier
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

// selectCartTotal : Calcul automatique du prix total du panier via .reduce() (prix * quantite)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.prix * item.quantity, 0)

export default cartSlice.reducer
