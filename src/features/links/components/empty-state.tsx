import { Link as LinkIcon } from '@phosphor-icons/react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <LinkIcon size={32} className="text-gray-400" />
      <p className="text-xs uppercase text-gray-400">
        Ainda não existem links cadastrados
      </p>
    </div>
  )
}
