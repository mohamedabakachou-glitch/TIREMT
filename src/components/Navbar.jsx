import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../redux/cartSlice'

const Navbar = () => {
  const cartCount = useSelector(selectCartCount)
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        {/* Brand Logo with the authentic Tiremt Restaurant logo without background */}
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

        {/* Mobile Toggle Button */}
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

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="restaurantNavbar">
          <ul className="navbar-nav mx-auto align-items-lg-center gap-1 my-3 my-lg-0 nav-pill-wrapper">
            <li className="nav-item">
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
