import type { ReactNode } from 'react'
import logo from '@/assets/logo.svg'

type PageLayoutProps = {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 px-4 py-8 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <img src={logo} alt="brev.ly" className="h-8 w-auto" />
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {children}
        </div>
      </div>
    </div>
  )
}
