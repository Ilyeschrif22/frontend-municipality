"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Bell,
  User,
  LogOut,
  Home,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import apiService from "@/lib/api"
import ProtectedRoute from "@/components/ProtectedRoute"

function CitizenDashboardContent() {
  const { user, logout } = useAuth()
  const [demandes, setDemandes] = useState([])
  const [documents, setDocuments] = useState([])
  const [citoyen, setCitoyen] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Récupérer l'ID du citoyen depuis l'utilisateur connecté
      // Pour l'instant, on utilise un ID par défaut, mais en production
      // cela devrait venir du token JWT ou d'une API utilisateur
      const citoyenId = user?.citoyenId || 1

      // Récupérer les informations du citoyen
      const citoyenData = await apiService.getCitoyenById(citoyenId)
      setCitoyen(citoyenData)

      // Récupérer les demandes du citoyen
      const demandesData = await apiService.getDemandesByCitoyen(citoyenId)
      setDemandes(demandesData)

      // Récupérer tous les documents liés aux demandes du citoyen
      const allDocuments = []
      for (const demande of demandesData) {
        try {
          const documentsDemande = await apiService.getDocumentsByDemande(demande.id)
          allDocuments.push(...documentsDemande)
        } catch (error) {
          console.warn(`Erreur lors de la récupération des documents pour la demande ${demande.id}:`, error)
        }
      }
      setDocuments(allDocuments)

    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      setError("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    // Redirection vers la page de connexion
    window.location.href = "/auth/login"
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "TERMINEE":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>
      case "EN_COURS":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>
      case "NOUVELLE":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>
      case "REJETEE":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeté</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "TERMINEE":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "EN_COURS":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "NOUVELLE":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "REJETEE":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getProgressValue = (status) => {
    switch (status) {
      case "TERMINEE":
        return 100
      case "EN_COURS":
        return 75
      case "NOUVELLE":
        return 25
      case "REJETEE":
        return 0
      default:
        return 0
    }
  }

  const getEstimatedTime = (status) => {
    switch (status) {
      case "TERMINEE":
        return "Terminé"
      case "EN_COURS":
        return "2 jours restants"
      case "NOUVELLE":
        return "5 jours restants"
      case "REJETEE":
        return "Demande rejetée"
      default:
        return "En attente"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadDashboardData}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">DocuMuni</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-600">
              <Home className="w-4 h-4" />
              <span>/</span>
              <span>Tableau de bord</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {citoyen ? `${citoyen.prenom} ${citoyen.nom}` : "Citoyen"}
          </h1>
          <p className="text-gray-600">
            Bienvenue sur votre espace personnel. Gérez vos demandes de documents administratifs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total demandes</p>
                  <p className="text-2xl font-bold text-gray-900">{demandes.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {demandes.filter(d => d.statutDemande === "EN_COURS").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terminées</p>
                  <p className="text-2xl font-bold text-green-600">
                    {demandes.filter(d => d.statutDemande === "TERMINEE").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {demandes.filter(d => d.statutDemande === "NOUVELLE").length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="requests">Mes demandes</TabsTrigger>
              <TabsTrigger value="documents">Mes documents</TabsTrigger>
              <TabsTrigger value="profile">Mon profil</TabsTrigger>
            </TabsList>
            <Button asChild>
              <Link href="/citizen/new-request">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle demande
              </Link>
            </Button>
          </div>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Demandes récentes</CardTitle>
                <CardDescription>Suivez l'état d'avancement de vos demandes de documents</CardDescription>
              </CardHeader>
              <CardContent>
                {demandes.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande</h3>
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de demandes de documents.</p>
                    <Button asChild>
                      <Link href="/citizen/new-request">
                        <Plus className="w-4 h-4 mr-2" />
                        Créer une demande
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {demandes.map((demande) => (
                      <div key={demande.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(demande.statutDemande)}
                            <div>
                              <h3 className="font-medium">{demande.objet}</h3>
                              <p className="text-sm text-gray-600">Demande #{demande.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(demande.statutDemande)}
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {demande.statutDemande === "TERMINEE" && (
                              <Button variant="ghost" size="icon">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{getEstimatedTime(demande.statutDemande)}</span>
                          </div>
                          <Progress value={getProgressValue(demande.statutDemande)} className="h-2" />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>Demandé le {new Date(demande.dateDemande).toLocaleDateString("fr-FR")}</span>
                          <span>{getProgressValue(demande.statutDemande)}% terminé</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents obtenus</CardTitle>
                <CardDescription>Téléchargez et consultez vos documents validés</CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document</h3>
                    <p className="text-gray-600">Vous n'avez pas encore de documents validés.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((document) => (
                      <div key={document.id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-green-600" />
                          <div>
                            <h3 className="font-medium">{document.nom}</h3>
                            <p className="text-sm text-gray-600">
                              Obtenu le {new Date(document.dateCreation).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Gérez vos informations de profil</CardDescription>
              </CardHeader>
              <CardContent>
                {citoyen ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nom complet</label>
                      <p className="text-gray-900">{citoyen.prenom} {citoyen.nom}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">CIN/NIN</label>
                      <p className="text-gray-900">{citoyen.cin}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{citoyen.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Téléphone</label>
                      <p className="text-gray-900">{citoyen.telephone}</p>
                    </div>
                    {citoyen.dateNaissance && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Date de naissance</label>
                        <p className="text-gray-900">{new Date(citoyen.dateNaissance).toLocaleDateString("fr-FR")}</p>
                      </div>
                    )}
                    {citoyen.lieuNaissance && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Lieu de naissance</label>
                        <p className="text-gray-900">{citoyen.lieuNaissance}</p>
                      </div>
                    )}
                    {citoyen.adresse && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Adresse</label>
                        <p className="text-gray-900">{citoyen.adresse}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Informations non disponibles</h3>
                    <p className="text-gray-600">Impossible de charger vos informations personnelles.</p>
                  </div>
                )}
                <div className="mt-6">
                  <Button>Modifier mes informations</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function CitizenDashboard() {
  return (
    <ProtectedRoute requiredRole="citizen">
      <CitizenDashboardContent />
    </ProtectedRoute>
  )
}
