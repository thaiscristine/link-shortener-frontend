import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logoIcon from '@/assets/logo-icon.svg'
import { CenteredCardLayout } from '@/components/centered-card-layout'
import { useRedirectLink } from '@/features/links/hooks'
import { NotFoundRoute } from './not-found'

const REDIRECT_DELAY_MS = 2000

export function RedirectRoute() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const state = useRedirectLink(shortUrl ?? '')

  useEffect(() => {
    if (state.status !== 'success') return

    const timer = setTimeout(() => {
      window.location.href = state.originalUrl
    }, REDIRECT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [state])

  if (state.status === 'not-found') {
    return <NotFoundRoute />
  }

  return (
    <CenteredCardLayout>
      <img src={logoIcon} alt="brev.ly" className="h-12 w-12" />
      <h1 className="text-lg text-gray-600">Redirecionando...</h1>
      <p className="text-sm text-gray-500">
        O link será aberto automaticamente em alguns instantes.
      </p>
      {state.status === 'success' ? (
        <p className="text-sm text-gray-500">
          Não foi redirecionado?{' '}
          <a
            href={state.originalUrl}
            className="font-semibold text-blue-base hover:underline"
          >
            Acesse aqui
          </a>
        </p>
      ) : null}
    </CenteredCardLayout>
  )
}
