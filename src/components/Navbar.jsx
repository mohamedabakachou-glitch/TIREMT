import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
// [E. Redux Toolkit] : useSelector bach n-qraw l-données mn l-store bla prop-drilling
import { useSelector } from 'react-redux'
import { selectCartCount } from '../redux/cartSlice'

const Navbar = () => {
  // Hna kan-sélectionniw l-3adad total d l-produits li f l-panier direct mn Redux store
  const cartCount = useSelector(selectCartCount)

  // [A. useState] : State local bach n-géréou wach le menu responsive mftouh wla masdoud f l-mobile
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        {/* Link d React Router : kirejje3na l-accueil bla ma ydir rechargement l-page */}
        <Link to="/" className="brand-logo" id="nav-brand-logo" aria-label="Tiremt Restaurant Accueil">
          <img
            src="/logo.png"
            alt="Tiremt Restaurant"
            style={{
              height: '44px',
              width: 'auto',
              maxHeight: '46px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>

        {/* Bouton Toggle Mobile : onClick ki-bdel l-état d isNavOpen (true/false) */}
        <button
          className="navbar-toggler text-dark border-0 p-1"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-controls="restaurantNavbar"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          id="navbar-toggle-btn"
        >
          <i className={`bi ${isNavOpen ? 'bi-x-lg' : 'bi-list'} fs-2`}></i>
        </button>

        {/* Menu déroulant : Affichage conditionnel b classe CSS bsbab l'état isNavOpen */}
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="restaurantNavbar">
          <ul className="navbar-nav mx-auto align-items-lg-center gap-1 my-3 my-lg-0 nav-pill-wrapper">
            <li className="nav-item">
              {/* [D. NavLink] : fih callback ({ isActive }) li ki-zid class 'active' auto l-lien l-actif */}
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsNavOpen(false)}
                id="nav-link-home"
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/menu"
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsNavOpen(false)}
                id="nav-link-menu"
              >
                La Carte &amp; Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/commandes"
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsNavOpen(false)}
                id="nav-link-orders"
              >
                Mes Commandes
              </NavLink>
            </li>
          </ul>

          {/* Right Header Section: Cart Button */}
          <div className="d-flex align-items-center ms-lg-3">
            <NavLink
              to="/checkout"
              className="cart-button-nav"
              onClick={() => setIsNavOpen(false)}
              id="nav-link-cart"
            >
              <i className="bi bi-bag-check-fill text-warning fs-6"></i>
              <span className="d-none d-sm-inline">Panier</span>
              <span className="cart-badge" id="cart-badge-count">
                {cartCount}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
