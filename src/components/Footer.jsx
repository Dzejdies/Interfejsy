import './Footer.css'

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="app-footer__inner">
                <span className="app-footer__brand">~ GG WP for Good &mdash; {new Date().getFullYear()}</span>
                <span className="app-footer__update">Ostatnia aktualizacja: {__BUILD_DATE__}</span>
                <span className="app-footer__course">Projektowanie Interfejsów WWW</span>
            </div>
        </footer>
    )
}
