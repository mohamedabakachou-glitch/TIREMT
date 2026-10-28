// [F. Tests Unitaires Vitest - cartSlice] :
// Hada fichier dyal les tests unitaires li ki-t-executa b Vitest.
// Ki-vérifier l-fonctionnement logique dyal ga3 les reducers w les sélecteurs du panier
// bla ma n-7tajo n-lanciwh l-navigateur (exécution rapide en mémoire).
import { describe, it, expect, beforeEach } from 'vitest'
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from './cartSlice'

describe('cartSlice reducer and selectors', () => {
  // beforeEach: ki-khwi localStorage 9bl kol test bach les tests y-b9aw isolés w indépendants
  beforeEach(() => {
    localStorage.clear()
  })

  // Test 1: Vérification de l'état initial par défaut (tableau vide)
  it('should return initial state with empty items', () => {
    const initialState = cartReducer(undefined, { type: 'unknown' })
    expect(initialState.items).toEqual([])
  })

  it('should handle addToCart for a new item', () => {
    const initialState = { items: [] }
    const plat = {
      id: '1',
      nom: 'Tagine de Poulet',
      prix: 85,
      image: 'tagine.jpg',
      categorie: 'Plats Principaux',
    }

    const nextState = cartReducer(initialState, addToCart(plat))

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0]).toEqual({
      id: '1',
      nom: 'Tagine de Poulet',
      prix: 85,
      image: 'tagine.jpg',
      categorie: 'Plats Principaux',
      quantity: 1,
    })
  })

  it('should increment quantity when addToCart is called for an existing item', () => {
    const initialState = {
      items: [
        {
          id: '1',
          nom: 'Tagine de Poulet',
          prix: 85,
          image: 'tagine.jpg',
          categorie: 'Plats Principaux',
          quantity: 1,
        },
      ],
    }

    const plat = { id: '1', nom: 'Tagine de Poulet', prix: 85 }
    const nextState = cartReducer(initialState, addToCart(plat))

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].quantity).toBe(2)
  })

  it('should handle removeFromCart', () => {
    const initialState = {
      items: [
        { id: '1', nom: 'Tagine de Poulet', prix: 85, quantity: 1 },
        { id: '2', nom: 'Couscous Royal', prix: 110, quantity: 2 },
      ],
    }

    const nextState = cartReducer(initialState, removeFromCart('1'))

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].id).toBe('2')
  })

  it('should handle updateQuantity to a new value', () => {
    const initialState = {
      items: [{ id: '1', nom: 'Tagine de Poulet', prix: 85, quantity: 1 }],
    }

    const nextState = cartReducer(initialState, updateQuantity({ id: '1', quantity: 4 }))

    expect(nextState.items[0].quantity).toBe(4)
  })

  it('should remove item when updateQuantity is called with quantity <= 0', () => {
    const initialState = {
      items: [{ id: '1', nom: 'Tagine de Poulet', prix: 85, quantity: 2 }],
    }

    const nextState = cartReducer(initialState, updateQuantity({ id: '1', quantity: 0 }))

    expect(nextState.items).toHaveLength(0)
  })

  it('should handle clearCart', () => {
    const initialState = {
      items: [
        { id: '1', nom: 'Tagine de Poulet', prix: 85, quantity: 1 },
        { id: '2', nom: 'Couscous Royal', prix: 110, quantity: 1 },
      ],
    }

    const nextState = cartReducer(initialState, clearCart())

    expect(nextState.items).toEqual([])
  })

  it('should calculate selectCartCount, selectCartTotal, and selectCartItems accurately', () => {
    const mockRootState = {
      cart: {
        items: [
          { id: '1', nom: 'Tagine de Poulet', prix: 85, quantity: 2 }, // 170
          { id: '2', nom: 'Pastilla', prix: 95, quantity: 1 },         // 95
          { id: '3', nom: 'Thé à la menthe', prix: 20, quantity: 3 },  // 60
        ],
      },
    }

    expect(selectCartItems(mockRootState)).toEqual(mockRootState.cart.items)
    // 2 + 1 + 3 = 6 articles
    expect(selectCartCount(mockRootState)).toBe(6)
    // 170 + 95 + 60 = 325 DH
    expect(selectCartTotal(mockRootState)).toBe(325)
  })
})
