// [F. Tests Unitaires Vitest - orderSlice & CRUD] :
// Suite de tests li kat-thqqeq mn la gestion d'état des commandes et des 4 verbes CRUD
import { describe, it, expect, beforeEach, vi } from 'vitest'
import orderReducer, {
  resetOrderStatus,
  deleteOrder,
  updateOrder,
  selectOrders,
} from './orderSlice'
import api from '../services/api'

describe('orderSlice & API CRUD flow', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  // Test 1: Vérification dyal l-état initial w reset d statut de soumission
  it('should initialize with empty orders array and reset state', () => {
    const state = orderReducer(undefined, { type: 'unknown' })
    expect(state.orders).toEqual([])
    expect(state.submissionStatus).toBe('idle')

    const resetState = orderReducer({ ...state, submissionStatus: 'fulfilled' }, resetOrderStatus())
    expect(resetState.submissionStatus).toBe('idle')
  })

  it('should handle deleteOrder.fulfilled by removing the order from state (DELETE)', () => {
    const initialState = {
      orders: [
        { id: '101', total: 180, statut: 'En préparation' },
        { id: '102', total: 95, statut: 'Livré' },
      ],
      submissionStatus: 'idle',
      fetchStatus: 'fulfilled',
      actionStatus: 'idle',
      error: null,
    }

    const nextState = orderReducer(initialState, {
      type: deleteOrder.fulfilled.type,
      payload: '101',
    })

    expect(nextState.orders).toHaveLength(1)
    expect(nextState.orders[0].id).toBe('102')
    expect(selectOrders({ order: nextState })).toHaveLength(1)
  })

  it('should handle updateOrder.fulfilled by updating the specific order in state (PATCH/PUT)', () => {
    const initialState = {
      orders: [
        { id: '101', total: 180, statut: 'En préparation' },
      ],
      submissionStatus: 'idle',
      fetchStatus: 'fulfilled',
      actionStatus: 'idle',
      error: null,
    }

    const updatedData = { id: '101', total: 180, statut: 'Livré' }

    const nextState = orderReducer(initialState, {
      type: updateOrder.fulfilled.type,
      payload: updatedData,
    })

    expect(nextState.orders[0].statut).toBe('Livré')
  })

  it('API service should expose complete CRUD methods (GET, POST, PATCH, PUT, DELETE)', () => {
    expect(typeof api.getPlats).toBe('function')
    expect(typeof api.getPlatById).toBe('function')
    expect(typeof api.createCommande).toBe('function')
    expect(typeof api.getCommandes).toBe('function')
    expect(typeof api.updateCommande).toBe('function')
    expect(typeof api.replaceCommande).toBe('function')
    expect(typeof api.deleteCommande).toBe('function')
  })
})
