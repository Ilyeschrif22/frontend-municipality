"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import apiService from "@/lib/api"

export default function TestAPIPage() {
  const [testResults, setTestResults] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runTests = async () => {
    setLoading(true)
    setError(null)
    setTestResults({})

    try {
      console.log("🧪 Démarrage des tests API...")

      // Test 1: Types de documents
      console.log("📋 Test 1: Types de documents...")
      try {
        const types = await apiService.getAllTypeDocuments()
        setTestResults(prev => ({
          ...prev,
          types: {
            success: true,
            data: types,
            count: types.length
          }
        }))
        console.log("✅ Types récupérés:", types)
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          types: {
            success: false,
            error: error.message
          }
        }))
        console.error("❌ Erreur types:", error)
      }

      // Test 2: Citoyens
      console.log("👥 Test 2: Citoyens...")
      try {
        const citoyens = await apiService.getAllCitoyens()
        setTestResults(prev => ({
          ...prev,
          citoyens: {
            success: true,
            data: citoyens,
            count: citoyens.length
          }
        }))
        console.log("✅ Citoyens récupérés:", citoyens)
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          citoyens: {
            success: false,
            error: error.message
          }
        }))
        console.error("❌ Erreur citoyens:", error)
      }

      // Test 3: Demandes
      console.log("📝 Test 3: Demandes...")
      try {
        const demandes = await apiService.getAllDemandes()
        setTestResults(prev => ({
          ...prev,
          demandes: {
            success: true,
            data: demandes,
            count: demandes.length
          }
        }))
        console.log("✅ Demandes récupérées:", demandes)
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          demandes: {
            success: false,
            error: error.message
          }
        }))
        console.error("❌ Erreur demandes:", error)
      }

      // Test 4: Municipalités
      console.log("🏛️ Test 4: Municipalités...")
      try {
        const municipalites = await apiService.getAllMunicipalites()
        setTestResults(prev => ({
          ...prev,
          municipalites: {
            success: true,
            data: municipalites,
            count: municipalites.length
          }
        }))
        console.log("✅ Municipalités récupérées:", municipalites)
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          municipalites: {
            success: false,
            error: error.message
          }
        }))
        console.error("❌ Erreur municipalités:", error)
      }

      // Test 5: Documents
      console.log("📄 Test 5: Documents...")
      try {
        const documents = await apiService.getAllDocuments()
        setTestResults(prev => ({
          ...prev,
          documents: {
            success: true,
            data: documents,
            count: documents.length
          }
        }))
        console.log("✅ Documents récupérés:", documents)
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          documents: {
            success: false,
            error: error.message
          }
        }))
        console.error("❌ Erreur documents:", error)
      }

      console.log("🎉 Tous les tests terminés!")

    } catch (error) {
      setError("Erreur générale lors des tests: " + error.message)
      console.error("❌ Erreur générale:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTestIcon = (success) => {
    if (success === undefined) return <AlertCircle className="w-5 h-5 text-gray-400" />
    return success ? 
      <CheckCircle className="w-5 h-5 text-green-600" /> : 
      <XCircle className="w-5 h-5 text-red-600" />
  }

  const getTestStatus = (success) => {
    if (success === undefined) return <Badge variant="secondary">En attente</Badge>
    return success ? 
      <Badge className="bg-green-100 text-green-800">Succès</Badge> : 
      <Badge className="bg-red-100 text-red-800">Échec</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test de connectivité API</h1>
          <p className="text-gray-600">
            Cette page teste la connectivité avec le backend Spring Boot et affiche les données récupérées.
          </p>
        </div>

        <div className="mb-6">
          <Button onClick={runTests} disabled={loading} className="mb-4">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Tests en cours...
              </>
            ) : (
              "Lancer les tests API"
            )}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Types de documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTestIcon(testResults.types?.success)}
                <span>Types de documents</span>
              </CardTitle>
              <CardDescription>
                Récupération des types de documents disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Statut:</span>
                {getTestStatus(testResults.types?.success)}
              </div>
              
              {testResults.types?.success && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {testResults.types.count} type(s) récupéré(s)
                  </p>
                  <div className="space-y-2">
                    {testResults.types.data?.slice(0, 3).map((type, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                        <strong>{type.libelle}</strong> - {type.prix} FCFA
                      </div>
                    ))}
                    {testResults.types.count > 3 && (
                      <p className="text-xs text-gray-500">... et {testResults.types.count - 3} autres</p>
                    )}
                  </div>
                </div>
              )}
              
              {testResults.types?.error && (
                <p className="text-sm text-red-600">{testResults.types.error}</p>
              )}
            </CardContent>
          </Card>

          {/* Test Citoyens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTestIcon(testResults.citoyens?.success)}
                <span>Citoyens</span>
              </CardTitle>
              <CardDescription>
                Récupération des citoyens enregistrés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Statut:</span>
                {getTestStatus(testResults.citoyens?.success)}
              </div>
              
              {testResults.citoyens?.success && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {testResults.citoyens.count} citoyen(s) récupéré(s)
                  </p>
                  <div className="space-y-2">
                    {testResults.citoyens.data?.slice(0, 3).map((citoyen, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                        <strong>{citoyen.prenom} {citoyen.nom}</strong> - {citoyen.cin}
                      </div>
                    ))}
                    {testResults.citoyens.count > 3 && (
                      <p className="text-xs text-gray-500">... et {testResults.citoyens.count - 3} autres</p>
                    )}
                  </div>
                </div>
              )}
              
              {testResults.citoyens?.error && (
                <p className="text-sm text-red-600">{testResults.citoyens.error}</p>
              )}
            </CardContent>
          </Card>

          {/* Test Demandes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTestIcon(testResults.demandes?.success)}
                <span>Demandes</span>
              </CardTitle>
              <CardDescription>
                Récupération des demandes de documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Statut:</span>
                {getTestStatus(testResults.demandes?.success)}
              </div>
              
              {testResults.demandes?.success && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {testResults.demandes.count} demande(s) récupérée(s)
                  </p>
                  <div className="space-y-2">
                    {testResults.demandes.data?.slice(0, 3).map((demande, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                        <strong>{demande.objet}</strong> - {demande.statutDemande}
                      </div>
                    ))}
                    {testResults.demandes.count > 3 && (
                      <p className="text-xs text-gray-500">... et {testResults.demandes.count - 3} autres</p>
                    )}
                  </div>
                </div>
              )}
              
              {testResults.demandes?.error && (
                <p className="text-sm text-red-600">{testResults.demandes.error}</p>
              )}
            </CardContent>
          </Card>

          {/* Test Municipalités */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTestIcon(testResults.municipalites?.success)}
                <span>Municipalités</span>
              </CardTitle>
              <CardDescription>
                Récupération des municipalités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Statut:</span>
                {getTestStatus(testResults.municipalites?.success)}
              </div>
              
              {testResults.municipalites?.success && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {testResults.municipalites.count} municipalité(s) récupérée(s)
                  </p>
                  <div className="space-y-2">
                    {testResults.municipalites.data?.slice(0, 3).map((municipalite, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                        <strong>{municipalite.nom}</strong> - {municipalite.region}
                      </div>
                    ))}
                    {testResults.municipalites.count > 3 && (
                      <p className="text-xs text-gray-500">... et {testResults.municipalites.count - 3} autres</p>
                    )}
                  </div>
                </div>
              )}
              
              {testResults.municipalites?.error && (
                <p className="text-sm text-red-600">{testResults.municipalites.error}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Résumé */}
        {Object.keys(testResults).length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Résumé des tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(testResults).map(([key, result]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold">
                      {result.success ? result.count : 0}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions de débogage */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instructions de débogage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>Si les tests échouent, vérifiez :</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Le backend Spring Boot est démarré sur le port 8080</li>
                <li>La base de données PostgreSQL est accessible</li>
                <li>Les données de test ont été insérées (voir database_setup.sql)</li>
                <li>Le CORS est configuré correctement dans le backend</li>
                <li>La variable d'environnement NEXT_PUBLIC_API_URL est correcte</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 