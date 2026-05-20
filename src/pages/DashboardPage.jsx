import { useState, useEffect } from 'react'
import api from '../lib/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './DashboardPage.css'
import '../components/button.css'
import NotificationRedirect from '../components/notificationRedirect'

export default function DashboardPage({ onNavigate, user, onAuthChange }) {
  const [stats, setStats] = useState({
    tournamentsEnrolled: 0,
    ggwpPoints: user?.ggwp_points || 0,
    level: 1
  })

  const [feed, setFeed] = useState([])
  const [nextTournament, setNextTournament] = useState(null)
  const [myTeam, setMyTeam] = useState(null)
  const [timeLeft, setTimeLeft] = useState('--:--')

  const nickname = user?.nickname || user?.email?.split('@')[0] || 'Graczu'

  useEffect(() => {
    let mounted = true

    const fetchDashboardData = async () => {
      try {
        // Fetch teams, tournaments and notifications in parallel
        const [teamsData, tData, notifs] = await Promise.all([
          api.get('/ggwp/teams/mine').catch(() => []),
          api.get('/ggwp/tournaments').catch(() => []),
          api.get('/ggwp/notifications').catch(() => []),
        ])

        // Build all upcoming tournaments for teams the user is in
        let allUpcoming = [];
        if (Array.isArray(teamsData) && Array.isArray(tData)) {
          teamsData.forEach(t => {
            if (t.tournament_id) {
              const matchingTournament = tData.find(x => x.id === t.tournament_id);
              if (matchingTournament) {
                // Ensure field names are consistent
                allUpcoming.push({
                  id: matchingTournament.id,
                  name: matchingTournament.name,
                  game: matchingTournament.game,
                  start_date: matchingTournament.start_date,
                });
              }
            }
          });
        }

        // Filtrujemy null'e, duplikaty (po id) i turnieje przeszłe
        const uniqueUpcoming = Array.from(new Map(
          allUpcoming
            .filter(t => t && t.start_date && new Date(t.start_date) > new Date())
            .map(item => [item.id, item])
        ).values());

        let enrolledCount = Array.isArray(teamsData) ? teamsData.filter(t => t.tournament_id).length : 0;

        if (mounted) {
          setStats(prev => ({
            ...prev,
            tournamentsEnrolled: enrolledCount,
            level: Math.floor(enrolledCount / 3) + 1,
            ggwpPoints: user?.user_metadata?.ggwp_points || (enrolledCount * 250)
          }))

          if (Array.isArray(teamsData) && teamsData.length > 0) {
            setMyTeam(teamsData[0]); // Pokaż pierwszą drużynę w jakiej gracz jest
          }

          if (uniqueUpcoming.length > 0) {
            uniqueUpcoming.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
            setNextTournament(uniqueUpcoming[0]);
          }
        }

        if (mounted && Array.isArray(notifs)) {
          const mappedFeed = notifs.map(n => ({
            id: n.id,
            icon: n.title.includes('Zaproszenie') || n.title.includes('Drużyny') ? '📩' : (n.title.includes('Liderem') ? '👑' : '🔔'),
            text: n.message,
            time: new Date(n.created_at).toLocaleDateString(),
            type: n.type
          }))

          // Dorzucamy jedno statyczne globalne, jeśli nie ma bazy feedu
          setFeed([
            ...mappedFeed,
            { id: 'global', icon: '🏆', text: 'Sprawdź zakładkę turniejów, by zobaczyć nowe rozgrywki!', time: 'System' }
          ].slice(0, 4))
        }
      } catch (err) {
        console.error('Błąd pobierania danych dashboardu:', err)
      }
    }

    if (user) fetchDashboardData()

    return () => { mounted = false }
  }, [user])

  // Odliczanie do najbliższego meczu
  useEffect(() => {
    let interval;
    if (nextTournament && nextTournament.start_date) {
      const updateTimer = () => {
        const diff = new Date(nextTournament.start_date) - new Date();
        if (diff <= 0) {
          setTimeLeft('LIVE');
          return;
        }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        let str = '';
        if (d > 0) str += `${d}d `;
        str += `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        setTimeLeft(str);
      }

      updateTimer(); // Od razu
      interval = setInterval(updateTimer, 1000); // Co sekundę
    }
    return () => clearInterval(interval);
  }, [nextTournament])

  return (
    <div className="dashboard-page gh-page">
      <Navbar onNavigate={onNavigate} currentView="dashboard" user={user} onAuthChange={onAuthChange} />

      <main className="dashboard-main" style={{ marginTop: '73px' }}>

        {/* Header Section */}
        <header className="dashboard-header">
          <h1 className="dashboard-welcome">Witaj z powrotem, {nickname}!</h1>
          <p className="dashboard-subtitle">Oto Twój panel dowodzenia.</p>

          <div className="quick-stats">
            <div className="q-stat">
              <span className="q-stat-value">Lvl {stats.level}</span>
              <span className="q-stat-label">Ranga Gracza</span>
            </div>
            <div className="q-stat">
              <span className="q-stat-value">{stats.tournamentsEnrolled}</span>
              <span className="q-stat-label">Zapisane Turnieje</span>
            </div>
            <div className="q-stat">
              <span className="q-stat-value" style={{ color: 'var(--gh-purple-lt)' }}>{stats.ggwpPoints}</span>
              <span className="q-stat-label">GG WP Tokens</span>
            </div>
          </div>
        </header>

        {/* Action Widget */}
        <section className="next-match-widget">
          <div className="nm-info">
            <h3>Nadchodzące wyzwanie</h3>
            {nextTournament ? (
              <>
                <p>Jesteś zapisany na turniej: <strong style={{ color: 'var(--gh-cyan)' }}>{nextTournament.name}</strong> ({nextTournament.game}).<br />Przygotuj formę i bierz udział w walce o fundusze!</p>
                <button className="gh-btn" style={{ padding: '0.5rem 1.5rem', marginTop: '0' }} onClick={() => onNavigate('project')}>
                  Zobacz szczegóły
                </button>
              </>
            ) : (
              <>
                <p>Obecnie nie bierzesz udziału w żadnym aktywnym turnieju.<br />Znajdź interesujące Cię zawody i wspomóż cel charytatywny!</p>
                <button className="gh-btn" onClick={() => onNavigate('tournaments-list')}>
                  🔍 Szukaj Turniejów
                </button>
              </>
            )}
          </div>
          <div className="nm-timer">
            {nextTournament ? timeLeft : '--:--'}
          </div>
        </section>

        {/* Split Layout */}
        <div className="dashboard-grid">

          {/* Left Column (Team & Tournaments) */}
          <div className="dash-column-left">
            <div className="dash-panel" style={{ marginBottom: '2rem' }}>
              <div className="dash-panel-header">
                <span className="dash-panel-title">🛡️ Twoja Drużyna</span>
                <button className="gh-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => onNavigate('account', { tab: 'teams' })}>
                  Zarządzaj
                </button>
              </div>
              <div className="team-widget-content">
                {myTeam ? (
                  <>
                    <p style={{ color: 'var(--gh-cyan)', fontWeight: 'bold' }}>
                      [{myTeam.tag}] {myTeam.team_name}
                    </p>
                    <div className="team-members-row">
                      {myTeam.members?.filter(m => m.status === 'accepted').map(m => (
                        <div
                          key={m.user_id}
                          title={m.nickname}
                          className={`team-member-avatar ${m.user_id === myTeam.leader_id ? 'leader' : ''}`}
                        >
                          {m.avatar_url ? (
                            <img src={m.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                          ) : (
                            (m.nickname || 'U')[0].toUpperCase()
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p style={{ color: 'var(--gh-muted)', fontSize: '0.9rem' }}>
                    Nie dołączyłeś jeszcze do żadnej ekipy. Zbuduj skład lub opublikuj nabór!
                  </p>
                )}
              </div>
            </div>

            <div className="dash-panel">
              <div className="dash-panel-header">
                <span className="dash-panel-title">📋 Historia Wyników</span>
              </div>
              <div className="gh-empty-state" style={{ padding: '2rem' }}>
                <span className="gh-empty-state__icon">📈</span>
                <p>Rozegraj ukończony turniej, aby zobaczyć swoje statystyki z przeszłości.</p>
              </div>
            </div>
          </div>

          {/* Right Column (Community Feed) */}
          <div className="dash-column-right">
            <div className="dash-panel">
              <div className="dash-panel-header">
                <span className="dash-panel-title">🌍 Twój Feed</span>
              </div>
              <div className="feed-content">
                {feed.map(item => (
                  <div key={item.id} className="feed-item" onClick={() => {
                    NotificationRedirect({ onNavigate, notification: item })
                  }}>
                    <div className="feed-icon">{item.icon}</div>
                    <div className="feed-text">
                      <h4>{item.text}</h4>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
