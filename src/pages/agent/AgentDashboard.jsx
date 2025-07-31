"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  User,
  LogOut,
  Bell,
  Home,
  Download,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function AgentDashboard() {
  const [requests] = useState([
    {
      id: "REQ-2024-001",
      type: "Extrait de naissance",
      citizen: "Amadou Diallo",
      status: "pending",
      date: "2024-01-22",
      priority: "normal",
      assignedTo: "Non assigné",
    },
    {
      id: "REQ-2024-002",
      type: "Certificat de résidence",
      citizen: "Fatou Sall",
      status: "in_progress",
      date: "2024-01-20",
      priority: "urgent",
      assignedTo: "Moi",
    },
    {
      id: "REQ-2024-003",
      type: "Autorisation de construire",
      citizen: "Ousmane Ba",
      status: "review",
      date: "2024-01-18",
      priority: "normal",
      assignedTo: "Moi",
    },
    {
      id: "REQ-2024-004",
      type: "Certificat de mariage",
      citizen: "Aissatou Diop",
      status: "completed",
      date: "2024-01-15",
      priority: "normal",
      assignedTo: "Moi",
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
      case "review":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">À réviser</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeté</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Élevée</Badge>
      case "normal":
        return <Badge variant="secondary">Normale</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Faible</Badge>
      default:
        return <Badge variant="secondary">Normale</Badge>
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
      case "review":
        return <Eye className="w-5 h-5 text-purple-600" />
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
              <span>Espace Agent</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour, Agent Khadija Ndiaye</h1>
          <p className="text-gray-600">Gérez et traitez les demandes de documents administratifs des citoyens.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Demandes assignées</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
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
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terminées aujourd'hui</p>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps moyen</p>
                  <p className="text-2xl font-bold text-purple-600">2.5j</p>
                </div>
                <AlertCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Demandes à traiter</TabsTrigger>
            <TabsTrigger value="my-requests">Mes demandes</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
            <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Rechercher par nom, numéro de demande..." className="pl-10" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Type de document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les documents</SelectItem>
                      <SelectItem value="birth">Extrait de naissance</SelectItem>
                      <SelectItem value="residence">Certificat de résidence</SelectItem>
                      <SelectItem value="marriage">Certificat de mariage</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="review">À réviser</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Requests List */}
            <Card>
              <CardHeader>
                <CardTitle>Demandes en attente de traitement</CardTitle>
                <CardDescription>Demandes non assignées ou nécessitant votre attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((req) => req.status === "pending" || req.assignedTo === "Moi")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(request.status)}
                            <div>
                              <h3 className="font-medium">{request.type}</h3>
                              <p className="text-sm text-gray-600">
                                Demandé par {request.citizen} • #{request.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(request.priority)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span>Assigné à: {request.assignedTo}</span>
                            <span className="mx-2">•</span>
                            <span>Reçu le {new Date(request.date).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Voir
                            </Button>
                            {request.assignedTo === "Non assigné" && <Button size="sm">M'assigner</Button>}
                            {request.assignedTo === "Moi" && <Button size="sm">Traiter</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes demandes en cours</CardTitle>
                <CardDescription>Demandes que vous traitez actuellement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((req) => req.assignedTo === "Moi" && req.status !== "completed")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(request.status)}
                            <div>
                              <h3 className="font-medium">{request.type}</h3>
                              <p className="text-sm text-gray-600">
                                Demandé par {request.citizen} • #{request.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(request.priority)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Reçu le {new Date(request.date).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Voir détails
                            </Button>
                            <Button size="sm">Continuer</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Demandes terminées</CardTitle>
                <CardDescription>Historique de vos demandes traitées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((req) => req.status === "completed")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(request.status)}
                            <div>
                              <h3 className="font-medium">{request.type}</h3>
                              <p className="text-sm text-gray-600">
                                Demandé par {request.citizen} • #{request.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">{getStatusBadge(request.status)}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Terminé le {new Date(request.date).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Demandes traitées</span>
                      <span className="font-bold">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temps moyen de traitement</span>
                      <span className="font-bold">2.3 jours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taux de satisfaction</span>
                      <span className="font-bold">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Types de documents traités</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Extrait de naissance</span>
                      <span className="font-bold">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificat de résidence</span>
                      <span className="font-bold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificat de mariage</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Autres</span>
                      <span className="font-bold">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
