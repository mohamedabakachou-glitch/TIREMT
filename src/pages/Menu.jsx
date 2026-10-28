import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlats, selectAllPlats, selectMenuStatus, selectMenuError } from '../redux/menuSlice'
import PlatCard from '../components/PlatCard'
import SearchBar from '../components/SearchBar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const Menu = () => {
  const dispatch = useDispatch()
  // [E. Redux Selectors] : Récupération dyal la liste des plats, le statut ('idle'|'pending'|'fulfilled') w l'erreur
  const plats = useSelector(selectAllPlats)
  const status = useSelector(selectMenuStatus)
  const error = useSelector(selectMenuError)

  // [B. useState] : États locaux pour le texte de recherche et la catégorie active
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  // [A. useEffect pour chargement initial] :
  // Ki-t-exécuta une seule fois au montage. Ila kan status 'idle', ki-lancer le thunk fetchPlats()
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlats())
    }
  }, [status, dispatch])

  // [A & B. useMemo pour l'optimisation des performances] :
  // Extraction dynamique des catégories uniques existantes dans la base (évite les doublons)
  const categories = useMemo(() => {
    const list = ['Tous']
    plats.forEach((p) => {
      if (p.categorie && !list.includes(p.categorie)) {
        list.push(p.categorie)
      }
    })
    return list
  }, [plats])

  // [B. Double Filtrage dynamique (Recherche + Catégorie)] :
  // useMemo ki-recouvre les plats filtrés sans bloquer le thread principal.
  // Ki-filtrer par catégorie choisie ET par mot-clé (nom ou description du plat insensible à la casse)
  const filteredPlats = useMemo(() => {
    return plats.filter((plat) => {
      const matchCategory =
        selectedCategory === 'Tous' ||
        plat.categorie.toLowerCase() === selectedCategory.toLowerCase()

      const matchSearch =
        plat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plat.description && plat.description.toLowerCase().includes(searchTerm.toLowerCase()))

      return matchCategory && matchSearch
    })
  }, [plats, searchTerm, selectedCategory])

  return (
    <div className="container py-4">
      {/* Header Banner */}
      <div className="text-center py-4 mb-4">
        <div className="d-inline-flex align-items-center gap-2 bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1.5 rounded-pill fw-semibold small mb-2">
          <span className="p-1 bg-success rounded-circle d-inline-block"></span>
          <span>Cuisine ouverte à Tiznit • {plats.length} spécialités disponibles</span>
        </div>
        <h1 className="display-5 fw-bold font-heading mb-2">La Carte &amp; Menus de Tiremt</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '640px', lineHeight: '1.7' }}>
          Explorez l'authenticité de nos recettes marocaines à Tiznit : tagines fumants au feu de bois,
          pastillas dorées aux amandes, couscous traditionnel et salades raffinées du terroir.
        </p>
      </div>

      {/* Search and Category Filters */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Content Rendering based on status */}
      {status === 'pending' && <Loader message="Chargement de la carte de Tiremt en direct..." />}

      {status === 'rejected' && (
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchPlats())}
        />
      )}

      {status === 'fulfilled' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="text-muted small">
              Affichage de <strong className="text-dark">{filteredPlats.length}</strong> spécialité{filteredPlats.length > 1 ? 's' : ''}
              {selectedCategory !== 'Tous' && ` dans "${selectedCategory}"`}
            </span>
            {(searchTerm || selectedCategory !== 'Tous') && (
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none text-muted"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Tous')
                }}
              >
                <i className="bi bi-x-circle me-1"></i> Réinitialiser les filtres
              </button>
            )}
          </div>

          {filteredPlats.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 border shadow-sm my-4">
              <i className="bi bi-search text-muted display-4 mb-3 d-block"></i>
              <h5 className="fw-bold font-heading">Aucun mets ne correspond à votre recherche</h5>
              <p className="text-muted small mb-3">
                Essayez d'ajuster votre terme de recherche ou sélectionnez une autre catégorie de la carte.
              </p>
              <button
                type="button"
                className="btn btn-warning rounded-pill px-4 fw-bold"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Tous')
                }}
              >
                Voir toute la carte
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredPlats.map((plat) => (
                <div key={plat.id} className="col-md-6 col-lg-4">
                  <PlatCard plat={plat} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Menu
