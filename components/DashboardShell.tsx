'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, type MouseEvent } from 'react'
import Sidebar from '@/components/Sidebar'

const TITLES: Record<string, string> = {
  '/inventory': 'Inventory',
  '/stock': 'Stock In / Out',
  '/transfer': 'Transfer',
  '/history': 'History',
}

// Tracks how deep the user is within the dashboard pages so the Back control
// can use real browser history when there is an internal page to return to,
// and fall back to Home when there isn't. Kept in sessionStorage so it is
// scoped to the current tab and never navigates outside the application.
const DEPTH_KEY = 'stocklite-nav-depth'
const BACK_KEY = 'stocklite-nav-back'

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const handledPath = useRef<string | null>(null)

  useEffect(() => {
    if (handledPath.current === pathname) return
    handledPath.current = pathname
    try {
      const depth = Number(sessionStorage.getItem(DEPTH_KEY) ?? '0')
      if (sessionStorage.getItem(BACK_KEY) === '1') {
        // Returning via our Back control — unwind one level.
        sessionStorage.removeItem(BACK_KEY)
        sessionStorage.setItem(DEPTH_KEY, String(Math.max(1, depth - 1)))
      } else {
        sessionStorage.setItem(DEPTH_KEY, String(depth + 1))
      }
    } catch {
      /* sessionStorage unavailable — fall back to Home navigation */
    }
  }, [pathname])

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    let depth = 1
    try {
      depth = Number(sessionStorage.getItem(DEPTH_KEY) ?? '1')
    } catch {
      depth = 1
    }

    // Only step back through history when there is an internal page to return
    // to. Otherwise let the link's href navigate to Home.
    if (depth > 1) {
      event.preventDefault()
      try {
        sessionStorage.setItem(BACK_KEY, '1')
      } catch {
        /* ignore */
      }
      router.back()
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <div className="topbar">
          <Link href="/" className="back-button" onClick={handleBack}>
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <span className="crumb">{TITLES[pathname] ?? ''}</span>
        </div>
        <div className="page-fade">{children}</div>
      </main>
    </div>
  )
}
