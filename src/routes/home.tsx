import { PageLayout } from '@/components/page-layout'
import { LinksList } from '@/features/links/components/links-list'
import { NewLinkForm } from '@/features/links/components/new-link-form'

export function HomeRoute() {
  return (
    <PageLayout>
      <div className="md:w-[380px] md:shrink-0">
        <NewLinkForm />
      </div>
      <div className="md:flex-1">
        <LinksList />
      </div>
    </PageLayout>
  )
}
