import { useState } from 'react'
import ThemeToggle from '../themeToggle'
import './Navbar.css'

const NAV_ITEMS = [
    { icon: '🏠', label: 'O zespole', view: 'home' },
    { icon: '🎮', label: 'O projekcie', view: 'project' },
    { icon: '🔬', label: 'Analiza UX', view: 'analysis' },
    { icon: '📋', label: 'Plan realizacji', view: 'plan' },
]

export default function Navbar({ onNavigate, currentView }) {
    const [open, setOpen] = useState(false)

    const go = (view) => {
        setOpen(false)
        onNavigate(view)
    }

    return (
        <>
            <nav className="navbar">
                <button className="navbar__logo" onClick={() => go('landing')}>
                    🎮 GG WP <span>for Good</span>
                </button>
                <div className="navbar__right">
                    <ThemeToggle />
                    <button
                        className={`navbar__burger${open ? ' open' : ''}`}
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {open && (
                <>
                    <div className="navbar__overlay" onClick={() => setOpen(false)} />
                    <aside className="navbar__sidebar">
                        <button className="navbar__sidebar-close" onClick={() => setOpen(false)}>✕</button>
                        <div className="navbar__sidebar-logo">GG WP for Good</div>
                        <nav className="navbar__sidebar-nav">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.view}
                                    className={`navbar__sidebar-item${currentView === item.view ? ' active' : ''}`}
                                    onClick={() => go(item.view)}
                                >
                                    <span className="navbar__sidebar-icon">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                        <div className="navbar__sidebar-footer">
                            Projektowanie Interfejsów WWW<br />
                            © {new Date().getFullYear()} GG WP for Good
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}
