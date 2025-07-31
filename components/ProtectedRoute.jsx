"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [loading, isAuthenticated, router])

  // Vérification du rôle si spécifié
  useEffect(() => {
    if (!loading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push('/auth/login?error=unauthorized')
    }
  }, [loading, isAuthenticated, user, requiredRole, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Vérification de l'authentification...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirection en cours
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null // Redirection en cours
  }

  return children
} 