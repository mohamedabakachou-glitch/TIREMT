import React, { useEffect, useRef } from 'react'

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = ['Tous', 'Entrées', 'Plats Principaux', 'Desserts', 'Boissons'],
}) => {
  const inputRef = useRef(null)

  // Support ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="search-filter-section" id="search-filter-section">
      <div className="row g-3 align-items-center">
        {/* Search Input with ⌘K badge */}
        <div className="col-lg-5">
          <div className="search-input-group">
            <i className="bi bi-search search-icon-inside"></i>
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              placeholder="Rechercher un mets, ingrédient, vin..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Recherche de plat"
              id="search-input"
            />
            <span className="kbd-shortcut d-none d-sm-inline-block">⌘K</span>
            {searchTerm && (
              <button
                type="button"
                className="btn btn-sm btn-link position-absolute end-0 top-50 translate-middle-y text-muted me-5"
                onClick={() => onSearchChange('')}
                aria-label="Effacer la recherche"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* Categories Pills Bar */}
        <div className="col-lg-7">
          <div className="d-flex flex-wrap gap-2 justify-content-lg-end align-items-center">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
                id={`filter-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
