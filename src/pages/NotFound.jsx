import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container py-5 my-5 text-center">
      <div className="py-5 px-3 bg-white rounded-4 border shadow-sm mx-auto" style={{ maxWidth: '650px' }}>
        <div className="display-1 fw-bold text-warning font-heading mb-2">404</div>
        <div className="fs-1 mb-3">🍲🔍</div>
        <h2 className="fw-bold font-heading mb-3">Page ou Recette Introuvable</h2>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
          Il semble que le plat ou la page que vous recherchez ait été retiré du menu ou n'ait jamais existé.
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <Link to="/" className="btn btn-warning rounded-pill px-4 fw-semibold text-dark shadow-sm">
            <i className="bi bi-house-door me-2"></i> Retour à l'accueil
          </Link>
          <Link to="/menu" className="btn btn-outline-secondary rounded-pill px-4">
            <i className="bi bi-journal-text me-2"></i> Consulter la carte
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
