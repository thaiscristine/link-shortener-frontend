import type { ReactNode } from 'react'

type CenteredCardLayoutProps = {
  children: ReactNode
}

export function CenteredCardLayout({ children }: CenteredCardLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl bg-gray-white p-8 text-center shadow-card">
        {children}
      </div>
    </div>
  )
}
