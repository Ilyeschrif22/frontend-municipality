"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  BarChart3,
  Download,
  User,
  LogOut,
  Bell,
  Home,
  Shield,
  Database,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats] = useState({
    totalRequests: 1247,
    pendingRequests: 89,
    completedRequests: 1098,
    rejectedRequests: 60,
    totalUsers: 3456,
    activeAgents: 12,
    avgProcessingTime: 2.8,
    satisfactionRate: 94,
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: "request_completed",
      message: "Demande REQ-2024-001 terminée par Agent Khadija",
      time: "Il y a 5 minutes",
      status: "success",
    },
    {
      id: 2,
      type: "new_user",
      message: "Nouvel utilisateur inscrit: Moussa Diop",
      time: "Il y a 12 minutes",
      status: "info",
    },
    {
      id: 3,
      type: "system_alert",
      message: "Pic d'activité détecté - 45 nouvelles demandes",
      time: "Il y a 1 heure",
      status: "warning",
    },
  ])

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
              <span>Administration</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble du système DocuMuni et gestion des opérations.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total demandes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRequests.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+12% ce mois</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+8% ce mois</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps moyen</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgProcessingTime}j</p>
                  <p className="text-xs text-red-600 mt-1">+0.3j ce mois</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.satisfactionRate}%</p>
                  <p className="text-xs text-green-600 mt-1">+2% ce mois</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>État des demandes</CardTitle>
                  <CardDescription>Répartition des demandes par statut</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Terminées</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{stats.completedRequests}</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">88%</Badge>
                    </div>
                  </div>
                  <Progress value={88} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">En cours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{stats.pendingRequests}</span>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">7%</Badge>
                    </div>
                  </div>
                  <Progress value={7} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Rejetées</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{stats.rejectedRequests}</span>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">5%</Badge>
                    </div>
                  </div>
                  <Progress value={5} className="h-2" />
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières actions sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === "success"
                              ? "bg-green-600"
                              : activity.status === "warning"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Métriques de performance</CardTitle>
                <CardDescription>Indicateurs clés de performance du système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2.8j</div>
                    <div className="text-sm text-gray-600">Temps moyen de traitement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">94%</div>
                    <div className="text-sm text-gray-600">Taux de satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
                    <div className="text-sm text-gray-600">Agents actifs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>Gérez les comptes citoyens et leurs permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-600">
                    {stats.totalUsers.toLocaleString()} utilisateurs enregistrés
                  </div>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-center text-gray-500">Interface de gestion des utilisateurs à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des agents</CardTitle>
                <CardDescription>Gérez les comptes agents et leurs performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-600">{stats.activeAgents} agents actifs</div>
                  <Button>Ajouter un agent</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-center text-gray-500">Interface de gestion des agents à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration des documents</CardTitle>
                <CardDescription>Gérez les types de documents et leurs paramètres</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  <p className="text-center text-gray-500">Interface de configuration des documents à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Paramètres système</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Database className="w-4 h-4 mr-2" />
                      Sauvegarde de données
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      Paramètres de sécurité
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Configuration des rapports
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dernière sauvegarde</span>
                      <span className="text-sm text-gray-600">Il y a 2 heures</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Espace disque utilisé</span>
                      <span className="text-sm text-gray-600">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Version système</span>
                      <span className="text-sm text-gray-600">v2.1.0</span>
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
