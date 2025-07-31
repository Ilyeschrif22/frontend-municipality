"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
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
} from "lucide-react"
import { Link } from "react-router-dom"

export default function CitizenDashboard() {
  const [requests] = useState([
    {
      id: "REQ-2024-001",
      type: "Extrait de naissance",
      status: "completed",
      date: "2024-01-15",
      progress: 100,
      estimatedTime: "Terminé",
    },
    {
      id: "REQ-2024-002",
      type: "Certificat de résidence",
      status: "in_progress",
      date: "2024-01-20",
      progress: 75,
      estimatedTime: "2 jours restants",
    },
    {
      id: "REQ-2024-003",
      type: "Autorisation de construire",
      status: "pending",
      date: "2024-01-22",
      progress: 25,
      estimatedTime: "5 jours restants",
    },
  ])

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeté</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
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
            <Button variant="ghost" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour, Amadou Diallo</h1>
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
                  <p className="text-2xl font-bold text-gray-900">12</p>
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
                  <p className="text-2xl font-bold text-blue-600">2</p>
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
                  <p className="text-2xl font-bold text-green-600">9</p>
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
                  <p className="text-2xl font-bold text-yellow-600">1</p>
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
              <Link to="/citizen/new-request">
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
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(request.status)}
                          <div>
                            <h3 className="font-medium">{request.type}</h3>
                            <p className="text-sm text-gray-600">Demande #{request.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(request.status)}
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {request.status === "completed" && (
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{request.estimatedTime}</span>
                        </div>
                        <Progress value={request.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Demandé le {new Date(request.date).toLocaleDateString("fr-FR")}</span>
                        <span>{request.progress}% terminé</span>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="font-medium">Extrait de naissance</h3>
                        <p className="text-sm text-gray-600">Obtenu le 18 janvier 2024</p>
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
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom complet</label>
                    <p className="text-gray-900">Amadou Diallo</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CIN/NIN</label>
                    <p className="text-gray-900">1234567890123</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">amadou.diallo@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <p className="text-gray-900">+221 77 123 45 67</p>
                  </div>
                </div>
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
