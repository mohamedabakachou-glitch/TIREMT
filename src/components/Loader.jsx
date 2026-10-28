import React from 'react'

// [A. Affichage Conditionnel & Composant réutilisable] :
// Loader ki-t-afficha mli kat-koun chi requête API f l'état 'pending'.
// Ki-akhod le prop 'message' bach y-personalisi le texte de chargement selon la page.
const Loader = ({ message = 'Chargement de la carte gastronomique...' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 my-4" id="app-loader">
      <div className="position-relative mb-3">
        <div
          className="spinner-border text-warning"
          role="status"
          style={{ width: '3.5rem', height: '3.5rem', borderWidth: '0.25em' }}
        >
          <span className="visually-hidden">Chargement...</span>
        </div>
        <div className="position-absolute top-50 start-50 translate-middle text-warning fs-5">
          <i className="bi bi-fire"></i>
        </div>
      </div>
      <p className="text-muted fw-500 mb-0" style={{ fontSize: '0.95rem' }}>
        {message}
      </p>
    </div>
  )
}

export default Loader
