import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ApiError } from '@/lib/api'
import { useCreateLink } from '../hooks'
import { linkFormSchema, type LinkFormValues } from '../validations'

export function NewLinkForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: 'onChange',
    defaultValues: { originalUrl: '', shortUrl: '' },
  })

  const createLink = useCreateLink()

  async function onSubmit(values: LinkFormValues) {
    try {
      await createLink.mutateAsync(values)
      reset()
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setError('shortUrl', { message: error.message })
        return
      }
      if (error instanceof ApiError) {
        setError('root', { message: error.message })
        return
      }
      setError('root', {
        message: 'Não foi possível salvar o link. Tente novamente.',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-xl bg-gray-white p-6 shadow-card"
    >
      <h2 className="text-lg text-gray-600">Novo link</h2>

      <Input
        label="Link original"
        placeholder="www.exemplo.com.br"
        error={Boolean(errors.originalUrl)}
        errorMessage={errors.originalUrl?.message}
        {...register('originalUrl')}
      />

      <Input
        label="Link encurtado"
        prefix="brev.ly/"
        error={Boolean(errors.shortUrl)}
        errorMessage={errors.shortUrl?.message}
        {...register('shortUrl')}
      />

      {errors.root?.message ? (
        <p className="text-sm text-danger">{errors.root.message}</p>
      ) : null}

      <Button type="submit" isLoading={isSubmitting} disabled={!isValid}>
        Salvar link
      </Button>
    </form>
  )
}
