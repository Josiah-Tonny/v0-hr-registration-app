import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-secondary/5 blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  )
}
