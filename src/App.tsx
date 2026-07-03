import {useState} from 'react' // 👈 Quitamos useEffect porque ya no lo necesitamos acá
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import HeroGrid from './components/HeroGrid'
import HeroModal from './components/HeroModal'
import HeroCompare from './components/HeroCompare'
import {useHeroes} from './hooks/useHeroes'
import {useAppFeatures} from './hooks/useAppFeatures'
import {useTeam} from './hooks/useTeam'
import {useVersus} from './hooks/useVersus'
import {translations} from './utils/languages'
import type {FilterState, Hero} from './types'

export default function App() {
    // Lógica delegada a hooks de infraestructura y negocio
    const {theme, toggleTheme, lang, setLang} = useAppFeatures()
    const {favorites, handleToggleFavorite} = useTeam()
    const {compareHeroes, handleSelectForCompare, clearArena} = useVersus()

    // Estados mínimos de UI local
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null)
    const [filters, setFilters] = useState<FilterState>({ publisher: '', alignment: '' })

    const {heroes, loading, totalPages} = useHeroes(search, filters, page)
    const t = translations[lang]

    // 🎯 Manejadores controlados para resetear la página en el mismo ciclo de renderizado
    const handleSearchChange = (newSearch: string) => {
        setSearch(newSearch)
        setPage(1)
    }

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters)
        setPage(1)
    }

    return (
        <div className='app-container'>
            <Header theme={theme} toggleTheme={toggleTheme} lang={lang} setLang={setLang} t={t} />
            <SearchBar search={search} setSearch={handleSearchChange} t={t} />
            <FilterPanel filters={filters} setFilters={handleFiltersChange} t={t} />
            {loading ? (
                <div className='loading-spinner'>...</div>
            ) : (
                <>
                    <HeroGrid
                        heroes={heroes}
                        t={t}
                        onViewDetail={setSelectedHero}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />
                    <div className='pagination-container'>
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className='pagination-btn'>◀</button>
                        <div className='pagination-info'>
                            <span>{t.pageOf} {page} {t.pageConnector} {totalPages}</span>
                            <select value={page} onChange={(e) => setPage(Number(e.target.value))} className='page-select'>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <option key={p} value={p}>
                                        {t.goToPage} {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className='pagination-btn'>▶</button>
                    </div>
                </>
            )}
            {/* Arena de Comparación Versus */}
            {compareHeroes.length > 0 && (
                <HeroCompare
                    heroes={compareHeroes}
                    onClear={clearArena}
                    t={t}
                    lang={lang}
                />
            )}
            {/* Sección exclusiva de Mi Equipo Personalizado */}
            {favorites.length > 0 && (
                <section className='team-section'>
                    <hr className='section-divider' />
                    <div className='team-header-box'>
                        <h2>{t.myTeamTitle}</h2>
                        <p className='team-instruction'>{t.teamInstruction}</p>
                    </div>
                    <HeroGrid
                        heroes={favorites}
                        t={t}
                        onViewDetail={handleSelectForCompare}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </section>
            )}
            <HeroModal hero={selectedHero} onClose={() => setSelectedHero(null)} t={t} />
        </div>
    )
}