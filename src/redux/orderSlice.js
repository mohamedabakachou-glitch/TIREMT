import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

// [E. Redux Toolkit : createAsyncThunk] :
// Hada l-moteur d les appels asynchrones d l'API.
// Kol thunk ki-welled 3 d les actions automatiquement :
// 1. pending : Mli la requête HTTP kat-t-lança (hadi fash kan-affichiw Loader)
// 2. fulfilled : Mli le serveur ki-rje3 b succès 200 OK (kan-sauvegardiw les données f le state)
// 3. rejected : Mli kat-wqe3 erreur réseau wla serveur (kan-stockiw le message d'erreur f state.error)

// 1. Thunk POST (CREATE) : Envoi de la commande client
export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await api.createCommande(orderData)
      return data
    } catch (err) {
      // rejectWithValue kat-passer le message d'erreur l extraReducers rejected
      return rejectWithValue(err.message || "Erreur lors de la validation de la commande")
    }
  }
)

// 2. Thunk GET (READ) : Récupération de l'historique des commandes
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

// 3. Thunk DELETE (SUPPRESSION) : Annulation d'une commande
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await api.deleteCommande(orderId)
      return orderId
    } catch (err) {
      return rejectWithValue(err.message || "Erreur lors de l'annulation de la commande")
    }
  }
)

// 4. Thunk PATCH (MODIFICATION) : Mise à jour du statut ou des notes
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const data = await api.updateCommande(id, updates)
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Erreur lors de la mise à jour de la commande')
    }
  }
)

const initialState = {
  orders: [],
  currentOrder: null,
  submissionStatus: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
  fetchStatus: 'idle',
  actionStatus: 'idle',
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

    // deleteOrder (DELETE)
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.actionStatus = 'pending'
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.actionStatus = 'fulfilled'
        state.orders = state.orders.filter((o) => String(o.id) !== String(action.payload))
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.actionStatus = 'rejected'
        state.error = action.payload || action.error.message
      })

    // updateOrder (PATCH/PUT)
    builder
      .addCase(updateOrder.pending, (state) => {
        state.actionStatus = 'pending'
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.actionStatus = 'fulfilled'
        const index = state.orders.findIndex((o) => String(o.id) === String(action.payload.id))
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...action.payload }
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.actionStatus = 'rejected'
        state.error = action.payload || action.error.message
      })
  },
})

export const { resetOrderStatus } = orderSlice.actions

export const selectOrders = (state) => state.order.orders
export const selectSubmissionStatus = (state) => state.order.submissionStatus
export const selectCurrentOrder = (state) => state.order.currentOrder
export const selectOrderFetchStatus = (state) => state.order.fetchStatus
export const selectOrderActionStatus = (state) => state.order.actionStatus

export default orderSlice.reducer
