"use client"

import ModernNavigation from '@/components/modern-navigation'
import AdvancedSearch from '@/components/advanced-search'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      <div className="pt-20 pb-12">
        <AdvancedSearch />
      </div>
    </div>
  )
}
