import { Check, CopySimple } from '@phosphor-icons/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Link } from '../api'
import { stripProtocol } from '../validations'
import { DeleteLinkDialog } from './delete-link-dialog'

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? 'http://localhost:5173'

type LinkListItemProps = {
  link: Link
}

export function LinkListItem({ link }: LinkListItemProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(`${FRONTEND_URL}/${link.shortUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-300 py-3 last:border-none">
      <div className="flex flex-col gap-1 overflow-hidden">
        <a
          href={`/${link.shortUrl}`}
          target="_blank"
          rel="noreferrer"
          className="truncate text-md font-semibold text-blue-base hover:underline"
        >
          brev.ly/{link.shortUrl}
        </a>
        <span className="truncate text-sm text-gray-400">
          {stripProtocol(link.originalUrl)}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="whitespace-nowrap text-sm text-gray-500">
          {link.accessCount} acessos
        </span>
        <Button variant="icon" aria-label="Copiar link" onClick={handleCopy}>
          {copied ? <Check /> : <CopySimple />}
        </Button>
        <DeleteLinkDialog shortUrl={link.shortUrl} />
      </div>
    </div>
  )
}
