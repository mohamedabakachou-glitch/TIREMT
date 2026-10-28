import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="row g-4 mb-4 pb-4 border-bottom border-secondary border-opacity-25">
          {/* Brand Info & Michelin / Terroir Badge */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src="/logo-cream.png"
                alt="Tiremt Restaurant"
                style={{
                  height: '42px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-2 py-1 rounded" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                TIZNIT • MAROC
              </span>
            </div>
            <p className="pe-lg-4 footer-desc mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#cbd5e1' }}>
              Une célébration contemporaine et épurée des terroirs du Souss et du Maroc. Tajines mijotés au feu de bois, safran pur de Taliouine, huile d'argan de Tiznit et hospitalité marocaine d'exception.
            </p>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-dark border border-secondary border-opacity-50 text-warning small mt-2">
              <i className="bi bi-patch-check-fill text-warning"></i>
              <span>Excellence Culinaire • Terroirs de Tiznit &amp; Souss</span>
            </div>
          </div>

          {/* Restaurant Tiremt à Tiznit & Navigation */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Adresse &amp; Contact</h6>
            <div className="mb-2" style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
              <strong className="text-white d-block mb-1">Tiznit — Médina &amp; Bab El Khemis</strong>
              <span>Avenue Hassan II, Place El Mechouar, Tiznit</span>
              <div className="text-warning small mt-1.5 fw-semibold">
                <i className="bi bi-telephone-fill me-1"></i> +212 (0)5 28 86 20 24
              </div>
              <div className="small mt-1" style={{ color: '#cbd5e1' }}>
                <i className="bi bi-geo-alt-fill me-1 text-warning"></i> Tiznit, Région Souss-Massa, Maroc
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 pt-2 border-top border-secondary border-opacity-25" style={{ fontSize: '0.84rem' }}>
              <Link to="/menu" className="text-decoration-none hover-warning" style={{ color: '#cbd5e1' }}>La Carte</Link>
              <span style={{ color: '#64748b' }}>•</span>
              <Link to="/commandes" className="text-decoration-none hover-warning" style={{ color: '#cbd5e1' }}>Commandes</Link>
              <span style={{ color: '#64748b' }}>•</span>
              <Link to="/checkout" className="text-decoration-none hover-warning" style={{ color: '#cbd5e1' }}>Panier</Link>
            </div>
          </div>

          {/* Heures de Service */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Service &amp; Dégustation</h6>
            <div className="mb-2" style={{ fontSize: '0.86rem', color: '#cbd5e1' }}>
              <span className="d-block text-white fw-semibold mb-1">Tous les jours</span>
              <div>12h00 - 15h30</div>
              <div>19h00 - 23h30</div>
            </div>
            <div className="small mt-3" style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              <span className="text-warning fw-semibold"><i className="bi bi-bicycle me-1"></i> Livraison :</span> 7j/7 sur tout Tiznit
            </div>
          </div>

          {/* Newsletter La Gazette de Tiremt */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">La Gazette de Tiremt</h6>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.6' }}>
              Recevez les suggestions de nos chefs, secrets d'épices et créations éphémères du terroir de Tiznit.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="d-flex gap-2 mb-3">
              <input
                type="email"
                className="form-control form-control-sm bg-dark border-secondary text-white"
                placeholder="Votre email..."
                required
              />
              <button type="submit" className="btn btn-sm btn-warning px-3 rounded-3" aria-label="S'inscrire">
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
            <div className="d-flex gap-2">
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#contact" className="social-icon-btn" aria-label="Contact">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Legal */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small" style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
          <div className="mb-2 mb-md-0" style={{ color: '#cbd5e1' }}>
            © 2024 Restaurant Tiremt Tiznit. Tous droits réservés. L'art culinaire marocain d'exception.
          </div>
          <div className="d-flex gap-3">
            <a href="#mentions" className="text-decoration-none hover-warning" style={{ color: '#cbd5e1' }}>Mentions Légales</a>
            <span style={{ color: '#64748b' }}>•</span>
            <a href="#confidentialite" className="text-decoration-none hover-warning" style={{ color: '#cbd5e1' }}>Confidentialité</a>
            <span style={{ color: '#64748b' }}>•</span>
            <a href="#terroirs" className="text-decoration-none hover-warning" style={{ color: '#cbd5e1' }}>Charte Terroir Souss</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
