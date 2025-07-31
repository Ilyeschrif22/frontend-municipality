"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("citizen")
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const router = useRouter()
  const { register, loading, error } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()
    
    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    
    try {
      const citoyenData = {
        nom: formData.nom,
        prenom: formData.prenom,
        cin: formData.cin,
        telephone: formData.telephone,
        email: formData.email,
        // Ajoutez d'autres champs selon votre backend
      }
      
      await register(citoyenData)
      
      // Redirection vers la page de connexion après inscription réussie
      router.push("/auth/login?registered=true")
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">DocuMuni</span>
          </div>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>Rejoignez la plateforme de digitalisation municipale</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cin">CIN/NIN</Label>
              <Input
                id="cin"
                placeholder="Votre numéro CIN ou NIN"
                value={formData.cin}
                onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                type="tel"
                placeholder="+221 XX XXX XX XX"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Créez un mot de passe sécurisé"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
                required
                disabled={loading}
              />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  politique de confidentialité
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!formData.acceptTerms || loading}>
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link href="/auth/login" className="text-green-600 hover:underline">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
