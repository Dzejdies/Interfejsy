import './App.css'
import TeamMember from './components/TeamMember'
import TeamCanvas from './components/TeamCanvas'
import ThemeToggle from './themeToggle';

const TEAM = [
  {
    name: 'Brajan Szczepańczyk',
    role: 'Backend',
    description: 'Vibe coder 1.',
  },
  {
    name: 'Mateusz Kołodziejczyk',
    role: 'Frontend',
    description: 'Vibe coder 2.',
  },
]

export default function App() {
  return (
    <div className="page min-h-screen transition-colors duration-300">
      <header className="page-header relative">
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <p className="page-header__label">Projektowanie Interfejsów WWW</p>
              <h1 className="page-header__title">O nas</h1>
            </div>
            <div>
              <ThemeToggle/>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="team-section">
          <h2 className="section-title">Nasz zespół</h2>
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <TeamMember key={member.name + i} {...member} index={i} />
            ))}
          </div>
        </section>

        <TeamCanvas />
      </main>

      <footer className="page-footer">
        <div className="container">
          <p>Projekt zaliczeniowy &mdash; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}