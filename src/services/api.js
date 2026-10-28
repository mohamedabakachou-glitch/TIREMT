/**
 * services/api.js - Centralized API network layer for restaurant app
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Fallback mock dishes in case JSON server is not yet started by the student
const FALLBACK_PLATS = [
  {
    id: "1",
    nom: "Tagine de Poulet aux Citrons Confits & Olives",
    prix: 85,
    categorie: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    description: "Poulet fermier mijoté lentement aux épices de Fès, safran pur de Taliouine, citrons beldi confits et olives rouges de Marrakech.",
    tempsPrep: "25 min",
    rating: 4.9,
    calories: "520 kcal",
    isPopular: true
  },
  {
    id: "2",
    nom: "Couscous Royal aux Sept Légumes & Agneau",
    prix: 110,
    categorie: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    description: "Semoule fine travaillée à la main, tendres morceaux d'agneau et merguez artisanales, courgettes, carottes, navets, potiron et pois chiches au bouillon parfumé.",
    tempsPrep: "30 min",
    rating: 5.0,
    calories: "680 kcal",
    isPopular: true
  },
  {
    id: "3",
    nom: "Pastilla Traditionnelle au Poulet & Amandes",
    prix: 95,
    categorie: "Entrées",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description: "Feuilletage ouarka croustillant renfermant une farce savoureuse de poulet effiloché, amandes torréfiées concassées, parfumée à la fleur d'oranger et cannelle.",
    tempsPrep: "20 min",
    rating: 4.8,
    calories: "450 kcal",
    isPopular: true
  },
  {
    id: "4",
    nom: "Zaalouk & Briouates Mixtes",
    prix: 45,
    categorie: "Entrées",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: "Caviar d'aubergines grillées aux tomates fraîches et cumin torréfié, accompagné d'un trio de briouates croustillantes au fromage de chèvre et herbes.",
    tempsPrep: "15 min",
    rating: 4.7,
    calories: "280 kcal",
    isPopular: false
  },
  {
    id: "5",
    nom: "Burger Gourmet Berbère au Bœuf Charolais",
    prix: 78,
    categorie: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Pain brioché artisanal aux graines de nigelle, steak haché 180g grillé à la flamme, cheddar affiné, oignons caramélisés et sauce mayonnaise maison au harissa doux.",
    tempsPrep: "18 min",
    rating: 4.8,
    calories: "650 kcal",
    isPopular: false
  },
  {
    id: "6",
    nom: "Salade Fraîcheur Méditerranéenne & Burrata",
    prix: 55,
    categorie: "Entrées",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    description: "Tomates cerises multicolores, concombres croquants, grenades, cœur de burrata crémeuse, pignons de pin et vinaigrette légère à l'huile d'argan.",
    tempsPrep: "12 min",
    rating: 4.6,
    calories: "310 kcal",
    isPopular: false
  },
  {
    id: "7",
    nom: "Tartelette Croustillante aux Figues & Miel",
    prix: 40,
    categorie: "Desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    description: "Pâte sablée au beurre pur, crème d'amandes fondante, figues fraîches rôties au miel d'oranger et éclats de pistaches grillées.",
    tempsPrep: "10 min",
    rating: 4.9,
    calories: "320 kcal",
    isPopular: true
  },
  {
    id: "8",
    nom: "Corne de Gazelle & Assortiment Marocain",
    prix: 38,
    categorie: "Desserts",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    description: "Sélection de douceurs impériales: cornes de gazelle à l'eau de rose, ghriba aux noix et chebbakia artisanale au sésame doré.",
    tempsPrep: "8 min",
    rating: 4.9,
    calories: "390 kcal",
    isPopular: false
  },
  {
    id: "9",
    nom: "Thé à la Menthe Fraîche & Absinthe (Chiba)",
    prix: 20,
    categorie: "Boissons",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "Thé vert gunpowder infusé à la perfection avec feuilles de menthe bio fraîches, pointe d'absinthe et servi à la marocaine avec sa belle mousse.",
    tempsPrep: "5 min",
    rating: 5.0,
    calories: "45 kcal",
    isPopular: true
  },
  {
    id: "10",
    nom: "Jus d'Orange Pressé & Fleur d'Oranger",
    prix: 25,
    categorie: "Boissons",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    description: "Oranges de Berkane fraîchement pressées à la minute, délicatement sublimées par quelques gouttes d'eau de fleur d'oranger artisanale.",
    tempsPrep: "5 min",
    rating: 4.8,
    calories: "110 kcal",
    isPopular: false
  }
]

// Fetch helper wrapper with proper error checking
// Fetch request kat-sift HTTP GET/POST w kat-vérifier res.ok 9bl json()
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (err) {
    // Graceful offline fallback if server is unreachable
    console.warn(`[API] Server unavailable at ${url}, falling back to local storage/mock:`, err.message)

    if (endpoint === '/plats') {
      return FALLBACK_PLATS
    }

    if (endpoint.startsWith('/plats/')) {
      const id = endpoint.split('/')[2]
      const found = FALLBACK_PLATS.find((p) => String(p.id) === String(id))
      if (found) return found
      throw new Error(`Plat avec ID ${id} introuvable`)
    }

    if (endpoint === '/commandes' && options.method === 'POST') {
      const order = JSON.parse(options.body || '{}')
      const createdOrder = {
        id: String(Date.now()),
        date: new Date().toISOString(),
        ...order,
      }
      const existing = JSON.parse(localStorage.getItem('restaurant_commandes') || '[]')
      const updated = [createdOrder, ...existing]
      localStorage.setItem('restaurant_commandes', JSON.stringify(updated))
      return createdOrder
    }

    if (endpoint === '/commandes' && (!options.method || options.method === 'GET')) {
      const stored = localStorage.getItem('restaurant_commandes')
      return stored ? JSON.parse(stored) : []
    }

    throw err
  }
}

export const api = {
  // GET /plats — Retrieve menu items
  getPlats: () => request('/plats'),

  // GET /plats/:id — Retrieve single dish detail by ID
  getPlatById: (id) => request(`/plats/${id}`),

  // POST /commandes — Submit a new customer order
  createCommande: (commande) =>
    request('/commandes', {
      method: 'POST',
      body: JSON.stringify(commande),
    }),

  // GET /commandes — Retrieve list of submitted orders
  getCommandes: () => request('/commandes'),
}

export default api
