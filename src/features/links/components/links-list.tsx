import { CircleNotch, DownloadSimple } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { downloadUrl } from '@/lib/download-url'
import { useExportLinks, useLinks } from '../hooks'
import { EmptyState } from './empty-state'
import { LinkListItem } from './link-list-item'

export function LinksList() {
  const { data, isLoading, isFetching } = useLinks()
  const exportLinks = useExportLinks()

  const links = data?.links ?? []

  async function handleExport() {
    const { reportUrl } = await exportLinks.mutateAsync()
    await downloadUrl(reportUrl)
  }

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-gray-white p-6 shadow-card">
      {isFetching ? (
        <div className="absolute inset-x-0 top-0 h-1 origin-left animate-grow bg-blue-base" />
      ) : null}

      <div className="flex items-center justify-between">
        <h2 className="text-lg text-gray-600">Meus links</h2>
        <Button
          variant="secondary"
          onClick={handleExport}
          isLoading={exportLinks.isPending}
          disabled={links.length === 0}
        >
          <DownloadSimple />
          Baixar CSV
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
          <CircleNotch className="h-6 w-6 animate-spin" />
          <span className="text-xs font-semibold uppercase">
            Carregando links...
          </span>
        </div>
      ) : links.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="scrollbar-brand flex max-h-[400px] flex-col overflow-y-auto">
          {links.map(link => (
            <LinkListItem key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  )
}
