const PERSONAS = [
  {
    id: 'kapitan',
    avatarEmoji: '🎮',
    accent: 'cyan',
    name: 'Marek "Wilk"',
    role: 'Kapitan drużyny',
    tag: 'Persona A',
    quote: 'Daj mi turniej w 5 kliknięć, nie kolejną ankietę.',
    demographics: [
      { icon: '🎂', label: 'Wiek', value: '19 lat' },
      { icon: '🎓', label: 'Status', value: 'Student, singiel' },
      { icon: '🏙️', label: 'Lokalizacja', value: 'Duże miasto' },
      { icon: '💰', label: 'Dochód', value: 'Niski (stypendium)' },
    ],
    bars: [
      { label: 'Intensywność grania', value: 95 },
      { label: 'Tech-savvy', value: 90 },
      { label: 'Aktywność społeczna', value: 75 },
      { label: 'Cierpliwość do formularzy', value: 15 },
    ],
    platforms: ['Discord', 'Steam', 'Twitch', 'Reddit'],
    goals: [
      'Wygrać turniej i pokazać skills',
      'Szybkie zapisy całej ekipy',
      'Spotkać innych graczy w okolicy',
    ],
    frustrations: [
      'Skomplikowane wieloetapowe formularze',
      'Brak integracji z Discordem',
      'Niepewny harmonogram meczów',
    ],
  },
  {
    id: 'widzka',
    avatarEmoji: '💜',
    accent: 'purple',
    name: 'Aleksandra "Ola"',
    role: 'Wspierająca widzka',
    tag: 'Persona B',
    quote: 'Chcę wiedzieć dokładnie na co idzie każda złotówka.',
    demographics: [
      { icon: '🎂', label: 'Wiek', value: '25 lat' },
      { icon: '💼', label: 'Zawód', value: 'Marketing specialist' },
      { icon: '🏙️', label: 'Lokalizacja', value: 'Duże miasto' },
      { icon: '💰', label: 'Dochód', value: 'Średni' },
    ],
    bars: [
      { label: 'Intensywność grania', value: 40 },
      { label: 'Tech-savvy', value: 70 },
      { label: 'Aktywność społeczna', value: 90 },
      { label: 'Świadomość konsumencka', value: 95 },
    ],
    platforms: ['Twitch', 'Instagram', 'YouTube', 'TikTok'],
    goals: [
      'Wesprzeć cel charytatywny w sensowny sposób',
      'Dzielić się fajnymi inicjatywami',
      'Zobaczyć transparentność wydatków',
    ],
    frustrations: [
      'Brak jasnej informacji o przeznaczeniu pieniędzy',
      'Strony bez identyfikacji wizualnej',
      'Greenwashing / charity-washing',
    ],
  },
  {
    id: 'mlody',
    avatarEmoji: '🌱',
    accent: 'green',
    name: 'Kuba "Sprout"',
    role: 'Młody gracz',
    tag: 'Persona C',
    quote: 'Czy moja mama musi to klikać?',
    demographics: [
      { icon: '🎂', label: 'Wiek', value: '15 lat' },
      { icon: '📚', label: 'Status', value: 'Uczeń liceum' },
      { icon: '🏠', label: 'Mieszkanie', value: 'Z rodzicami' },
      { icon: '💰', label: 'Dochód', value: 'Kieszonkowe' },
    ],
    bars: [
      { label: 'Intensywność grania', value: 85 },
      { label: 'Tech-savvy', value: 80 },
      { label: 'Aktywność społeczna', value: 60 },
      { label: 'Pewność siebie online', value: 35 },
    ],
    platforms: ['TikTok', 'YouTube', 'Discord', 'Roblox'],
    goals: [
      'Spróbować sił w prawdziwym turnieju',
      'Poczuć przynależność do ekipy',
      'Bez kłopotu z formalnościami dla rodzica',
    ],
    frustrations: [
      'Wymóg zgody/podpisu rodzica',
      'Strach przed papierologią',
      'Niepewność czy "dam radę" na tle starszych',
    ],
  },
]

function ActivityBar({ label, value, accent }) {
  return (
    <div className="persona-bar">
      <div className="persona-bar__head">
        <span className="persona-bar__label">{label}</span>
        <span className="persona-bar__value">{value}</span>
      </div>
      <div className="persona-bar__track">
        <div
          className={`persona-bar__fill persona-bar__fill--${accent}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function PersonasSection() {
  return (
    <section className="analysis-section">
      <div className="analysis-section__header">
        <h2 className="analysis-section__title">Persony</h2>
        <p className="analysis-section__subtitle">
          Trzy główne typy użytkowników — kim są, co ich napędza, co ich frustruje
        </p>
      </div>

      <div className="personas-grid">
        {PERSONAS.map((p) => (
          <article key={p.id} className={`persona-v2 persona-v2--${p.accent}`}>
            <header className="persona-v2__header">
              <div className={`persona-v2__avatar persona-v2__avatar--${p.accent}`}>
                <span aria-hidden="true">{p.avatarEmoji}</span>
              </div>
              <div className="persona-v2__heading">
                <span className="persona-v2__tag">{p.tag}</span>
                <h3 className="persona-v2__name">{p.name}</h3>
                <p className="persona-v2__role">{p.role}</p>
              </div>
            </header>

            <blockquote className="persona-v2__quote">
              <span className="persona-v2__quote-mark" aria-hidden="true">"</span>
              {p.quote}
            </blockquote>

            <div className="persona-v2__block">
              <h4 className="persona-v2__block-title">Demografia</h4>
              <ul className="persona-v2__demo">
                {p.demographics.map((d) => (
                  <li key={d.label} className="persona-v2__demo-item">
                    <span className="persona-v2__demo-icon" aria-hidden="true">{d.icon}</span>
                    <span className="persona-v2__demo-label">{d.label}</span>
                    <span className="persona-v2__demo-value">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="persona-v2__block">
              <h4 className="persona-v2__block-title">Aktywność i nawyki</h4>
              <div className="persona-v2__bars">
                {p.bars.map((b) => (
                  <ActivityBar key={b.label} label={b.label} value={b.value} accent={p.accent} />
                ))}
              </div>
            </div>

            <div className="persona-v2__block">
              <h4 className="persona-v2__block-title">Preferowane platformy</h4>
              <div className="persona-v2__pills">
                {p.platforms.map((pl) => (
                  <span key={pl} className={`persona-v2__pill persona-v2__pill--${p.accent}`}>{pl}</span>
                ))}
              </div>
            </div>

            <div className="persona-v2__split">
              <div className="persona-v2__col persona-v2__col--goals">
                <h4 className="persona-v2__block-title">🎯 Cele</h4>
                <ul className="persona-v2__list">
                  {p.goals.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </div>
              <div className="persona-v2__col persona-v2__col--pains">
                <h4 className="persona-v2__block-title">😤 Frustracje</h4>
                <ul className="persona-v2__list">
                  {p.frustrations.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
