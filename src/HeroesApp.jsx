import React from 'react'
import { AppRouter } from './router'
import { AuthProvider } from './auth'

const HeroesApp = () => {
  return (
    <AuthProvider>

      <AppRouter/>
      
    </AuthProvider>
  )
}

export default HeroesApp