import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await api.createCommande(orderData)
      return data
    } catch (err) {
      return rejectWithValue(err.message || "Erreur lors de la validation de la commande")
    }
  }
)

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCommandes()
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Erreur lors du chargement des commandes')
    }
  }
)

const initialState = {
  orders: [],
  currentOrder: null,
  submissionStatus: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
  fetchStatus: 'idle',
  error: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.submissionStatus = 'idle'
      state.currentOrder = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // submitOrder
    builder
      .addCase(submitOrder.pending, (state) => {
        state.submissionStatus = 'pending'
        state.error = null
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.submissionStatus = 'fulfilled'
        state.currentOrder = action.payload
        state.orders.unshift(action.payload)
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.submissionStatus = 'rejected'
        state.error = action.payload || action.error.message
      })

    // fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetchStatus = 'pending'
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled'
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchStatus = 'rejected'
        state.error = action.payload || action.error.message
      })
  },
})

export const { resetOrderStatus } = orderSlice.actions

export const selectOrders = (state) => state.order.orders
export const selectSubmissionStatus = (state) => state.order.submissionStatus
export const selectCurrentOrder = (state) => state.order.currentOrder
export const selectOrderFetchStatus = (state) => state.order.fetchStatus

export default orderSlice.reducer
