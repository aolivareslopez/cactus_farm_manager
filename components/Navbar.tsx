'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/plants', label: 'Inventory' },
  { href: '/care', label: 'Care log' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="border-b border-gray-200 bg-white px-5 py-3 flex items-center gap-6">
      <span className="font-medium text-green-700 flex items-center gap-2">
        🌵 Desert & Co.
      </span>
      <div className="flex gap-1 flex-1">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              pathname === l.href
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        href="/plants/new"
        className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        + Add plant
      </Link>
    </nav>
  )
}