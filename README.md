# DocuMuni - Frontend Citoyen

Frontend Next.js pour la plateforme de gestion des documents municipaux.

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18 ou supérieur
- npm ou pnpm
- Backend Spring Boot démarré sur le port 8080

### 1. Installation des dépendances

```bash
cd frontend-citoyen
npm install
# ou
pnpm install
```

### 2. Configuration des variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Configuration de l'API backend
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Configuration de l'authentification
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key

# Configuration de l'application
NEXT_PUBLIC_APP_NAME=DocuMuni
NEXT_PUBLIC_APP_DESCRIPTION=Plateforme de gestion des documents municipaux
```

### 3. Démarrage de l'application

```bash
npm run dev
# ou
pnpm dev
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## 📁 Structure du projet

```
frontend-citoyen/
├── app/                    # Pages Next.js (App Router)
│   ├── auth/              # Pages d'authentification
│   ├── citizen/           # Pages citoyen
│   ├── agent/             # Pages agent
│   ├── admin/             # Pages administrateur
│   └── layout.tsx         # Layout principal
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI (shadcn/ui)
│   └── ProtectedRoute.jsx # Protection des routes
├── hooks/                # Hooks personnalisés
│   └── useAuth.js        # Hook d'authentification
├── lib/                  # Utilitaires
│   ├── api.js            # Service API centralisé
│   └── utils.ts          # Fonctions utilitaires
└── public/               # Fichiers statiques
```

## 🔌 Intégration avec les APIs Spring Boot

### Service API centralisé

Le fichier `lib/api.js` centralise toutes les communications avec le backend :

```javascript
import apiService from '@/lib/api'

// Exemples d'utilisation
const citoyens = await apiService.getAllCitoyens()
const demandes = await apiService.getDemandesByCitoyen(citoyenId)
const nouvelleDemande = await apiService.createDemande(demandeData)
```

### Endpoints disponibles

#### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/validate` - Validation du token JWT

#### Citoyens
- `GET /api/citoyens` - Liste tous les citoyens
- `GET /api/citoyens/{id}` - Récupérer un citoyen par ID
- `POST /api/citoyens` - Créer un citoyen
- `PUT /api/citoyens/{id}` - Modifier un citoyen
- `DELETE /api/citoyens/{id}` - Supprimer un citoyen

#### Demandes
- `GET /api/demandes` - Liste toutes les demandes
- `GET /api/demandes/citoyen/{id}` - Demandes par citoyen
- `POST /api/demandes` - Créer une demande
- `PUT /api/demandes/{id}` - Modifier une demande
- `DELETE /api/demandes/{id}` - Supprimer une demande

#### Types de documents
- `GET /api/types-documents` - Liste tous les types
- `GET /api/types-documents/{id}` - Récupérer un type par ID
- `POST /api/types-documents` - Créer un type
- `PUT /api/types-documents/{id}` - Modifier un type
- `DELETE /api/types-documents/{id}` - Supprimer un type

#### Documents
- `GET /api/documents` - Liste tous les documents
- `GET /api/documents/demande/{id}` - Documents par demande
- `POST /api/documents` - Créer un document
- `PUT /api/documents/{id}` - Modifier un document
- `DELETE /api/documents/{id}` - Supprimer un document

#### Pièces jointes
- `GET /api/pieces-jointes` - Liste toutes les pièces jointes
- `GET /api/pieces-jointes/demande/{id}` - Pièces jointes par demande
- `POST /api/pieces-jointes/upload` - Upload de fichier
- `POST /api/pieces-jointes` - Créer une pièce jointe
- `DELETE /api/pieces-jointes/{id}` - Supprimer une pièce jointe

#### Suivi
- `GET /api/suivi` - Liste tous les suivis
- `GET /api/suivi/demande/{id}` - Suivis par demande
- `POST /api/suivi` - Créer un suivi

#### Agents
- `GET /api/agents` - Liste tous les agents
- `GET /api/agents/municipalite/{id}` - Agents par municipalité

#### Municipalités
- `GET /api/municipalites` - Liste toutes les municipalités
- `GET /api/municipalites/{id}` - Récupérer une municipalité par ID

## 🔐 Authentification et sécurité

### JWT (JSON Web Tokens)
- Stockage : localStorage
- Validation automatique au chargement
- Déconnexion automatique si token invalide

### Protection des routes
```javascript
import ProtectedRoute from '@/components/ProtectedRoute'

export default function MaPage() {
  return (
    <ProtectedRoute requiredRole="citizen">
      <ContenuDeLaPage />
    </ProtectedRoute>
  )
}
```

### Hook d'authentification
```javascript
import { useAuth } from '@/hooks/useAuth'

function MonComposant() {
  const { user, login, logout, isAuthenticated } = useAuth()
  
  // Utilisation...
}
```

## 🎨 Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **UI Components** : shadcn/ui
- **Icons** : Lucide React
- **State Management** : React Hooks (useState, useEffect, Context)
- **HTTP Client** : Fetch API
- **Authentication** : JWT

## 📱 Fonctionnalités par rôle

### Citoyen
- ✅ Connexion/Inscription
- ✅ Tableau de bord personnel
- ✅ Nouvelle demande de document
- ✅ Suivi des demandes
- ✅ Consultation des documents obtenus
- ✅ Gestion du profil

### Agent (à implémenter)
- ⏳ Tableau de bord agent
- ⏳ Gestion des demandes
- ⏳ Validation des documents
- ⏳ Suivi des traitements

### Administrateur (à implémenter)
- ⏳ Tableau de bord admin
- ⏳ Gestion des utilisateurs
- ⏳ Statistiques
- ⏳ Configuration système

## 🚀 Déploiement

### Production
```bash
npm run build
npm start
```

### Variables d'environnement de production
```env
NEXT_PUBLIC_API_URL=https://votre-api.com/api
NEXT_PUBLIC_APP_NAME=DocuMuni
```

## 🐛 Débogage

### Erreurs courantes

1. **Erreur de connexion à l'API**
   - Vérifier que le backend Spring Boot est démarré
   - Vérifier l'URL dans `NEXT_PUBLIC_API_URL`
   - Vérifier les logs du backend

2. **Erreur CORS**
   - Vérifier la configuration CORS dans le backend
   - Vérifier que les origines sont autorisées

3. **Erreur d'authentification**
   - Vérifier la configuration JWT
   - Vérifier les données de test dans la base de données

### Logs de débogage
```javascript
// Activer les logs détaillés
console.log('Données API:', response)
console.log('État utilisateur:', user)
```

## 📝 Notes importantes

### Données de test
Le backend inclut des données de test :
- **Citoyens** : Amadou Diallo, Mariama Sall, etc.
- **Types de documents** : Extrait de naissance, Certificat de résidence, etc.
- **Demandes** : 4 demandes avec différents statuts

### IDs temporaires
⚠️ **Important** : L'application utilise actuellement des IDs hardcodés pour les tests :
- `citoyenId: 1` dans le hook d'authentification
- Ces IDs doivent être remplacés par des valeurs dynamiques en production

### Upload de fichiers
- L'upload de fichiers est préparé mais pas encore implémenté
- Utilise l'endpoint `/api/pieces-jointes/upload`
- Gestion des fichiers physiques côté backend

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
1. Vérifier la documentation
2. Consulter les logs de débogage
3. Vérifier la configuration des variables d'environnement
4. S'assurer que le backend est démarré et accessible "# frontend-municipality" 
