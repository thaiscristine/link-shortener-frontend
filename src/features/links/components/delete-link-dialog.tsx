import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Trash } from '@phosphor-icons/react'
import { type MouseEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useDeleteLink } from '../hooks'

type DeleteLinkDialogProps = {
  shortUrl: string
}

export function DeleteLinkDialog({ shortUrl }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const deleteLink = useDeleteLink()

  async function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    try {
      await deleteLink.mutateAsync(shortUrl)
      setOpen(false)
    } catch {
      
    }
  }

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={isOpen => {
        if (deleteLink.isPending) return
        setOpen(isOpen)
        if (!isOpen) deleteLink.reset()
      }}
    >
      <AlertDialog.Trigger asChild>
        <Button variant="icon" aria-label="Deletar link">
          <Trash />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-gray-600/40" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-white p-6 shadow-card">
          <AlertDialog.Title className="text-lg text-gray-600">
            Deletar link
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-500">
            Tem certeza que deseja deletar o link brev.ly/{shortUrl}? Essa
            ação não pode ser desfeita.
          </AlertDialog.Description>

          {deleteLink.isError ? (
            <p className="mt-2 text-sm text-danger">
              Não foi possível deletar o link. Tente novamente.
            </p>
          ) : null}

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="secondary" disabled={deleteLink.isPending}>
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant="primary"
                isLoading={deleteLink.isPending}
                onClick={handleDelete}
              >
                Deletar
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
