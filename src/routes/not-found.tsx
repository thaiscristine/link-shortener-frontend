import { Link } from 'react-router-dom'
import notFoundArt from '@/assets/404.svg'
import { CenteredCardLayout } from '@/components/centered-card-layout'

export function NotFoundRoute() {
  return (
    <CenteredCardLayout>
      <img src={notFoundArt} alt="404" className="h-14 w-auto" />
      <h1 className="text-lg text-gray-600">Link não encontrado</h1>
      <p className="text-sm text-gray-500">
        O link que você está tentando acessar não existe, foi removido ou é
        uma URL inválida. Saiba mais em{' '}
        <Link to="/" className="font-semibold text-blue-base hover:underline">
          brev.ly
        </Link>
        .
      </p>
    </CenteredCardLayout>
  )
}
