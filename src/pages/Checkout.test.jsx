import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Checkout from './Checkout'
import cartReducer from '../redux/cartSlice'
import orderReducer from '../redux/orderSlice'
import api from '../services/api'

// Helper to render component with Redux store and Router
const renderWithProviders = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      order: orderReducer,
    },
    preloadedState,
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    ),
  }
}

describe('Checkout Component - Form & Client-Side Validation', () => {
  const populatedCartState = {
    cart: {
      items: [
        {
          id: '1',
          nom: 'Tagine de Poulet',
          prix: 85,
          quantity: 2,
          image: 'tagine.jpg',
          categorie: 'Plats Principaux',
        },
      ],
    },
    order: {
      orders: [],
      currentOrder: null,
      submissionStatus: 'idle',
      fetchStatus: 'idle',
      error: null,
    },
  }

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders empty cart notice when cart has no items', () => {
    renderWithProviders({
      cart: { items: [] },
      order: { orders: [], submissionStatus: 'idle' },
    })

    expect(screen.getByText(/Votre panier est vide/i)).toBeInTheDocument()
    expect(screen.getByText(/Découvrir le Menu/i)).toBeInTheDocument()
  })

  it('renders cart articles and controlled delivery inputs when cart has items', () => {
    renderWithProviders(populatedCartState)

    expect(screen.getByText('Tagine de Poulet')).toBeInTheDocument()
    expect(screen.getByLabelText(/Nom et Prénom/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Téléphone de contact/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Adresse de livraison complète/i)).toBeInTheDocument()
  })

  it('validates required fields on submit and displays error messages', async () => {
    renderWithProviders(populatedCartState)

    const submitBtn = screen.getByRole('button', { name: /Confirmer la Commande/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByText(/Le nom complet est obligatoire/i)).toBeInTheDocument()
    expect(await screen.findByText(/Le numéro de téléphone est obligatoire/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/L’adresse de livraison complète est obligatoire/i)
    ).toBeInTheDocument()
  })

  it('validates minimum length for name and address and invalid phone formats', async () => {
    renderWithProviders(populatedCartState)

    const nomInput = screen.getByPlaceholderText(/Ex: Youssef El Amrani/i)
    const telInput = screen.getByPlaceholderText(/Ex: 0612345678/i)
    const adrInput = screen.getByPlaceholderText(/Ex: 45 Rue de la Liberté/i)
    const submitBtn = screen.getByRole('button', { name: /Confirmer la Commande/i })

    // Provide values that fail validation thresholds
    fireEvent.change(nomInput, { target: { value: 'Ab' } }) // Less than 3 chars
    fireEvent.change(telInput, { target: { value: '123' } }) // Invalid phone format
    fireEvent.change(adrInput, { target: { value: 'Rue' } }) // Less than 6 chars

    fireEvent.click(submitBtn)

    expect(
      await screen.findByText(/Le nom doit comporter au moins 3 caractères/i)
    ).toBeInTheDocument()
    expect(await screen.findByText(/Format de téléphone invalide/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/Veuillez préciser votre adresse \(au moins 6 caractères\)/i)
    ).toBeInTheDocument()
  })

  it('submits order when form is completely valid and clears error messages', async () => {
    vi.spyOn(api, 'createCommande').mockResolvedValueOnce({
      id: 'cmd-999',
      date: new Date().toISOString(),
      client: {
        nom: 'Karim Bennani',
        telephone: '0661223344',
        adresse: '12 Bd Mohammed VI, Hivernage, Marrakech',
      },
      total: 170,
    })

    const { store } = renderWithProviders(populatedCartState)

    const nomInput = screen.getByPlaceholderText(/Ex: Youssef El Amrani/i)
    const telInput = screen.getByPlaceholderText(/Ex: 0612345678/i)
    const adrInput = screen.getByPlaceholderText(/Ex: 45 Rue de la Liberté/i)
    const submitBtn = screen.getByRole('button', { name: /Confirmer la Commande/i })

    fireEvent.change(nomInput, { target: { value: 'Karim Bennani' } })
    fireEvent.change(telInput, { target: { value: '0661223344' } })
    fireEvent.change(adrInput, { target: { value: '12 Bd Mohammed VI, Hivernage, Marrakech' } })

    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/Commande Confirmée !/i)).toBeInTheDocument()
      expect(screen.getByText('#cmd-999')).toBeInTheDocument()
    })

    // Cart in store should have been cleared
    expect(store.getState().cart.items).toEqual([])
  })
})
