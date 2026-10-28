import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlatById, selectSelectedPlat, selectDetailStatus, clearSelectedPlat } from '../redux/menuSlice'
import { addToCart } from '../redux/cartSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const PlatDetail = () => {
  // [D. React Router : useParams()] :
  // Hada hook d React Router ki-extracter l-valeur d ':id' li kayna f l'URL (ex: '/plats/2' -> id = '2')
  const { id } = useParams()
  const dispatch = useDispatch()

  // [E. Redux Toolkit Selectors] : Lecture dyal le plat sélectionné w le statut de chargement
  const plat = useSelector(selectSelectedPlat)
  const status = useSelector(selectDetailStatus)

  // [A. useState] : États locaux pour la quantité choisie et le toast de notification
  const [quantity, setQuantity] = useState(1)
  const [notification, setNotification] = useState(null)

  // [A. useEffect avec Cleanup Function] :
  // 1. Mli l-composant ki-t-monter w 3ndna id, kan-lancer le thunk fetchPlatById(id).
  // 2. Return callback (Cleanup) : mli l-user ki-khrej mn la page, kan-vidéou le plat sélectionné
  //    bach ila dkhl l plat akhor ma y-banx lih l-qdim pendant le chargement !
  useEffect(() => {
    if (id) {
      dispatch(fetchPlatById(id))
    }
    return () => {
      dispatch(clearSelectedPlat())
    }
  }, [id, dispatch])

  // [E. Action Redux] : Ajout au panier avec la quantité personnalisée choisie
  const handleAddToCart = () => {
    if (!plat) return
    dispatch(addToCart({ ...plat, quantity }))
    setNotification(`${quantity}x "${plat.nom}" ajouté(s) à votre panier !`)
    setTimeout(() => {
      setNotification(null)
    }, 3500)
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb / Back button */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              <i className="bi bi-house-door me-1"></i>Accueil
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/menu" className="text-decoration-none text-muted">
              La Carte
            </Link>
          </li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
            {plat ? plat.nom : `Plat #${id}`}
          </li>
        </ol>
      </nav>

      {/* Floating notification alert */}
      {notification && (
        <div className="toast-notice alert alert-warning alert-dismissible shadow-lg fade show border-0 d-flex align-items-center justify-content-between p-3" role="alert">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill text-success fs-5"></i>
            <span className="fw-semibold text-dark">{notification}</span>
          </div>
          <button
            type="button"
            className="btn-close ms-3"
            onClick={() => setNotification(null)}
            aria-label="Fermer"
          ></button>
        </div>
      )}

      {status === 'pending' && <Loader message="Mise en place de la recette..." />}

      {status === 'rejected' && (
        <ErrorMessage
          message={`Impossible de charger les détails du mets #${id}. Il a peut-être été retiré ou l'adresse est incorrecte.`}
          onRetry={() => dispatch(fetchPlatById(id))}
        />
      )}

      {status === 'fulfilled' && plat && (
        <div className="plat-detail-card shadow-card border-0">
          <div className="row g-0">
            {/* Image Column */}
            <div className="col-lg-6">
              <img
                src={plat.image}
                alt={plat.nom}
                className="plat-detail-img w-100"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
                }}
              />
            </div>

            {/* Content Column */}
            <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between bg-white">
              <div>
                <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                  <span className="badge bg-warning bg-opacity-25 text-warning-emphasis px-3 py-1.5 rounded-pill fw-bold text-uppercase small">
                    {plat.categorie}
                  </span>
                  {plat.isPopular && (
                    <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-1.5 rounded-pill fw-bold small">
                      <i className="bi bi-star-fill text-danger me-1"></i> Signature du Chef
                    </span>
                  )}
                  {plat.rating && (
                    <span className="info-pill bg-light border">
                      <i className="bi bi-star-fill text-warning"></i>
                      <strong>{plat.rating} / 5.0</strong>
                    </span>
                  )}
                </div>

                <h1 className="display-6 fw-bold font-heading mb-3 text-dark">{plat.nom}</h1>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {plat.tempsPrep && (
                    <span className="info-pill bg-light border">
                      <i className="bi bi-stopwatch text-warning"></i>
                      Préparation : {plat.tempsPrep}
                    </span>
                  )}
                  {plat.calories && (
                    <span className="info-pill bg-light border">
                      <i className="bi bi-fire text-danger"></i>
                      {plat.calories}
                    </span>
                  )}
                  <span className="info-pill bg-success bg-opacity-10 text-success border border-success border-opacity-25">
                    <i className="bi bi-shield-check"></i> Isotherme garanti
                  </span>
                </div>

                <p className="text-muted fs-6 mb-4" style={{ lineHeight: '1.8' }}>
                  {plat.description}
                </p>

                <div className="p-3 bg-light rounded-4 mb-4 border">
                  <div className="d-flex align-items-center gap-2 text-warning fw-bold small mb-1">
                    <i className="bi bi-patch-check-fill"></i> Engagement Haute Bistronomie
                  </div>
                  <small className="text-muted">
                    Ingrédients nobles du terroir, mijotés avec passion par le Chef Alan Reid. Emballage haute performance conservant la chaleur à 65°C.
                  </small>
                </div>
              </div>

              {/* Price & Action Section */}
              <div className="pt-3 border-top">
                <div className="d-flex align-items-baseline justify-content-between mb-4">
                  <div>
                    <span className="text-muted small d-block">Prix de dégustation</span>
                    <span className="display-6 fw-bold text-warning font-heading">
                      {plat.prix} <span className="fs-5 text-muted fw-normal">DH</span>
                    </span>
                  </div>

                  {/* Quantity selector */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small me-1">Portions :</span>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      id="decrease-quantity-btn"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="fw-bold px-2 fs-6 font-monospace" id="plat-detail-quantity">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => setQuantity((q) => q + 1)}
                      id="increase-quantity-btn"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/menu" className="btn btn-outline-secondary rounded-pill px-4">
                    <i className="bi bi-arrow-left me-1"></i> Retour à la Carte
                  </Link>

                  <button
                    type="button"
                    className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark shadow-sm"
                    onClick={handleAddToCart}
                    id="detail-add-to-cart-btn"
                  >
                    <i className="bi bi-cart-plus-fill me-2"></i>
                    Ajouter au Panier ({(plat.prix * quantity).toFixed(0)} DH)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlatDetail
