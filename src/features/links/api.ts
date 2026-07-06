import { del, get, patch, post } from '@/lib/api'

export type Link = {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: string
}

export function listLinks(): Promise<{ links: Link[] }> {
  return get('/links')
}

export function createLink(input: {
  originalUrl: string
  shortUrl: string
}): Promise<Link> {
  return post('/links', input)
}

export function deleteLink(shortUrl: string): Promise<void> {
  return del(`/links/${shortUrl}`)
}

export function getLinkBySlug(
  shortUrl: string,
): Promise<{ originalUrl: string }> {
  return get(`/links/${shortUrl}`)
}

export function incrementLinkAccess(
  shortUrl: string,
): Promise<{ accessCount: number }> {
  return patch(`/links/${shortUrl}/increment`)
}

export function exportLinks(): Promise<{ reportUrl: string }> {
  return post('/links/exports', undefined)
}
