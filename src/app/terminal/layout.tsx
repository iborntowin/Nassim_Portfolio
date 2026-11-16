import { PersonStructuredData } from '@/components/seo/structured-data'

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <PersonStructuredData />
      {children}
    </div>
  )
}
