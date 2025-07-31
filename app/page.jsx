"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Shield, BarChart3, Smartphone, Globe, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Rediriger les utilisateurs connectés vers leur dashboard approprié
    if (!loading && isAuthenticated && user) {
      // Vous devrez adapter cette logique selon votre backend
      // pour déterminer le type d'utilisateur
      if (user.role === "citizen" || user.type === "citizen") {
        router.push("/citizen/dashboard")
      } else if (user.role === "agent" || user.type === "agent") {
        router.push("/agent/dashboard")
      } else if (user.role === "admin" || user.type === "admin") {
        router.push("/admin/dashboard")
      }
    }
  }, [loading, isAuthenticated, user, router])

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  // Si l'utilisateur est connecté, ne pas afficher la page d'accueil
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DocuMuni</h1>
              <p className="text-sm text-gray-600">Sénégal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">S'inscrire</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            Digitalisation des services municipaux
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simplifiez vos démarches administratives
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Demandez vos documents administratifs en ligne, suivez leur traitement en temps réel et récupérez-les
            facilement. Une solution moderne pour les citoyens sénégalais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Commencer maintenant</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Découvrir les fonctionnalités</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Une plateforme complète pour tous</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              DocuMuni répond aux besoins des citoyens, agents municipaux et administrateurs avec des outils adaptés à
              chaque profil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Espace Citoyen</CardTitle>
                <CardDescription>Interface simple pour demander vos documents administratifs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Demandes en ligne 24h/24</li>
                  <li>• Suivi en temps réel</li>
                  <li>• Paiement sécurisé</li>
                  <li>• Historique complet</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Espace Agent</CardTitle>
                <CardDescription>Outils de traitement et validation pour les employés municipaux</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Traitement des demandes</li>
                  <li>• Validation des pièces</li>
                  <li>• Signature électronique</li>
                  <li>• Suivi des performances</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Espace Administrateur</CardTitle>
                <CardDescription>Gestion complète du système et analyses statistiques</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Gestion des utilisateurs</li>
                  <li>• Statistiques détaillées</li>
                  <li>• Configuration système</li>
                  <li>• Audit et sécurité</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Documents disponibles */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Documents disponibles</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Extrait de naissance",
                "Certificat de résidence",
                "Certificat de mariage",
                "Acte de décès",
                "Autorisation de construire",
                "Permis d'occuper",
                "Certificat de célibat",
                "Attestation de domicile",
              ].map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Gain de temps</h3>
              <p className="text-gray-600 text-sm">
                Plus besoin de se déplacer. Demandez vos documents depuis chez vous.
              </p>
            </div>
            <div className="text-center">
              <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Mobile-friendly</h3>
              <p className="text-gray-600 text-sm">Interface optimisée pour smartphones et tablettes.</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Multilingue</h3>
              <p className="text-gray-600 text-sm">Disponible en français et langues locales sénégalaises.</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Sécurisé</h3>
              <p className="text-gray-600 text-sm">
                Vos données sont protégées avec les plus hauts standards de sécurité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">DocuMuni</span>
              </div>
              <p className="text-gray-400 text-sm">
                Digitalisation des services municipaux au Sénégal pour une administration plus efficace.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documents administratifs</li>
                <li>Suivi en temps réel</li>
                <li>Paiement en ligne</li>
                <li>Support client</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Tutoriels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Conditions d'utilisation</li>
                <li>Politique de confidentialité</li>
                <li>Mentions légales</li>
                <li>RGPD</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 DocuMuni. Tous droits réservés. Fait avec ❤️ pour le Sénégal.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
