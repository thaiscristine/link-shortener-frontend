import { DownloadSimple } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { downloadUrl } from '@/lib/download-url'
import { useExportLinks, useLinks } from '../hooks'
import { EmptyState } from './empty-state'
import { LinkListItem } from './link-list-item'

export function LinksList() {
  const { data, isLoading } = useLinks()
  const exportLinks = useExportLinks()

  const links = data?.links ?? []

  async function handleExport() {
    const { reportUrl } = await exportLinks.mutateAsync()
    await downloadUrl(reportUrl)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-white p-6 shadow-card">
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

      {!isLoading && links.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col">
          {links.map(link => (
            <LinkListItem key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  )
}
