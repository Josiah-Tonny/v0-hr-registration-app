'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (could check session/cookie here)
    // For now, redirect to login
    const session = localStorage.getItem('hr_session')
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return null
}
