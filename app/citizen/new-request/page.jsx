"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, X, ArrowLeft, CreditCard, Smartphone, Building, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import apiService from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewRequestPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedDocument, setSelectedDocument] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [documentTypes, setDocumentTypes] = useState([])
  const [citoyen, setCitoyen] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    objet: "",
    description: "",
    motif: "",
    // Champs spécifiques selon le type de document
    dateNaissance: "",
    lieuNaissance: "",
    nomPere: "",
    nomMere: "",
    adresse: "",
    dureeResidence: "",
    quartier: "",
  })

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Charger les types de documents
      const types = await apiService.getAllTypeDocuments()
      setDocumentTypes(types)
      
      // Charger les informations du citoyen connecté
      const citoyenId = user?.citoyenId || 1
      const citoyenData = await apiService.getCitoyenById(citoyenId)
      setCitoyen(citoyenData)
      
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      setError("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  const selectedDocInfo = documentTypes.find((doc) => doc.id === selectedDocument)

  const handleFileUpload = (fileName) => {
    setUploadedFiles([...uploadedFiles, fileName])
  }

  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileName))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedDocument || !paymentMethod) {
      setError("Veuillez sélectionner un type de document et un mode de paiement")
      return
    }

    if (!citoyen) {
      setError("Impossible de récupérer vos informations. Veuillez vous reconnecter.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      // Préparer les données de la demande
      const demandeData = {
        objet: formData.objet || selectedDocInfo?.libelle,
        description: formData.description,
        motif: formData.motif,
        citoyenId: citoyen.id,
        municipaliteId: citoyen.municipaliteId || 1,
        statutDemande: "NOUVELLE",
        // Ajouter les champs spécifiques selon le type de document
        ...formData
      }

      // Créer la demande
      const nouvelleDemande = await apiService.createDemande(demandeData)

      // Upload des fichiers (si implémenté)
      if (uploadedFiles.length > 0) {
        // Logique d'upload des fichiers
        console.log("Fichiers à uploader:", uploadedFiles)
        // TODO: Implémenter l'upload des fichiers via l'API
      }

      // Redirection vers le dashboard avec message de succès
      router.push("/citizen/dashboard?success=true")
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      setError("Erreur lors de la soumission de la demande")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Chargement des données...</span>
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
            <Button variant="ghost" size="icon" asChild>
              <Link href="/citizen/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">DocuMuni</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouvelle demande de document</h1>
          <p className="text-gray-600">
            Remplissez le formulaire ci-dessous pour demander votre document administratif
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Étape 1: Sélection du document */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Type de document</span>
              </CardTitle>
              <CardDescription>Sélectionnez le type de document que vous souhaitez demander</CardDescription>
            </CardHeader>
            <CardContent>
              {documentTypes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun type de document disponible</h3>
                  <p className="text-gray-600">Impossible de charger les types de documents.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentTypes.map((doc) => (
                    <div
                      key={doc.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedDocument === doc.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedDocument(doc.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{doc.libelle}</h3>
                        <Badge variant="secondary">{doc.prix ? `${doc.prix} FCFA` : "Gratuit"}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{doc.description}</p>
                        {doc.delaiTraitement && (
                          <p className="mt-1 text-xs">Délai: {doc.delaiTraitement}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Étape 2: Informations spécifiques */}
          {selectedDocument && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <span>Informations spécifiques</span>
                </CardTitle>
                <CardDescription>Remplissez les informations requises pour {selectedDocInfo?.libelle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objet">Objet de la demande</Label>
                  <Input 
                    id="objet" 
                    placeholder="Objet de votre demande"
                    value={formData.objet}
                    onChange={(e) => handleInputChange('objet', e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Décrivez votre demande en détail"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motif">Motif de la demande</Label>
                  <Textarea 
                    id="motif" 
                    placeholder="Précisez l'utilisation prévue du document"
                    value={formData.motif}
                    onChange={(e) => handleInputChange('motif', e.target.value)}
                  />
                </div>

                {/* Champs spécifiques selon le type de document */}
                {selectedDocInfo?.libelle?.toLowerCase().includes('naissance') && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateNaissance">Date de naissance</Label>
                        <Input 
                          id="dateNaissance" 
                          type="date" 
                          value={formData.dateNaissance}
                          onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
                        <Input 
                          id="lieuNaissance" 
                          placeholder="Ville de naissance"
                          value={formData.lieuNaissance}
                          onChange={(e) => handleInputChange('lieuNaissance', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nomPere">Nom du père</Label>
                        <Input 
                          id="nomPere" 
                          placeholder="Nom complet du père"
                          value={formData.nomPere}
                          onChange={(e) => handleInputChange('nomPere', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nomMere">Nom de la mère</Label>
                        <Input 
                          id="nomMere" 
                          placeholder="Nom complet de la mère"
                          value={formData.nomMere}
                          onChange={(e) => handleInputChange('nomMere', e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedDocInfo?.libelle?.toLowerCase().includes('résidence') && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="adresse">Adresse complète</Label>
                      <Textarea 
                        id="adresse" 
                        placeholder="Votre adresse de résidence complète"
                        value={formData.adresse}
                        onChange={(e) => handleInputChange('adresse', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dureeResidence">Durée de résidence</Label>
                        <Select 
                          value={formData.dureeResidence}
                          onValueChange={(value) => handleInputChange('dureeResidence', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moins_1_an">Moins d'1 an</SelectItem>
                            <SelectItem value="1_2_ans">1 à 2 ans</SelectItem>
                            <SelectItem value="2_5_ans">2 à 5 ans</SelectItem>
                            <SelectItem value="plus_5_ans">Plus de 5 ans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quartier">Quartier/Commune</Label>
                        <Input 
                          id="quartier" 
                          placeholder="Nom du quartier"
                          value={formData.quartier}
                          onChange={(e) => handleInputChange('quartier', e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Étape 3: Pièces justificatives */}
          {selectedDocument && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <span>Pièces justificatives</span>
                </CardTitle>
                <CardDescription>
                  Téléchargez les documents requis (PDF, JPG, PNG - Max 5MB par fichier)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900 mb-1">Documents justificatifs</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Glissez-déposez vos fichiers ou cliquez pour parcourir
                      </p>
                      <Button type="button" variant="outline" onClick={() => handleFileUpload("document.pdf")}>
                        Choisir un fichier
                      </Button>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Fichiers téléchargés:</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(file)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Étape 4: Paiement */}
          {selectedDocument && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <span>Mode de paiement</span>
                </CardTitle>
                <CardDescription>Choisissez votre mode de paiement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "orange_money"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("orange_money")}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-8 h-8 text-orange-600" />
                      <div>
                        <h3 className="font-medium">Orange Money</h3>
                        <p className="text-sm text-gray-600">Paiement mobile</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "wave" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("wave")}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Wave</h3>
                        <p className="text-sm text-gray-600">Paiement mobile</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "on_site"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("on_site")}
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="font-medium">Sur place</h3>
                        <p className="text-sm text-gray-600">À la mairie</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Récapitulatif et soumission */}
          {selectedDocument && paymentMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de la demande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Document demandé:</span>
                    <span className="font-medium">{selectedDocInfo?.libelle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix:</span>
                    <span className="font-medium">{selectedDocInfo?.prix ? `${selectedDocInfo.prix} FCFA` : "Gratuit"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode de paiement:</span>
                    <span className="font-medium">
                      {paymentMethod === "orange_money" && "Orange Money"}
                      {paymentMethod === "wave" && "Wave"}
                      {paymentMethod === "on_site" && "Paiement sur place"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fichiers joints:</span>
                    <span className="font-medium">{uploadedFiles.length} fichier(s)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    Je certifie que les informations fournies sont exactes et j'accepte les conditions d'utilisation
                  </Label>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/citizen/dashboard">Annuler</Link>
                  </Button>
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Soumission en cours...
                      </>
                    ) : (
                      "Soumettre la demande"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
