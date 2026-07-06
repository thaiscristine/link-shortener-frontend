export async function downloadUrl(url: string): Promise<void> {
  const response = await fetch(url, { mode: 'cors' })
  const blob = await response.blob()

  const pathname = new URL(url).pathname
  const segments = pathname.split('/').filter(Boolean)
  const filename = segments.at(-1) ?? 'export.csv'

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}
