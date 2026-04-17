'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Book a Call' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-smw-navy sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-smw-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-tight">Smart Website</span>
              <span className="text-smw-slate text-[10px] uppercase tracking-widest">Management</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 text-sm font-medium text-white bg-smw-accent hover:bg-smw-accent-light px-4 py-2 rounded transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/5 mt-2 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-gray-300 hover:text-white px-3 py-2.5 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-white bg-smw-accent hover:bg-smw-accent-light px-3 py-2.5 rounded mt-2 text-center transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
