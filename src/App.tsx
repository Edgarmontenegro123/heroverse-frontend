import {useState, useEffect} from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import HeroGrid from './components/HeroGrid'
import HeroModal from './components/HeroModal'
import {useHeroes} from './hooks/useHeroes'
import {translations} from './utils/languages'
import type {Language, FilterState, Hero} from './types'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [lang, setLang] = useState<Language>('es')
  const [search, setSearch] = useState('')
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null)

  // Estado para los filtros avanzados de empresa y bando
  const [filters, setFilters] = useState<FilterState>({
    publisher: '',
    alignment: ''
  })

  // Estado para gestionar tu equipo personalizado cargando datos iniciales de localStorage
  const [favorites, setFavorites] = useState<Hero[]>(() => {
    const saved = localStorage.getItem('hero_team')
    return saved ? JSON.parse(saved) : []
  })

  const { heroes, loading } = useHeroes(search, filters)
  const t = translations[lang]

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Persistir los cambios del equipo en el navegador del usuario
  useEffect(() => {
    localStorage.setItem('hero_team', JSON.stringify(favorites))
  }, [favorites])

  // Inyectar atributo de tema para los estilos responsivos oscuros
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Manejador interactivo para añadir o remover personajes de tu equipo personalizado
  const handleToggleFavorite = (hero: Hero) => {
    const isFav = favorites.some((fav) => fav.id === hero.id)
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== hero.id))
    } else {
      setFavorites([...favorites, hero])
    }
  }

  return (
      <div className='app-container'>
        <Header
            theme={theme}
            toggleTheme={toggleTheme}
            lang={lang}
            setLang={setLang}
            t={t}
        />
        <SearchBar
            search={search}
            setSearch={setSearch}
            t={t}
        />
        <FilterPanel
            filters={filters}
            setFilters={setFilters}
            t={t}
        />
        {loading ? (
            <div className='loading-spinner'>...</div>
        ) : (
            <HeroGrid
                heroes={heroes}
                t={t}
                onViewDetail={setSelectedHero}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
            />
        )}

        {/* Sección exclusiva del panel de Mi Equipo Personalizado */}
        {favorites.length > 0 && (
            <section className='team-section'>
              <hr className='section-divider' />
              <h2>{t.myTeamTitle}</h2>
              <HeroGrid
                  heroes={favorites}
                  t={t}
                  onViewDetail={setSelectedHero}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
              />
            </section>
        )}
        <HeroModal
            hero={selectedHero}
            onClose={() => setSelectedHero(null)}
            t={t}
        />
      </div>
  )
}