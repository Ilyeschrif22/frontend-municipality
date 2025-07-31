"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()
  const { login, loading, error } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      await login({
        username: formData.username,
        password: formData.password,
      })
      
      // Redirection selon le type d'utilisateur
      if (userType === "citizen") {
        router.push("/citizen/dashboard")
      } else if (userType === "agent") {
        router.push("/agent/dashboard")
      } else if (userType === "admin") {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
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
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
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
              <Label htmlFor="username">
                {userType === "citizen" ? "CIN/NIN, Email ou Téléphone" : "Email ou Nom d'utilisateur"}
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={
                  userType === "citizen" ? "Votre CIN, email ou téléphone" : "Votre email ou nom d'utilisateur"
                }
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                  placeholder="Votre mot de passe"
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
                disabled={loading}
              />
              <Label htmlFor="remember" className="text-sm">
                Se souvenir de moi
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!userType || loading}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <div className="text-center space-y-2">
              <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                Mot de passe oublié ?
              </Link>
              <div className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link href="/auth/register" className="text-green-600 hover:underline">
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
