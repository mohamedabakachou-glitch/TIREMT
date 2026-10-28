import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

// createAsyncThunk kat-gérer 3 d les états: pending (loading), fulfilled (succès), rejected (erreur)
export const fetchPlats = createAsyncThunk(
  'menu/fetchPlats',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getPlats()
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Erreur lors du chargement des plats')
    }
  }
)

export const fetchPlatById = createAsyncThunk(
  'menu/fetchPlatById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.getPlatById(id)
      return data
    } catch (err) {
      return rejectWithValue(err.message || `Erreur lors de la récupération du plat ${id}`)
    }
  }
)

const initialState = {
  items: [],
  selectedPlat: null,
  status: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
  detailStatus: 'idle',
  error: null,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearSelectedPlat: (state) => {
      state.selectedPlat = null
      state.detailStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    // 3 explicit request states for fetchPlats
    builder
      .addCase(fetchPlats.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchPlats.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.items = action.payload
      })
      .addCase(fetchPlats.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload || action.error.message
      })

    // States for fetchPlatById
    builder
      .addCase(fetchPlatById.pending, (state) => {
        state.detailStatus = 'pending'
        state.error = null
      })
      .addCase(fetchPlatById.fulfilled, (state, action) => {
        state.detailStatus = 'fulfilled'
        state.selectedPlat = action.payload
      })
      .addCase(fetchPlatById.rejected, (state, action) => {
        state.detailStatus = 'rejected'
        state.error = action.payload || action.error.message
      })
  },
})

export const { clearSelectedPlat } = menuSlice.actions

// Selectors
export const selectAllPlats = (state) => state.menu.items
export const selectMenuStatus = (state) => state.menu.status
export const selectMenuError = (state) => state.menu.error
export const selectSelectedPlat = (state) => state.menu.selectedPlat
export const selectDetailStatus = (state) => state.menu.detailStatus

export default menuSlice.reducer
