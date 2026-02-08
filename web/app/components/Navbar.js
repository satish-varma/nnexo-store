"use client"
import Link from 'next/link'
import { ShoppingBag, User, Search, Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="container" style={{ paddingTop: '24px' }}>
        <div className="glass px-12 py-5 rounded-full flex items-center justify-between">
          <Link href="/" className="h3 flex items-center gap-4" style={{ textDecoration: 'none', color: 'var(--text)' }}>
            <span style={{ backgroundColor: 'var(--primary)', padding: '5px 12px', borderRadius: '8px', fontStyle: 'italic', fontWeight: 900, color: 'white' }}>N</span>
            <span style={{ letterSpacing: '-2px', fontSize: '28px' }}>NNEXO</span>
          </Link>

          {/* Main Links - Fixed centering and spacing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link href="/shop" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Shop</Link>
            <Link href="/rackets" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Rackets</Link>
            <Link href="/apparel" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Apparel</Link>
            <Link href="/academy" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Academy</Link>
          </div>

          <div className="flex items-center gap-8">
            <button className="icon-btn"><Search size={24} /></button>
            <ThemeToggle />
            <div className="relative flex items-center">
              <button className="icon-btn"><ShoppingBag size={24} /></button>
              <span className="badge-count">2</span>
            </div>
            <button className="icon-btn hidden md-flex"><User size={24} /></button>
            <button className="icon-btn md-hidden"><Menu size={28} /></button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
          white-space: nowrap;
          opacity: 0.8;
        }
        .nav-link:hover { opacity: 1; transform: translateY(-1px); }
        .icon-btn {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          transition: transform 0.2s ease, color 0.3s ease;
          display: flex;
          align-items: center;
        }
        .icon-btn:hover { transform: scale(1.1); color: var(--primary); }
        .badge-count {
          position: absolute;
          top: -12px;
          right: -12px;
          background: var(--primary);
          color: white;
          font-size: 11px;
          font-weight: 950;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid var(--bg);
        }
      `}</style>
    </nav>
  )
}
