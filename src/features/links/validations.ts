import { z } from 'zod'

export function normalizeUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//i, '')
}

export const linkFormSchema = z.object({
  originalUrl: z
    .string()
    .min(1, 'Informe uma url.')
    .transform(normalizeUrl)
    .pipe(z.string().url('Informe uma url válida.')),
  shortUrl: z
    .string()
    .min(3, 'O link precisa ter entre 3 e 40 caracteres.')
    .max(40, 'O link precisa ter entre 3 e 40 caracteres.')
    .regex(/^[a-zA-Z0-9-]+$/, 'Use apenas letras, números e hífen.'),
})

export type LinkFormValues = z.infer<typeof linkFormSchema>
