"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { FileText, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cin: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      const response = await axios.post("http://localhost:8081/api/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cin: formData.cin,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      })

      const { token, type } = response.data

      // Store token in localStorage
      localStorage.setItem("authToken", `${type} ${token}`)

      // Navigate to citizen dashboard
      navigate("/citizen/dashboard")
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Échec de l'inscription. Veuillez vérifier vos informations."
      )
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
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+221 XX XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les{" "}
                <Link to="/terms" className="text-green-600 hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link to="/privacy" className="text-green-600 hover:underline">
                  politique de confidentialité
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!formData.acceptTerms}>
              Créer mon compte
            </Button>

            <div className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/auth/login" className="text-green-600 hover:underline">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}