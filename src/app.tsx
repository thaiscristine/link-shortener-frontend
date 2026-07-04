import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeRoute } from './routes/home'
import { NotFoundRoute } from './routes/not-found'
import { RedirectRoute } from './routes/redirect'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/:shortCode',
    element: <RedirectRoute />,
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
