import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, deleteOrder, updateOrder, selectOrders, selectOrderFetchStatus } from '../redux/orderSlice'
import Loader from '../components/Loader'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const fetchStatus = useSelector(selectOrderFetchStatus)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const showToast = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleDelete = async (id) => {
    if (window.confirm(`Confirmez-vous l'annulation de la commande #${id} ?`)) {
      try {
        await dispatch(deleteOrder(id)).unwrap()
        showToast(`Commande #${id} annulée avec succès (DELETE).`)
      } catch (err) {
        showToast(`Erreur lors de l'annulation : ${err}`)
      }
    }
  }

  const handleAdvanceStatus = async (order) => {
    const nextStatus = order.statut === 'En préparation' ? 'En route' : order.statut === 'En route' ? 'Livré' : 'En préparation'
    try {
      await dispatch(updateOrder({ id: order.id, updates: { statut: nextStatus } })).unwrap()
      showToast(`Statut de la commande #${order.id} mis à jour : "${nextStatus}" (PATCH).`)
    } catch (err) {
      showToast(`Erreur lors de la mise à jour : ${err}`)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Livré':
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2.5 py-1 rounded-pill">Livré</span>
      case 'En route':
        return <span className="badge bg-info bg-opacity-10 text-primary border border-info border-opacity-25 px-2.5 py-1 rounded-pill">En cours de livraison</span>
      case 'En préparation':
      default:
        return (
          <span className="badge bg-warning bg-opacity-10 text-warning-emphasis border border-warning border-opacity-25 px-2.5 py-1 rounded-pill">
            <i className="bi bi-fire me-1 text-warning"></i> En préparation
          </span>
        )
    }
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
        <div>
          <span className="badge bg-warning bg-opacity-25 text-warning-emphasis px-3 py-1.5 rounded-pill fw-bold text-uppercase small mb-2">
            <i className="bi bi-clock-history me-1"></i> Historique Gastronomique
          </span>
          <h1 className="display-6 fw-bold font-heading mb-1 text-dark">Mes Commandes &amp; Réservations</h1>
          <p className="text-muted mb-0">Suivez l'état d'avancement de vos tables et commandes d'exception.</p>
        </div>
        <div className="mt-3 mt-md-0">
          <Link to="/menu" className="btn btn-warning rounded-pill px-4 fw-bold text-dark shadow-sm">
            <i className="bi bi-plus-circle me-1"></i> Nouvelle Commande
          </Link>
        </div>
      </div>

      {/* Toast Feedback for CRUD actions */}
      {feedback && (
        <div className="toast-notice alert alert-dark text-white border-0 shadow-lg d-flex align-items-center gap-2 p-3" role="alert">
          <i className="bi bi-info-circle-fill text-warning fs-5"></i>
          <div>{feedback}</div>
        </div>
      )}

      {fetchStatus === 'pending' && <Loader message="Récupération de l'historique des commandes..." />}

      {fetchStatus !== 'pending' && orders.length === 0 && (
        <div className="text-center py-5 bg-white rounded-4 border shadow-card my-4 px-3">
          <div className="bg-light text-muted rounded-circle d-inline-flex p-4 mb-3">
            <i className="bi bi-receipt display-4 text-warning"></i>
          </div>
          <h3 className="fw-bold font-heading mb-2">Aucune commande trouvée</h3>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '420px' }}>
            Vous n'avez pas encore passé de commande chez nous. Explorez nos spécialités et commandez en quelques clics !
          </p>
          <Link to="/menu" className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark">
            Consulter la Carte
          </Link>
        </div>
      )}

      {orders.length > 0 && (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.id} className="col-lg-6">
              <div className="card h-100 border-0 rounded-4 shadow-card overflow-hidden bg-white">
                {/* Header card */}
                <div className="card-header bg-light bg-opacity-50 p-3.5 d-flex justify-content-between align-items-center border-bottom">
                  <div>
                    <span className="fw-bold text-dark me-2 font-monospace">Commande #{order.id}</span>
                    <small className="text-muted d-block d-sm-inline">
                      {order.date
                        ? new Date(order.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Récemment'}
                    </small>
                  </div>
                  <div>{getStatusBadge(order.statut)}</div>
                </div>

                {/* Body */}
                <div className="card-body p-4">
                  <div className="mb-3">
                    <h6 className="text-muted small text-uppercase fw-bold mb-2.5" style={{ letterSpacing: '0.05em' }}>
                      Articles commandés ({order.articles?.reduce((acc, a) => acc + a.quantity, 0) || 0})
                    </h6>
                    <ul className="list-group list-group-flush small">
                      {order.articles?.map((art, idx) => (
                        <li
                          key={idx}
                          className="list-group-item px-0 py-1.5 d-flex justify-content-between align-items-center border-0"
                        >
                          <span>
                            <strong className="text-warning">{art.quantity}x</strong> {art.nom}
                          </span>
                          <span className="text-muted fw-semibold">{art.prix * art.quantity} DH</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-light rounded-3 mb-2 small">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <i className="bi bi-person text-warning"></i>
                      <strong className="text-dark">{order.client?.nom}</strong>
                      <span className="text-muted">({order.client?.telephone})</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <i className="bi bi-geo-alt text-warning"></i>
                      <span>{order.client?.adresse}</span>
                    </div>
                    {order.client?.notes && (
                      <div className="d-flex align-items-center gap-2 text-muted mt-1 fst-italic">
                        <i className="bi bi-chat-left-text text-warning"></i>
                        <span>Note : {order.client?.notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer card with CRUD Actions */}
                <div className="card-footer bg-white border-top p-3.5 d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="small text-muted">
                      Livraison : {order.fraisLivraison === 0 ? 'Gratuite' : `${order.fraisLivraison} DH`}
                    </div>
                    <div className="fw-bold fs-5 text-dark font-heading">
                      Total : <span className="text-warning">{order.total} DH</span>
                    </div>
                  </div>

                  {/* Actions CRUD (PATCH & DELETE) */}
                  <div className="d-flex justify-content-end gap-2 pt-2 border-top border-light">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                      onClick={() => handleAdvanceStatus(order)}
                      title="Mettre à jour le statut (PATCH)"
                    >
                      <i className="bi bi-arrow-repeat"></i>
                      <span>Changer statut</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                      onClick={() => handleDelete(order.id)}
                      title="Annuler cette commande (DELETE)"
                    >
                      <i className="bi bi-trash3"></i>
                      <span>Annuler</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory
