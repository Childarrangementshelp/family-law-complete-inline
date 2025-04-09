import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Site Title / Logo */}
        <Link href="/">
          <span className="text-2xl font-bold tracking-tight cursor-pointer">
            Family Law Information
          </span>
        </Link>

        {/* Hamburger Button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // Close icon
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg">
          <NavItem href="/" text="Home" />
          <NavItem href="/free-chat" text="Free Chat" />
          <NavItem href="/mckenzie-friend" text="McKenzie Friend" />
          <NavItem href="/contact" text="Contact" />
          <NavItem href="/pricing" text="Pricing" />
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-purple-700">
          <div className="px-4 py-4 space-y-2">
            <NavItemMobile href="/" text="Home" />
            <NavItemMobile href="/free-chat" text="Free Chat" />
            <NavItemMobile href="/mckenzie-friend" text="McKenzie Friend" />
            <NavItemMobile href="/contact" text="Contact" />
            <NavItemMobile href="/pricing" text="Pricing" />
          </div>
        </nav>
      )}
    </header>
  );
}

function NavItem({ href, text }) {
  return (
    <Link href={href} className="hover:text-gray-200 transition">
      {text}
    </Link>
  );
}

function NavItemMobile({ href, text }) {
  return (
    <Link
      href={href}
      className="block text-lg font-medium text-white hover:bg-purple-600 px-2 py-2 rounded transition"
    >
      {text}
    </Link>
  );
}
