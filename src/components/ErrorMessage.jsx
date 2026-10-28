import React from 'react'

const ErrorMessage = ({
  message = "Une erreur inattendue s'est produite lors de la communication avec le serveur.",
  onRetry,
}) => {
  return (
    <div
      className="alert alert-danger d-flex align-items-center justify-content-between p-4 my-4 rounded-4 shadow-sm"
      role="alert"
      id="app-error-message"
    >
      <div className="d-flex align-items-center gap-3">
        <div className="fs-2 text-danger">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <div>
          <h6 className="alert-heading fw-bold mb-1">Oups ! Une erreur est survenue</h6>
          <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
            {message}
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm rounded-pill px-3 ms-3"
          onClick={onRetry}
          id="retry-error-btn"
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Réessayer
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
