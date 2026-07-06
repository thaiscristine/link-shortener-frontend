import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ApiError } from '@/lib/api'
import {
  createLink,
  deleteLink,
  exportLinks,
  getLinkBySlug,
  incrementLinkAccess,
  listLinks,
} from './api'

const LINKS_QUERY_KEY = ['links']

export function useLinks() {
  return useQuery({
    queryKey: LINKS_QUERY_KEY,
    queryFn: listLinks,
  })
}

export function useCreateLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY })
    },
  })
}

export function useDeleteLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY })
    },
  })
}

export function useExportLinks() {
  return useMutation({
    mutationFn: exportLinks,
  })
}

export type RedirectState =
  | { status: 'loading' }
  | { status: 'success'; originalUrl: string }
  | { status: 'not-found' }

export function useRedirectLink(shortUrl: string): RedirectState {
  const [state, setState] = useState<RedirectState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    getLinkBySlug(shortUrl)
      .then(({ originalUrl }) => {
        if (cancelled) return
        setState({ status: 'success', originalUrl })
        incrementLinkAccess(shortUrl).catch(() => {
          // Best-effort — a failed increment must not block the redirect.
        })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        if (error instanceof ApiError && error.status === 404) {
          setState({ status: 'not-found' })
          return
        }
        setState({ status: 'not-found' })
      })

    return () => {
      cancelled = true
    }
  }, [shortUrl])

  return state
}
