import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// [E. Redux Toolkit] : useDispatch bach n-envoyiw l'action addToCart l l-store
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

// [A. Composant réutilisable & Props] :
// PlatCard ki-stqbel l'objet 'plat' f les props (destructuring { plat }) mn l-composant parent (Menu wla Home)
const PlatCard = ({ plat }) => {
  const dispatch = useDispatch()

  // [A. useState pour état local] :
  // justAdded: feedback visuel temporaire (1.2s) bach l-user y-chouf 'Ajouté' b l-khder
  const [justAdded, setJustAdded] = useState(false)
  // isFavorite: state local bach y-bdel l-icon d l-9elb bin khawi w 3amer
  const [isFavorite, setIsFavorite] = useState(false)

  // Handler d'ajout au panier :
  const handleAddToCart = (e) => {
    // stopPropagation bach l-click ma y-activich l-lien dyal la carte kamla
    e.preventDefault()
    e.stopPropagation()
    // Dispatch d l'action Redux avec le plat en payload
    dispatch(addToCart(plat))
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
    }, 1200)
  }

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <article className="plat-card" id={`plat-card-${plat.id}`}>
      {/* Image container */}
      <div className="plat-card-img-wrapper">
        <img
          src={plat.image}
          alt={plat.nom}
          className="plat-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
          }}
        />
        
        {/* Quality Badges */}
        <span className="plat-badge-category">{plat.categorie}</span>
        {plat.isPopular && (
          <span className="plat-badge-popular">
            <i className="bi bi-star-fill text-warning"></i> Signature
          </span>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          className="favorite-btn-card"
          onClick={toggleFavorite}
          aria-label="Ajouter aux favoris"
          title="Ajouter aux favoris"
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
        </button>
      </div>

      {/* Body */}
      <div className="plat-card-body">
        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <Link
            to={`/plats/${plat.id}`}
            className="plat-card-title"
            title={plat.nom}
          >
            {plat.nom}
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3 text-muted mb-2" style={{ fontSize: '0.82rem' }}>
          {plat.rating && (
            <span>
              <i className="bi bi-star-fill text-warning me-1"></i>
              <strong className="text-dark">{plat.rating}</strong>
            </span>
          )}
          {plat.tempsPrep && (
            <span>
              <i className="bi bi-clock me-1 text-warning"></i>
              {plat.tempsPrep}
            </span>
          )}
        </div>

        <p className="plat-card-desc">{plat.description}</p>

        {/* Footer */}
        <div className="plat-card-footer">
          <div className="plat-price">
            {plat.prix} <span>DH</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link
              to={`/plats/${plat.id}`}
              className="btn btn-sm btn-outline-secondary rounded-pill px-3"
              style={{ fontSize: '0.85rem' }}
              title="Voir les détails"
            >
              <i className="bi bi-eye"></i>
            </Link>

            <button
              type="button"
              className={`btn-add-cart ${justAdded ? 'bg-success text-white border-success' : ''}`}
              onClick={handleAddToCart}
              aria-label={`Ajouter ${plat.nom} au panier`}
              id={`add-to-cart-btn-${plat.id}`}
            >
              {justAdded ? (
                <>
                  <i className="bi bi-check-lg"></i>
                  <span>Ajouté</span>
                </>
              ) : (
                <>
                  <i className="bi bi-plus-lg"></i>
                  <span>Ajouter au Panier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PlatCard
