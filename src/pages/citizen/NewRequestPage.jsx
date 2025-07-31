"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { Checkbox } from "../../components/ui/checkbox"
import { Badge } from "../../components/ui/badge"
import { FileText, Upload, X, ArrowLeft, CreditCard, Smartphone, Building } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function NewRequestPage() {
  const [selectedDocument, setSelectedDocument] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const navigate = useNavigate()

  const documentTypes = [
    { value: "birth_certificate", label: "Extrait de naissance", price: "2000 FCFA", required: ["CIN", "Photo"] },
    {
      value: "residence_certificate",
      label: "Certificat de résidence",
      price: "1500 FCFA",
      required: ["CIN", "Facture électricité"],
    },
    {
      value: "marriage_certificate",
      label: "Certificat de mariage",
      price: "3000 FCFA",
      required: ["CIN époux", "CIN épouse"],
    },
    {
      value: "death_certificate",
      label: "Acte de décès",
      price: "2500 FCFA",
      required: ["CIN déclarant", "Certificat médical"],
    },
    {
      value: "building_permit",
      label: "Autorisation de construire",
      price: "15000 FCFA",
      required: ["Plan construction", "Titre foncier"],
    },
    {
      value: "occupancy_permit",
      label: "Permis d'occuper",
      price: "10000 FCFA",
      required: ["Demande manuscrite", "Plan situation"],
    },
  ]

  const selectedDocInfo = documentTypes.find((doc) => doc.value === selectedDocument)

  const handleFileUpload = (fileName) => {
    setUploadedFiles([...uploadedFiles, fileName])
  }

  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileName))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulation de soumission
    navigate("/citizen/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/citizen/dashboard">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map((doc) => (
                  <div
                    key={doc.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedDocument === doc.value
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedDocument(doc.value)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{doc.label}</h3>
                      <Badge variant="secondary">{doc.price}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Pièces requises:</p>
                      <ul className="list-disc list-inside mt-1">
                        {doc.required.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
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
                <CardDescription>Remplissez les informations requises pour {selectedDocInfo?.label}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDocument === "birth_certificate" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Date de naissance</Label>
                        <Input id="birthDate" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthPlace">Lieu de naissance</Label>
                        <Input id="birthPlace" placeholder="Ville de naissance" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fatherName">Nom du père</Label>
                        <Input id="fatherName" placeholder="Nom complet du père" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motherName">Nom de la mère</Label>
                        <Input id="motherName" placeholder="Nom complet de la mère" required />
                      </div>
                    </div>
                  </>
                )}

                {selectedDocument === "residence_certificate" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse complète</Label>
                      <Textarea id="address" placeholder="Votre adresse de résidence complète" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="residenceDuration">Durée de résidence</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less_1_year">Moins d'1 an</SelectItem>
                            <SelectItem value="1_2_years">1 à 2 ans</SelectItem>
                            <SelectItem value="2_5_years">2 à 5 ans</SelectItem>
                            <SelectItem value="more_5_years">Plus de 5 ans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">Quartier/Commune</Label>
                        <Input id="district" placeholder="Nom du quartier" required />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Motif de la demande</Label>
                  <Textarea id="reason" placeholder="Précisez l'utilisation prévue du document" />
                </div>
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
                  {selectedDocInfo?.required.map((req, index) => (
                    <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">{req}</p>
                        <p className="text-xs text-gray-500 mb-4">
                          Glissez-déposez votre fichier ou cliquez pour parcourir
                        </p>
                        <Button type="button" variant="outline" onClick={() => handleFileUpload(`${req}.pdf`)}>
                          Choisir un fichier
                        </Button>
                      </div>
                    </div>
                  ))}

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
                <CardDescription>Choisissez votre mode de paiement pour {selectedDocInfo?.price}</CardDescription>
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
                    <span className="font-medium">{selectedDocInfo?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix:</span>
                    <span className="font-medium">{selectedDocInfo?.price}</span>
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
                    <Link to="/citizen/dashboard">Annuler</Link>
                  </Button>
                  <Button type="submit" className="flex-1">
                    Soumettre la demande
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
