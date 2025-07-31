"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Checkbox } from "../../components/ui/checkbox"
import { FileText, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        username: formData.identifier,
        password: formData.password,
      })

      const { token, type } = response.data
      
      // Store token in localStorage or sessionStorage based on rememberMe
      if (formData.rememberMe) {
        localStorage.setItem("authToken", `${type} ${token}`)
      } else {
        sessionStorage.setItem("authToken", `${type} ${token}`)
      }

      // Navigate based on user type
      if (userType === "citizen") {
        navigate("/citizen/dashboard")
      } else if (userType === "agent") {
        navigate("/agent/dashboard")
      } else if (userType === "admin") {
        navigate("/admin/dashboard")
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Échec de la connexion. Veuillez vérifier vos identifiants."
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">DocuMuni</span>
          </div>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Accédez à votre espace personnel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="userType">Type d'utilisateur</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre profil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citoyen</SelectItem>
                  <SelectItem value="agent">Agent municipal</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identifier">
                {userType === "citizen" ? "CIN/NIN, Email ou Téléphone" : "Email ou Nom d'utilisateur"}
              </Label>
              <Input
                id="identifier"
                type="text"
                placeholder={
                  userType === "citizen" ? "Votre CIN, email ou téléphone" : "Votre email ou nom d'utilisateur"
                }
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
              />
              <Label htmlFor="remember" className="text-sm">
                Se souvenir de moi
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!userType}>
              Se connecter
            </Button>

            <div className="text-center space-y-2">
              <Link to="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                Mot de passe oublié ?
              </Link>
              <div className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link to="/auth/register" className="text-green-600 hover:underline">
                  S'inscrire
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}