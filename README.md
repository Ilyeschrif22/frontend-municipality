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
### 2. Démarrage de l'application

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
