'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function IconInventory() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18M9 4v16" />
    </svg>
  )
}

export function IconStock() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18M6 8l6-5 6 5M6 16l6 5 6-5" />
    </svg>
  )
}

export function IconTransfer() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4" />
    </svg>
  )
}

export function IconHistory() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/inventory', label: 'Inventory', icon: <IconInventory /> },
  { href: '/stock', label: 'Stock In / Out', icon: <IconStock /> },
  { href: '/transfer', label: 'Transfer', icon: <IconTransfer /> },
  { href: '/history', label: 'History', icon: <IconHistory /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <Link
        href="/"
        className="sidebar-brand"
        aria-label="StockLite home"
      >
        <span className="sidebar-brand-mark">SL</span>
        <span className="sidebar-brand-text">
          StockLite
          <span>Warehouse Inventory</span>
        </span>
      </Link>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link${isActive ? ' active' : ''}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <Link href="/login" className="account-button" aria-label="Sign out">
          <span className="account-avatar" aria-hidden="true">
            JR
          </span>
          <span className="account-name">Jordan Ruiz</span>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <path d="M10 17l5-5-5-5M15 12H3" />
          </svg>
        </Link>
      </div>
    </aside>
  )
}
