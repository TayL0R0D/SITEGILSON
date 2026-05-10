import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import '../styles.css'

const PROPERTY_NAME = import.meta.env.VITE_PROPERTY_NAME || 'Casa da Serra'
const PROPERTY_LOCATION = import.meta.env.VITE_PROPERTY_LOCATION || 'Serra da Mantiqueira'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${PROPERTY_NAME} · Direct Booking · ${PROPERTY_LOCATION}` },
      {
        name: 'description',
        content: `Book ${PROPERTY_NAME} directly — a premium vacation rental in ${PROPERTY_LOCATION}. Check real-time availability and reserve your stay.`,
      },
      { name: 'theme-color', content: '#2D5016' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
