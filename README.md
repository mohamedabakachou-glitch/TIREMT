# 🍽️ Le Palais Gourmet — Application de Commande pour un Restaurant

Une application web moderne, modulaire, performante et testable de commande gastronomique en ligne développée avec **React 18**, **Redux Toolkit**, **React Router v6** et **Vite**, stylisée avec **Bootstrap 5** et un design responsive élégant.

---

## 🚀 1. Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (version 18+ recommandée)
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Lancement de l'Application (2 Terminaux Recommandés)

#### Terminal 1 : Démarrer le Serveur Backend Mock (JSON Server)
```bash
npx json-server --watch db.json --port 3001
# ou simplement :
npm run server
```
> Le serveur REST sera accessible sur : `http://localhost:3001`  
> *(Note: Une couche de secours hors-ligne est également intégrée dans `src/services/api.js` pour garantir le fonctionnement fluide même sans serveur lancé).*

#### Terminal 2 : Démarrer le Serveur de Développement Vite
```bash
npm run dev
```
> L'application sera accessible sur : `http://localhost:5173`

---

## 🧪 2. Exécution des Tests Unitaires

Les tests unitaires couvrent **cartSlice** (reducers, actions, sélecteurs avec `reduce`) et la **validation côté client du formulaire de commande (Checkout)** avec **Vitest** et **React Testing Library** :

```bash
# Exécuter tous les tests une fois
npm test

# Exécuter les tests en mode écoute continue (watch)
npm run test:watch
```

---

## 🏗️ 3. Architecture du Projet (`src/`)

```text
src/
├── assets/                  # Images et ressources statiques
├── components/              # Composants UI modulaires et réutilisables
│   ├── Navbar.jsx           # Barre de navigation avec badge dynamique du panier
│   ├── Footer.jsx           # Pied de page avec horaires, contacts et liens
│   ├── PlatCard.jsx         # Carte de plat avec prix, badges et ajout panier
│   ├── SearchBar.jsx        # Barre de recherche textuelle et filtres par catégorie
│   ├── Loader.jsx           # Indicateur animé de chargement
│   └── ErrorMessage.jsx     # Affichage élégant des alertes et erreurs serveur
├── pages/                   # Vues / Pages de l'application
│   ├── Home.jsx             # Bannière Hero, points forts & plats signatures
│   ├── Menu.jsx             # Catalogue complet avec filtrage réactif
│   ├── PlatDetail.jsx       # Détail d'un plat via paramètre dynamique d'URL
│   ├── Checkout.jsx         # Révision panier et formulaire contrôlé de livraison
│   ├── OrderHistory.jsx     # Historique des commandes avec statuts en direct
│   └── NotFound.jsx         # Page d'erreur 404 conviviale
├── redux/                   # Configuration du State Centralisé
│   ├── store.js             # Configuration centrale Redux Toolkit
│   ├── cartSlice.js         # Actions panier, persistance et sélecteurs (selectCartTotal)
│   ├── menuSlice.js         # Thunk asynchrone fetchPlats (pending/fulfilled/rejected)
│   └── orderSlice.js        # Gestion de la soumission et historique des commandes
├── services/                # Couche Réseau REST
│   └── api.js               # Wrapper centralisé fetch (GET/POST /plats & /commandes)
├── App.jsx                  # Configuration des Routes (BrowserRouter, Routes, Route)
├── index.css                # Système de design, Bootstrap 5 et variables CSS
└── main.jsx                 # Point d'entrée avec Provider Redux
```

---

## 🇲🇦 4. Guide de Soutenance Orale (Commentaires en Darija)

Pour vous aider à expliquer les concepts techniques clés lors de votre présentation orale, voici les 5 points majeurs annotés directement dans le code :

| Concept Technique | Fichier | Commentaire Darija inclus dans le code | Explication pour le jury |
| :--- | :--- | :--- | :--- |
| **`useParams()`** | `src/pages/PlatDetail.jsx` | `// Hna kankhdmo b useParams bash najbdou l-ID d lplat mn l-URL d la page` | Permet d'extraire le paramètre d'URL dynamique (ex: `/plats/2`) pour afficher les détails du plat ciblé. |
| **`createAsyncThunk`** | `src/redux/menuSlice.js` | `// createAsyncThunk kat-gérer 3 d les états: pending (loading), fulfilled (succès), rejected (erreur)` | Gère le cycle de vie asynchrone de la requête HTTP en dispatchant automatiquement les actions `pending`, `fulfilled` et `rejected`. |
| **`selectCartTotal`** | `src/redux/cartSlice.js` | `// Hada selector ki-hseb l-total d l-panier b reduce (prix * quantite)` | Sélecteur mémorisé qui calcule la somme totale des articles du panier via la méthode fonctionnelle `.reduce()`. |
| **Formulaire Contrôlé & Validation** | `src/pages/Checkout.jsx` | `// Controlina les inputs b useState w drna validation 9bl ma n-sifto l-POST request` | Utilisation de l'état local React (`useState`) pour contrôler chaque champ et bloquer la soumission si les règles de validation ne sont pas respectées. |
| **Appels `fetch`** | `src/services/api.js` | `// Fetch request kat-sift HTTP GET/POST w kat-vérifier res.ok 9bl json()` | Fonction wrapper HTTP vérifiant `response.ok` avant de parser le flux JSON pour intercepter rigoureusement toute erreur 4xx/5xx. |

---

## 📡 5. Endpoints de l'API REST (`db.json`)

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/plats` | Récupère la liste complète des plats |
| `GET` | `/plats/:id` | Récupère les détails d'un plat précis |
| `POST` | `/commandes` | Enregistre une nouvelle commande client |
| `GET` | `/commandes` | Récupère l'historique de toutes les commandes |

---

## 🛠️ Scripts Disponibles dans `package.json`

- `npm run dev` : Lance le serveur de dev Vite avec HMR rapide.
- `npm run server` : Démarre JSON Server sur le port `3001` avec observation de `db.json`.
- `npm test` : Lance la suite de tests unitaires Vitest.
- `npm run test:watch` : Lance les tests en mode réactif continu.
- `npm run build` : Compile et optimise l'application pour la production dans `/dist`.
- `npm run lint` : Vérifie la qualité et les standards du code source avec Oxlint.
